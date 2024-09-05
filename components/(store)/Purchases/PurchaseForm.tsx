"use client";

import AppLoading from "@/components/UI/AppLoading";
import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ProductType } from "@/lib/models/Product";
import { PurchaseType } from "@/lib/models/Purchase";
import { AppTableHeaderOptionsType, PurchaseFormType } from "@/lib/types/types";
import { message, selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchProductsQuery } from "@/states/actions/stores/products";
import {
    useCreatePurchaseMutation,
    useFetchPurchaseQuery,
    useUpdatePurchaseMutation,
} from "@/states/actions/stores/purchases";
import { useFetchSuppliersQuery } from "@/states/actions/stores/suppliers";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Button,
    Flex,
    Grid,
    Group,
    Modal,
    Stack,
    Table,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Validator from "Validator";
import PaymentForm from "./PaymentForm";

const PurchaseForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "name", label: "Name" },
            { key: "expire_at", label: "Expire At" },
            { key: "quantity", label: "Quantity" },
            { key: "amount", label: "Amount" },
            { key: "total", label: "Total" },
            { key: "action", label: "Action", align: "center" },
        ],
        []
    );

    const { data: suppliers, isFetching: suppliersIsFetching } =
        useFetchSuppliersQuery("get_all=1&status=active");
    const { data: products } = useFetchProductsQuery("get_all=1&status=active");

    const { data, isFetching } = useFetchPurchaseQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreatePurchaseMutation();
    const [update, resultUpdate] = useUpdatePurchaseMutation();

    const [form, setForm] = useState<PurchaseFormType>({
        supplierId: null,
        refNo: "",
        invoiceNo: "",
        date: new Date(),
        discount: 0,
        otherCharge: 0,
        // subtotal: 0,
        // total: 0,
        products: [],
        payments: [],
        description: "",
        attachment: null,
        status: "ordered",
    });

    const [errors, setErrors] = useState({
        supplierId: { text: "", show: false },
        refNo: { text: "", show: false },
        invoiceNo: { text: "", show: false },
        date: { text: "", show: false },
        discount: { text: "", show: false },
        otherCharge: { text: "", show: false },
        subtotal: { text: "", show: false },
        total: { text: "", show: false },
        description: { text: "", show: false },
        attachment: { text: "", show: false },
        status: { text: "", show: false },
    });

    const [opened, { open, close }] = useDisclosure(false);

    const totalCalculation = useMemo(() => {
        const formProducts = form.products ?? [];
        const formPayments = form.payments ?? [];

        const products = formProducts.length;
        const quantity = formProducts.reduce(
            (acc, curr) => acc + curr["quantity"],
            0
        );
        const subtotal = formProducts.reduce(
            (acc, curr) => acc + curr["total"],
            0
        );
        const total =
            subtotal + Number(form.otherCharge) - Number(form.discount);

        const paid = formPayments.reduce(
            (acc, curr) => acc + Number(curr["amount"]),
            0
        );
        const due = total > paid ? total - paid : 0;

        return {
            products: products,
            quantity: quantity,
            subtotal: subtotal,
            total: total,
            paid: paid,
            due: due,
        };
    }, [form.discount, form.otherCharge, form.payments, form.products]);

    const resetHandler = () => {
        setErrors({
            supplierId: { text: "", show: false },
            refNo: { text: "", show: false },
            invoiceNo: { text: "", show: false },
            date: { text: "", show: false },
            discount: { text: "", show: false },
            otherCharge: { text: "", show: false },
            subtotal: { text: "", show: false },
            total: { text: "", show: false },
            description: { text: "", show: false },
            attachment: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            supplierId: null,
            refNo: "",
            invoiceNo: "",
            date: new Date(),
            discount: 0,
            otherCharge: 0,
            subtotal: 0,
            total: 0,
            products: [],
            payments: [],
            description: "",
            attachment: null,
            status: "ordered",
        });
    };

    const fieldChangeHandler = (
        field: string,
        subfield: string | any,
        value: any
    ) => {
        let errKey = field;
        let fieldValue = value;

        if (subfield) {
            errKey += "." + subfield;
            fieldValue = { ...(form as any)[field] };
            fieldValue[subfield] = value;
        }

        if (errKey) {
            setErrors((prevState) => ({
                ...prevState,
                [errKey]: { text: "", show: false },
            }));
        }
        setForm((prevState) => ({ ...prevState, [field]: fieldValue }));
    };

    const productChangeHandler = (
        index: number,
        field: string,
        value: string | any
    ) => {
        const products = [...form.products];
        const payload = { ...products[index] };

        if (field !== "expireAt") {
            const quantity =
                field === "quantity"
                    ? Number(value)
                    : Number(payload["quantity"]);
            const amount =
                field === "amount" ? Number(value) : Number(payload["amount"]);

            const total = quantity * amount;

            payload["quantity"] = quantity;
            payload["amount"] = amount;
            payload["total"] = total;
        } else {
            payload[field] = value;
        }

        products[index] = payload;
        setForm((prevState) => ({ ...prevState, products: products }));
    };

    const productHandler = (product: ProductType | null) => {
        if (!product) return;

        const products = [...form.products];
        const index = products.findIndex((p) => p.productId === product.id);

        const payload = {
            productId: product.id,
            productName: product.name,
            quantity: 1,
            amount: product.price,
            total: product.price,
            expireAt: null,
        };

        if (index > -1) {
            const quantity = products[index]["quantity"] + 1;
            const amount = products[index]["amount"] ?? 0;

            products[index] = {
                ...products[index],
                quantity: quantity,
                total: amount * quantity,
            };
        } else {
            products.push(payload);
        }

        setForm((prevState) => ({ ...prevState, products: products }));
    };

    const productDeleteHandler = (i: number) => {
        const products = [...form.products];
        const product = products[i];
        setForm((prevState) => ({
            ...prevState,
            products: products.filter(
                (item) => item.productId !== product.productId
            ),
        }));
    };

    const paymentDeleteHandler = (i: number) => {
        const payments = [...form.payments];
        const payment = payments[i];
        setForm((prevState) => ({
            ...prevState,
            payments: payments.filter(
                (item) => item.methodId !== payment.methodId
            ),
        }));
    };

    const paymentHandler = (payment: {
        methodId: string;
        methodName?: string;
        transactionNo?: string | any;
        amount: number;
    }) => {
        if (!payment) return;

        const payments = [...form.payments];
        const index = payments.findIndex(
            (p) => p.methodId === payment.methodId
        );

        if (index > -1) {
            const amount = payments[index]["amount"] ?? 0;

            payments[index] = {
                ...payments[index],
                amount: Number(amount) + Number(payment.amount),
            };
        } else {
            payments.push(payment);
        }

        setForm((prevState) => ({ ...prevState, payments: payments }));
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await formAction(() => router.push("/purchases"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            supplierId: "required",
            refNo: "required",
            date: "required|date",
            discount: "numeric",
            otherCharge: "numeric",
            // subtotal: "required|numeric",
            // total: "required|numeric",
            description: "sometimes",
            status: "required|in:ordered,received",
        });

        if (validator.fails()) {
            setErrors((prevState) => ({
                ...prevState,
                ...validateError(validator.getErrors()),
            }));
            return;
        }

        try {
            const data = {
                ...form,
                subtotal: totalCalculation.subtotal,
                total: totalCalculation.total,
            };

            const payload = id
                ? await update(data).unwrap()
                : await create(data).unwrap();

            resetHandler();
            message({
                title: payload.message,
                icon: "success",
                timer: 3000,
            });
            cb();
        } catch (err: { message: string; status: string; data: any } | any) {
            message({
                title: err.message,
                icon: "error",
                timer: 3000,
            });
            if (err.status === "validateError") {
                setErrors((prevState) => ({
                    ...prevState,
                    ...validateError(err.data),
                }));
            }
        }
    };

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const payload: PurchaseType = { ...data };
            let obj = { ...form };
            Object.keys(payload).forEach((key: string) => {
                if ((payload as any)[key] !== null) {
                    (obj as any)[key] = (payload as any)[key];
                }
            });
            setForm(obj);
        }
    }, [data]);

    if (isFetching || suppliersIsFetching) {
        return <AppLoading />;
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Add Payment"
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <PaymentForm
                    add={(value) => paymentHandler(value)}
                    close={close}
                />
            </Modal>

            <form onSubmit={submitHandler}>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <DateField
                            label="Date"
                            placeholder="Ex. 25/01/1999"
                            withAsterisk
                            value={form.date}
                            error={errors.date.text}
                            onChange={(value) =>
                                fieldChangeHandler("date", null, value)
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <SelectBox
                            label="Supplier"
                            placeholder="Ex. Global Brand"
                            data={selectGenerator(suppliers, "name", "id")}
                            withAsterisk
                            leftSection={
                                <ActionIcon
                                    onClick={() => console.log("Hello")}
                                >
                                    <Icon icon="fluent:add-12-filled" />
                                </ActionIcon>
                            }
                            value={form.supplierId}
                            error={errors.supplierId.text}
                            onChange={(value) =>
                                fieldChangeHandler("supplierId", null, value)
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 3 }}>
                        <TextField
                            label="Supplier Invoice No."
                            placeholder="Ex. John"
                            withAsterisk
                            value={form.refNo}
                            error={errors.refNo.text}
                            onChange={(e) =>
                                fieldChangeHandler(
                                    "refNo",
                                    null,
                                    e.target.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <AppTable
                            withRowBorders={false}
                            withColumnBorders={false}
                            isFound={form.products.length > 0}
                            isLoading={false}
                            contentHeight="auto"
                            topContent={
                                <SelectBox
                                    withCheckIcon={false}
                                    label="Select Product"
                                    placeholder="Ex. Select Product"
                                    data={selectGenerator(
                                        products,
                                        "name",
                                        "id"
                                    )}
                                    withAsterisk
                                    onChange={(value) => {
                                        if (!value) return;
                                        const selected = products.find(
                                            (item: ProductType) =>
                                                item.id === value
                                        );
                                        productHandler(selected);
                                    }}
                                />
                            }
                            headers={headers}
                            data={form.products.map((item, i: number) => (
                                <AppTableRow key={i}>
                                    <AppTableCell miw={250}>
                                        <Title component="h6" order={6}>
                                            {item.productName}
                                        </Title>
                                    </AppTableCell>
                                    <AppTableCell w={170}>
                                        <DateField
                                            placeholder="Ex. 25/01/2024"
                                            value={item.expireAt}
                                            onChange={(value) =>
                                                productChangeHandler(
                                                    i,
                                                    "expireAt",
                                                    value
                                                )
                                            }
                                        />
                                    </AppTableCell>
                                    <AppTableCell w={100}>
                                        <TextField
                                            placeholder="Ex. 10"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                productChangeHandler(
                                                    i,
                                                    "quantity",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </AppTableCell>
                                    <AppTableCell w={200}>
                                        <TextField
                                            placeholder="Ex. 10"
                                            value={item.amount}
                                            onChange={(e) =>
                                                productChangeHandler(
                                                    i,
                                                    "amount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </AppTableCell>
                                    <AppTableCell w={150}>
                                        <Title component="h5" order={4}>
                                            {item.total}
                                        </Title>
                                    </AppTableCell>
                                    <AppTableCell w={10}>
                                        <Flex gap="xs">
                                            <ActionIcon
                                                size="lg"
                                                variant="light"
                                                color="red"
                                                onClick={() =>
                                                    productDeleteHandler(i)
                                                }
                                            >
                                                <Icon
                                                    icon="icon-park-outline:delete"
                                                    width={18}
                                                />
                                            </ActionIcon>
                                        </Flex>
                                    </AppTableCell>
                                </AppTableRow>
                            ))}
                            bottomContent={
                                <Grid justify="flex-end">
                                    <Grid.Col span={{ base: 12, md: 3 }}>
                                        <Stack gap="xs">
                                            <Title
                                                component="h6"
                                                order={5}
                                                ta="center"
                                            >
                                                Total Product:{" "}
                                                {totalCalculation.products} (
                                                {totalCalculation.quantity})
                                            </Title>

                                            <Button
                                                variant="light"
                                                color="black"
                                                size="xl"
                                                classNames={{
                                                    label: "text-2xl",
                                                }}
                                            >
                                                Total: {totalCalculation.total}
                                            </Button>

                                            <Button
                                                variant="light"
                                                color="green"
                                                size="lg"
                                                fullWidth
                                            >
                                                Paid: {totalCalculation.paid}
                                            </Button>
                                            <Button
                                                variant="light"
                                                color="red"
                                                size="lg"
                                                fullWidth
                                            >
                                                Due: {totalCalculation.due}
                                            </Button>
                                        </Stack>
                                    </Grid.Col>
                                    <Grid.Col span={{ base: 12, md: 4 }}>
                                        <Grid align="flex-start">
                                            <Grid.Col span={6}>
                                                <TextField
                                                    label="Discount"
                                                    placeholder="Ex. 10"
                                                    value={form.discount}
                                                    error={errors.discount.text}
                                                    onChange={(e) =>
                                                        fieldChangeHandler(
                                                            "discount",
                                                            null,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <TextField
                                                    label="Other Charge"
                                                    placeholder="Ex. 10"
                                                    value={form.otherCharge}
                                                    error={
                                                        errors.otherCharge.text
                                                    }
                                                    onChange={(e) =>
                                                        fieldChangeHandler(
                                                            "otherCharge",
                                                            null,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <Table
                                                    striped
                                                    highlightOnHover
                                                    withTableBorder
                                                >
                                                    <Table.Thead>
                                                        <Table.Tr>
                                                            <Table.Th w={5}>
                                                                SL.
                                                            </Table.Th>
                                                            <Table.Th>
                                                                Name
                                                            </Table.Th>
                                                            <Table.Th w={100}>
                                                                Amount
                                                            </Table.Th>
                                                            <Table.Th w={5}>
                                                                Action
                                                            </Table.Th>
                                                        </Table.Tr>
                                                    </Table.Thead>
                                                    <Table.Tbody>
                                                        {form.payments.map(
                                                            (item, i) => (
                                                                <Table.Tr
                                                                    key={i}
                                                                >
                                                                    <Table.Td>
                                                                        {i + 1}
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            item.methodName
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td>
                                                                        {
                                                                            item.amount
                                                                        }
                                                                    </Table.Td>
                                                                    <Table.Td ta="center">
                                                                        <ActionIcon
                                                                            size="sm"
                                                                            variant="light"
                                                                            color="red"
                                                                            onClick={() =>
                                                                                paymentDeleteHandler(
                                                                                    i
                                                                                )
                                                                            }
                                                                        >
                                                                            <Icon icon="icon-park-outline:delete" />
                                                                        </ActionIcon>
                                                                    </Table.Td>
                                                                </Table.Tr>
                                                            )
                                                        )}
                                                    </Table.Tbody>
                                                    <Table.Tfoot>
                                                        <Table.Tr>
                                                            <Table.Td
                                                                colSpan={4}
                                                            >
                                                                <Button
                                                                    size="xs"
                                                                    fullWidth
                                                                    variant="light"
                                                                    onClick={
                                                                        open
                                                                    }
                                                                >
                                                                    Add Payment
                                                                </Button>
                                                            </Table.Td>
                                                        </Table.Tr>
                                                    </Table.Tfoot>
                                                </Table>
                                            </Grid.Col>
                                        </Grid>
                                    </Grid.Col>
                                </Grid>
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextEditor
                            label="Description"
                            placeholder="Ex. Something about purchase"
                            minRows={2}
                            value={form.description}
                            error={errors.description.text}
                            onChange={(e) =>
                                fieldChangeHandler(
                                    "description",
                                    null,
                                    e.target.value
                                )
                            }
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Group gap="xs">
                            <Button
                                type="submit"
                                loading={
                                    result?.isLoading || resultUpdate?.isLoading
                                }
                            >
                                Save
                            </Button>
                            {!id && (
                                <Button
                                    onClick={() => formAction()}
                                    loading={
                                        result?.isLoading ||
                                        resultUpdate?.isLoading
                                    }
                                >
                                    Save & Add More
                                </Button>
                            )}
                            <Button
                                color="red"
                                onClick={() => router.push("/purchases")}
                                loading={
                                    result?.isLoading || resultUpdate?.isLoading
                                }
                            >
                                Back
                            </Button>
                        </Group>
                    </Grid.Col>
                </Grid>
            </form>
        </>
    );
};

export default PurchaseForm;

"use client";

import AppLoading from "@/components/UI/AppLoading";
import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { QuotationStatusOptions } from "@/lib/constants/Options";
import { QuotationType } from "@/lib/models/Quotation";
import { QuotationFormType } from "@/lib/types/types";
import { message, selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchCustomersQuery } from "@/states/actions/stores/customers";
import { useFetchProductsQuery } from "@/states/actions/stores/products";
import {
    useCreateQuotationMutation,
    useFetchQuotationQuery,
    useUpdateQuotationMutation,
} from "@/states/actions/stores/quotations";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group, Stack, Title } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Validator from "Validator";
import ProductList from "./ProductList";

const QuotationForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: customers, isFetching: customersIsFetching } =
        useFetchCustomersQuery("get_all=1&status=active");
    const { data: products } = useFetchProductsQuery("get_all=1&status=active");

    const { data, isFetching } = useFetchQuotationQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateQuotationMutation();
    const [update, resultUpdate] = useUpdateQuotationMutation();

    const [form, setForm] = useState<QuotationFormType>({
        customerId: null,
        // refNo: "",
        invoiceNo: "",
        date: new Date(),
        discount: 0,
        otherCharge: 0,
        // subtotal: 0,
        // total: 0,
        products: [],
        description: "",
        attachment: null,
        status: "sent",
    });

    const [errors, setErrors] = useState({
        customerId: { text: "", show: false },
        // refNo: { text: "", show: false },
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

    const totalCalculation = useMemo(() => {
        const formProducts = form.products ?? [];

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

        return {
            products: products,
            quantity: quantity,
            subtotal: subtotal,
            total: total,
        };
    }, [form.discount, form.otherCharge, form.products]);

    const resetHandler = () => {
        setErrors({
            customerId: { text: "", show: false },
            // refNo: { text: "", show: false },
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
            customerId: null,
            // refNo: "",
            invoiceNo: "",
            date: new Date(),
            discount: 0,
            otherCharge: 0,
            subtotal: 0,
            total: 0,
            products: [],
            description: "",
            attachment: null,
            status: "sent",
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

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await formAction(() => router.push("/quotations"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            customerId: "required",
            // refNo: "required",
            date: "required|date",
            discount: "numeric",
            otherCharge: "numeric",
            // subtotal: "required|numeric",
            // total: "required|numeric",
            description: "sometimes",
            status: "required|in:sent",
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
            const payload: QuotationType = { ...data };
            let obj = { ...form };
            Object.keys(payload).forEach((key: string) => {
                if ((payload as any)[key] !== null) {
                    if (key === "date") {
                        (obj as any)[key] = new Date((payload as any)[key]);
                    } else if (key === "quotationProducts") {
                        (obj as any)["products"] = (payload as any)[key];
                    } else {
                        (obj as any)[key] = (payload as any)[key];
                    }
                }
            });
            setForm(obj);
        }
    }, [data]);

    if (isFetching || customersIsFetching) {
        return <AppLoading />;
    }

    return (
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
                        label="Customer"
                        placeholder="Ex. Global Brand"
                        data={selectGenerator(customers, "name", "id")}
                        withAsterisk
                        leftSection={
                            <ActionIcon onClick={() => console.log("Hello")}>
                                <Icon icon="fluent:add-12-filled" />
                            </ActionIcon>
                        }
                        value={form.customerId}
                        error={errors.customerId.text}
                        onChange={(value) =>
                            fieldChangeHandler("customerId", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <SelectBox
                        label="Status"
                        placeholder="Ex. Sent"
                        data={QuotationStatusOptions}
                        withAsterisk
                        value={form.status}
                        error={errors.status.text}
                        onChange={(value) =>
                            fieldChangeHandler("status", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 9 }}>
                    <ProductList
                        products={products}
                        selectedProducts={form.products}
                        formHandler={setForm}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <Stack gap="xs">
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
                        <TextField
                            label="Other Charge"
                            placeholder="Ex. 10"
                            value={form.otherCharge}
                            error={errors.otherCharge.text}
                            onChange={(e) =>
                                fieldChangeHandler(
                                    "otherCharge",
                                    null,
                                    e.target.value
                                )
                            }
                        />

                        <Title component="h6" order={5} ta="center">
                            Total Product: {totalCalculation.products} (
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
                    </Stack>
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
                                    result?.isLoading || resultUpdate?.isLoading
                                }
                            >
                                Save & Add More
                            </Button>
                        )}
                        <Button
                            color="red"
                            onClick={() => router.push("/quotations")}
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
    );
};

export default QuotationForm;

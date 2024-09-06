"use client";

import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { ProductType } from "@/lib/models/Product";
import {
    AppTableHeaderOptionsType,
    PurchasePaymentType,
    PurchaseProductType,
} from "@/lib/types/types";
import { selectGenerator } from "@/lib/utils/helper";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Flex, Modal, Table, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { memo, useMemo } from "react";
import PaymentForm from "./PaymentForm";

const ProductList: React.FC<{
    products: any;
    selectedProducts: PurchaseProductType[];
    selectedPayments: PurchasePaymentType[];
    formHandler: (value: any) => void;
}> = ({
    products = [],
    selectedProducts = [],
    selectedPayments = [],
    formHandler = (value) => {},
}) => {
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

    const [opened, { open, close }] = useDisclosure(false);

    const productChangeHandler = (
        index: number,
        field: string,
        value: string | any
    ) => {
        const products = [...selectedProducts];
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
        formHandler((prevState: any) => ({ ...prevState, products: products }));
    };

    const productHandler = (product: ProductType | null) => {
        if (!product) return;

        const products = [...selectedProducts];
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

        formHandler((prevState: any) => ({ ...prevState, products: products }));
    };

    const productDeleteHandler = (i: number) => {
        const products = [...selectedProducts];
        const product = products[i];
        formHandler((prevState: any) => ({
            ...prevState,
            products: products.filter(
                (item) => item.productId !== product.productId
            ),
        }));
    };

    const paymentDeleteHandler = (i: number) => {
        const payments = [...selectedPayments];
        const payment = payments[i];
        formHandler((prevState: any) => ({
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

        const payments = [...selectedPayments];
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

        formHandler((prevState: any) => ({ ...prevState, payments: payments }));
    };

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

            <AppTable
                withRowBorders={false}
                withColumnBorders={false}
                isFound={selectedProducts.length > 0}
                isLoading={false}
                contentHeight="auto"
                topContent={
                    <SelectBox
                        withCheckIcon={false}
                        // label="Select Product"
                        placeholder="Ex. Select Product"
                        data={selectGenerator(products, "name", "id")}
                        value={null}
                        size="md"
                        withAsterisk
                        leftSection={
                            <Icon icon="ri:search-line" fontSize={24} />
                        }
                        onChange={(value) => {
                            if (!value) return;
                            const selected = products.find(
                                (item: ProductType) => item.id === value
                            );
                            productHandler(selected);
                        }}
                    />
                }
                headers={headers}
                data={selectedProducts.map((item, i: number) => (
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
                                    productChangeHandler(i, "expireAt", value)
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
                                    onClick={() => productDeleteHandler(i)}
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
                    <Table striped highlightOnHover withTableBorder maw={450}>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th w={5}>SL.</Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th w={100}>Amount</Table.Th>
                                <Table.Th w={5}>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {selectedPayments.map((item, i) => (
                                <Table.Tr key={i}>
                                    <Table.Td>{i + 1}</Table.Td>
                                    <Table.Td>{item.methodName}</Table.Td>
                                    <Table.Td>{item.amount}</Table.Td>
                                    <Table.Td ta="center">
                                        <ActionIcon
                                            size="sm"
                                            variant="light"
                                            color="red"
                                            onClick={() =>
                                                paymentDeleteHandler(i)
                                            }
                                        >
                                            <Icon icon="icon-park-outline:delete" />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                        <Table.Tfoot>
                            <Table.Tr>
                                <Table.Td colSpan={4}>
                                    <Button
                                        // size="xs"
                                        fullWidth
                                        variant="light"
                                        onClick={open}
                                    >
                                        Add Payment
                                    </Button>
                                </Table.Td>
                            </Table.Tr>
                        </Table.Tfoot>
                    </Table>
                }
            />
        </>
    );
};

export default memo(ProductList);

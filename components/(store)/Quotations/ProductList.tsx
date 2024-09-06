"use client";

import SelectBox from "@/components/UI/SelectBox";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { ProductType } from "@/lib/models/Product";
import {
    AppTableHeaderOptionsType,
    PurchaseProductType,
} from "@/lib/types/types";
import { selectGenerator } from "@/lib/utils/helper";
import { Icon } from "@iconify/react";
import { ActionIcon, Flex, Text, Title } from "@mantine/core";
import { memo, useMemo } from "react";

const ProductList: React.FC<{
    products: any;
    selectedProducts: PurchaseProductType[];
    formHandler: (value: any) => void;
}> = ({
    products = [],
    selectedProducts = [],
    formHandler = (value) => {},
}) => {
    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "name", label: "Name" },
            { key: "quantity", label: "Quantity" },
            { key: "amount", label: "Amount" },
            { key: "total", label: "Total" },
            { key: "action", label: "Action", align: "center" },
        ],
        []
    );

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

    return (
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
                    leftSection={<Icon icon="ri:search-line" fontSize={24} />}
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
                        <Text size="sm">Inclusive</Text>
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
        />
    );
};

export default memo(ProductList);

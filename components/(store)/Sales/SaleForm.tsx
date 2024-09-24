"use client";

import { ProductType } from "@/lib/models/Product";
import { Card } from "@mantine/core";
import { useMemo, useRef, useState } from "react";
import PosLayout from "../Layout/PosLayout";
import CartSection from "./Form/CartSection";
import ProductSection from "./Form/ProductSection";
import { useCreateSaleMutation } from "@/states/actions/stores/sales";
import moment from "moment";

const SaleForm = () => {
    const cartRef = useRef<any>(null);

    const [create, result] = useCreateSaleMutation();

    const [products, setProducts] = useState<
        {
            productId?: string;
            name: string;
            code?: string;
            price?: number;
            discount?: number;
            taxMethod?: string;
            taxRate?: any;
            quantity: number;
            total: number;
        }[]
    >([]);

    const addProduct = (
        p: ProductType,
        quantity: number = 1,
        quantityType: string = "add"
    ) => {
        const prevProducts = [...products];
        const existIndex = prevProducts.findIndex(
            (item) => item.productId === p.id
        );

        if (existIndex < 0) {
            const priceAfterDiscount = Number(p.price!) - Number(p.discount!);
            const taxAmount =
                p.taxMethod === "exclusive"
                    ? priceAfterDiscount * (Number(p.taxRate?.rate!) / 100)
                    : 0;
            const priceWithTax = priceAfterDiscount + taxAmount;

            prevProducts.push({
                productId: p.id,
                name: p.name,
                code: p.code,
                price: p.price,
                discount: p.discount,
                taxMethod: p.taxMethod,
                taxRate: p.taxRate?.rate ?? 0,
                quantity: quantity,
                total: priceWithTax,
            });
        } else {
            const exists = { ...prevProducts[existIndex] };
            const qty =
                quantityType === "add"
                    ? Number(exists.quantity) + quantity
                    : Number(exists.quantity) - quantity;

            if (qty < 1) return;

            const priceAfterDiscount =
                (Number(exists.price!) - Number(exists.discount!)) * qty;
            const taxAmount =
                exists.taxMethod === "exclusive"
                    ? priceAfterDiscount * (Number(exists.taxRate) / 100)
                    : 0;
            const priceWithTax = priceAfterDiscount + taxAmount;
            exists.quantity = qty;
            exists.total = priceWithTax;
            prevProducts[existIndex] = exists;
        }
        setProducts(prevProducts);
    };

    const deleteProduct = (index: number) => {
        const prevProducts = [...products.filter((_, i) => i !== index)];
        setProducts(prevProducts);
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const {
            customer,
            counter,
            shippingCharge,
            otherCharge,
            discount,
            orderTax,
            total,
        } = cartRef.current;

        const form = {
            type: "sale",
            date: moment().toString(),
            customerId: customer.selectedId ?? null,
            counterId: counter.selectedId ?? null,
            shippingCharge: shippingCharge.value ?? 0,
            otherCharge: otherCharge.value ?? 0,
            discount: discount.value ?? 0,
            orderTax: orderTax.value?.rate ?? 0,
            total: total.netAmount ?? 0,
            products: products,
            payments: [],
        };

        await create(form)
            .unwrap()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    };

    return (
        <PosLayout>
            <form onSubmit={submitHandler}>
                <div className="grid grid-cols-12 gap-4 px-2 items-stretch">
                    <div className="col-span-full lg:col-span-7 2xl:col-span-8">
                        <Card radius="md" shadow="sm" h="100%">
                            <ProductSection addProduct={addProduct} />
                        </Card>
                    </div>
                    <div className="col-span-full lg:col-span-5 2xl:col-span-4">
                        <Card radius="md" shadow="sm" h="100%">
                            <CartSection
                                ref={cartRef}
                                selectedProducts={products}
                                addProduct={addProduct}
                                deleteProduct={deleteProduct}
                            />
                        </Card>
                    </div>
                </div>
            </form>
        </PosLayout>
    );
};

export default SaleForm;

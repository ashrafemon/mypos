"use client";

import { Button, Card } from "@mantine/core";
import PosLayout from "../Layout/PosLayout";
import CartSection from "./Form/CartSection";
import ProductSection from "./Form/ProductSection";
import { useRef, useState } from "react";
import { ProductType } from "@/lib/models/Product";

const SaleForm = () => {
    const cartRef = useRef<any>(null);

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
                taxRate: p.taxRate,
                quantity: quantity,
                total: priceWithTax,
            });
        } else {
            const exists = { ...prevProducts[existIndex] };
            const qty =
                quantityType === "add"
                    ? Number(exists.quantity) + quantity
                    : Number(exists.quantity) - quantity;
            const priceAfterDiscount =
                (Number(exists.price!) - Number(exists.discount!)) * qty;
            const taxAmount =
                exists.taxMethod === "exclusive"
                    ? priceAfterDiscount * (Number(exists.taxRate?.rate!) / 100)
                    : 0;
            const priceWithTax = priceAfterDiscount + taxAmount;
            exists.quantity = qty;
            exists.total = priceWithTax;
            prevProducts[existIndex] = exists;
        }
        setProducts(prevProducts);
    };

    const submitHandler = () => {
        const {
            customer,
            counter,
            shippingCharge,
            otherCharge,
            discount,
            orderTax,
        } = cartRef.current;
    };

    return (
        <PosLayout>
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
                        />
                    </Card>
                </div>
            </div>
        </PosLayout>
    );
};

export default SaleForm;

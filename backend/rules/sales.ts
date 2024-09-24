import vine from "@vinejs/vine";

export const StoreRules = {
    storeId: vine.string().optional(),
    customerId: vine.string(),
    counterId: vine.string(),
    type: vine.string().in(["hold", "sale"]),
    date: vine.date({ formats: { utc: true } }),
    discount: vine.number(),
    otherCharge: vine.number(),
    shippingCharge: vine.number(),
    orderTax: vine.number(),
    subtotal: vine.number().optional(),
    total: vine.number(),
    products: vine
        .array(
            vine.object({
                productId: vine.string(),
                name: vine.string(),
                code: vine.string(),
                price: vine.number(),
                discount: vine.number(),
                taxMethod: vine.string().in(["inclusive", "exclusive"]),
                taxRate: vine.number().optional(),
                quantity: vine.number(),
                total: vine.number(),
            })
        )
        .minLength(1),
    payments: vine
        .array(
            vine.object({
                methodId: vine.string(),
                name: vine.string(),
                transactionNo: vine.string().optional(),
                amount: vine.number(),
                note: vine.string().optional(),
            })
        )
        .minLength(1),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
};

export const UpdateRules = {
    storeId: vine.string().optional(),
    customerId: vine.string(),
    counterId: vine.string(),
    type: vine.string().in(["hold", "sale"]),
    date: vine.date({ formats: { utc: true } }),
    discount: vine.number(),
    otherCharge: vine.number(),
    shippingCharge: vine.number(),
    orderTax: vine.number(),
    subtotal: vine.number().optional(),
    total: vine.number(),
    products: vine
        .array(
            vine.object({
                productId: vine.string(),
                name: vine.string(),
                code: vine.string(),
                price: vine.number(),
                discount: vine.number(),
                taxMethod: vine.string().in(["inclusive", "exclusive"]),
                taxRate: vine.number().optional(),
                quantity: vine.number(),
                total: vine.number(),
            })
        )
        .minLength(1),
    payments: vine
        .array(
            vine.object({
                methodId: vine.string(),
                name: vine.string(),
                transactionNo: vine.string().optional(),
                amount: vine.number(),
                note: vine.string().optional(),
            })
        )
        .minLength(1),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
};

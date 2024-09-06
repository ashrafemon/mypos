import vine from "@vinejs/vine";

export const StoreRules = {
    storeId: vine.string().optional(),
    customerId: vine.string(),
    // refNo: vine.string(),
    date: vine.date({ formats: { utc: true } }),
    discount: vine.number(),
    otherCharge: vine.number(),
    subtotal: vine.number(),
    total: vine.number(),
    products: vine
        .array(
            vine.object({
                productId: vine.string(),
                productName: vine.string(),
                quantity: vine.number(),
                amount: vine.number(),
                total: vine.number(),
            })
        )
        .minLength(1),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
    status: vine.string().in(["sent"]),
};

export const UpdateRules = {
    storeId: vine.string().optional(),
    customerId: vine.string(),
    // refNo: vine.string(),
    date: vine.date({ formats: { utc: true } }),
    discount: vine.number(),
    otherCharge: vine.number(),
    subtotal: vine.number(),
    total: vine.number(),
    products: vine
        .array(
            vine.object({
                id: vine.string().optional(),
                productId: vine.string(),
                productName: vine.string(),
                quantity: vine.number(),
                amount: vine.number(),
                total: vine.number(),
            })
        )
        .minLength(1),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
    status: vine.string().in(["sent"]),
};

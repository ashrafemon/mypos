import vine from "@vinejs/vine";

export const StoreRules = {
    supplierId: vine.string(),
    categoryId: vine.string(),
    brandId: vine.string(),
    unitId: vine.string(),
    taxRateId: vine
        .string()
        .optional()
        .requiredWhen("taxMethod", "=", "exclusive"),
    type: vine.string(),
    name: vine.string(),
    code: vine.string(),
    barcodeSymbology: vine.string(),
    price: vine.number(),
    discount: vine.number(),
    loyaltyPoint: vine.number(),
    alertQuantity: vine.number(),
    taxMethod: vine.string(),
    warranty: vine
        .object({
            status: vine.boolean(),
            type: vine.string().in(["day", "month", "year"]).optional(),
            value: vine.number().optional(),
        })
        .optional(),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    supplierId: vine.string().optional(),
    categoryId: vine.string().optional(),
    brandId: vine.string().optional(),
    unitId: vine.string().optional(),
    taxRateId: vine.string().optional(),
    type: vine.string().optional(),
    name: vine.string().optional(),
    code: vine.string().optional(),
    barcodeSymbology: vine.string().optional(),
    price: vine.number().optional(),
    discount: vine.number().optional(),
    loyaltyPoint: vine.number().optional(),
    alertQuantity: vine.number().optional(),
    taxMethod: vine.string().optional(),
    warranty: vine
        .object({
            status: vine.boolean().optional(),
            type: vine.string().in(["day", "month", "year"]).optional(),
            value: vine.number().optional(),
        })
        .optional(),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

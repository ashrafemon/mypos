import vine from "@vinejs/vine";

export const StoreRules = {
    type: vine.string().in(["deposit", "withdraw"]),
    incomeCategoryId: vine
        .string()
        .optional()
        .requiredWhen("type", "=", "deposit"),
    expenseCategoryId: vine
        .string()
        .optional()
        .requiredWhen("type", "=", "withdraw"),
    refNo: vine.string(),
    date: vine.date({ formats: { utc: true } }),
    amount: vine.number(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["pending", "done"]),
};

export const UpdateRules = {
    type: vine.string().in(["deposit", "withdraw"]).optional(),
    incomeCategoryId: vine
        .string()
        .optional()
        .requiredWhen("type", "=", "deposit"),
    expenseCategoryId: vine
        .string()
        .optional()
        .requiredWhen("type", "=", "withdraw"),
    refNo: vine.string().optional(),
    date: vine.date({ formats: { utc: true } }).optional(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["pending", "done"]).optional(),
};

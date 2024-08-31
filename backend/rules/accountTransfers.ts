import vine from "@vinejs/vine";

export const StoreRules = {
    fromAccountId: vine.string(),
    toAccountId: vine.string(),
    refNo: vine.string(),
    date: vine.date({ formats: { utc: true } }),
    amount: vine.number(),
    description: vine.string().optional(),
    status: vine.string().in(["pending", "done"]),
};

export const UpdateRules = {
    fromAccountId: vine.string().optional(),
    toAccountId: vine.string().optional(),
    refNo: vine.string().optional(),
    date: vine.date({ formats: { utc: true } }).optional(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    status: vine.string().in(["pending", "done"]).optional(),
};

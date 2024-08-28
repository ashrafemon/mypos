import vine from "@vinejs/vine";

export const StoreRules = {
    fromAccountId: vine.string(),
    toAccountId: vine.string(),
    refNo: vine.string(),
    date: vine.date(),
    amount: vine.number(),
    description: vine.string().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    fromAccountId: vine.string().optional(),
    toAccountId: vine.string().optional(),
    refNo: vine.string().optional(),
    date: vine.date().optional(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

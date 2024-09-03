import vine from "@vinejs/vine";

export const StoreRules = {
    storeId: vine.string().optional(),
    categoryId: vine.string(),
    accountId: vine.string(),
    date: vine.date({ formats: { utc: true } }),
    title: vine.string(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    photo: vine.string().optional(),
    contactPerson: vine
        .object({
            name: vine.string().optional(),
            phone: vine.string().optional(),
        })
        .optional(),
    status: vine.string().in(["pending"]),
};

export const UpdateRules = {
    storeId: vine.string().optional(),
    categoryId: vine.string().optional(),
    accountId: vine.string().optional(),
    date: vine.date({ formats: { utc: true } }).optional(),
    title: vine.string().optional(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    photo: vine.string().optional(),
    contactPerson: vine
        .object({
            name: vine.string().optional(),
            phone: vine.string().optional(),
        })
        .optional(),
    status: vine.string().in(["pending"]).optional(),
};

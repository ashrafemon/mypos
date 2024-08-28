import vine from "@vinejs/vine";

export const StoreRules = {
    categoryId: vine.string(),
    date: vine.date(),
    title: vine.string(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    address: vine.string().optional(),
    photo: vine.string().optional(),
    status: vine.string().in(["pending"]),
};

export const UpdateRules = {
    categoryId: vine.string().optional(),
    date: vine.date().optional(),
    title: vine.string().optional(),
    amount: vine.number().optional(),
    description: vine.string().optional(),
    address: vine.string().optional(),
    photo: vine.string().optional(),
    status: vine.string().in(["pending"]).optional(),
};

import vine from "@vinejs/vine";

export const StoreRules = {
    storeId: vine.string().optional(),
    name: vine.string(),
    rate: vine.number(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    storeId: vine.string().optional(),
    name: vine.string().optional(),
    rate: vine.number().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

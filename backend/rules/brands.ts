import vine from "@vinejs/vine";

export const StoreRules = {
    storeId: vine.string().optional(),
    name: vine.string(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    attachment: vine.string().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    storeId: vine.string().optional(),
    name: vine.string().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    attachment: vine.string().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

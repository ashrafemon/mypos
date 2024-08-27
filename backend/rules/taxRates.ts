import vine from "@vinejs/vine";

export const StoreRules = {
    name: vine.string(),
    rate: vine.number(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    name: vine.string().optional(),
    rate: vine.number().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

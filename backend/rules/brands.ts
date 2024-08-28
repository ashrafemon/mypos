import vine from "@vinejs/vine";

export const StoreRules = {
    name: vine.string(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    photo: vine.string().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    name: vine.string().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    photo: vine.string().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

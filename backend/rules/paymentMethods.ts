import vine from "@vinejs/vine";

export const StoreRules = {
    type: vine.string().in(["offline", "online"]),
    name: vine.string(),
    shortName: vine.string().optional(),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    type: vine.string().in(["offline", "online"]).optional(),
    name: vine.string().optional(),
    shortName: vine.string().optional(),
    description: vine.string().optional(),
    attachment: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

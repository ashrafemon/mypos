import vine from "@vinejs/vine";

export const StoreRules = {
    type: vine.string().in(["general", "pharmacy", "restaurant"]),
    name: vine.string(),
    email: vine.string().email().optional(),
    phone: vine.string(),
    code: vine.string(),
    address: vine.string(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    type: vine.string().in(["general", "pharmacy", "restaurant"]).optional(),
    name: vine.string().optional(),
    email: vine.string().email().optional(),
    phone: vine.string().optional(),
    code: vine.string().optional(),
    address: vine.string().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

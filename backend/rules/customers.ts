import vine from "@vinejs/vine";

export const StoreRules = {
    name: vine.string(),
    phone: vine.string(),
    email: vine.string().email(),
    dob: vine.date().optional(),
    groupId: vine.string(),
    discount: vine.number().optional(),
    type: vine.string().in(["retail", "wholesale"]),
    description: vine.string().optional(),
    address: vine.string().optional(),
    photo: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    name: vine.string().optional(),
    phone: vine.string().optional(),
    email: vine.string().email().optional(),
    dob: vine.date().optional(),
    groupId: vine.string().optional(),
    discount: vine.number().optional(),
    type: vine.string().in(["retail", "wholesale"]).optional(),
    description: vine.string().optional(),
    address: vine.string().optional(),
    photo: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

import vine from "@vinejs/vine";

export const StoreRules = {
    storeId: vine.string().optional(),
    name: vine.string(),
    phone: vine.string(),
    email: vine.string().email(),
    dob: vine.date({ formats: { utc: true } }).optional(),
    groupId: vine.string(),
    discount: vine.number().optional(),
    type: vine.string().in(["retail", "wholesale"]),
    description: vine.string().optional(),
    address: vine.string().optional(),
    attachment: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    storeId: vine.string().optional(),
    name: vine.string().optional(),
    phone: vine.string().optional(),
    email: vine.string().email().optional(),
    dob: vine.date({ formats: { utc: true } }).optional(),
    groupId: vine.string().optional(),
    discount: vine.number().optional(),
    type: vine.string().in(["retail", "wholesale"]).optional(),
    description: vine.string().optional(),
    address: vine.string().optional(),
    attachment: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

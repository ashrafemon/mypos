import vine from "@vinejs/vine";

export const StoreRules = {
    name: vine.string(),
    phone: vine.string(),
    email: vine.string().email(),
    contactPerson: vine
        .object({
            name: vine.string().optional(),
            phone: vine.string().optional(),
        })
        .optional(),
    address: vine.string().optional(),
    photo: vine.string().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    name: vine.string().optional(),
    phone: vine.string().optional(),
    email: vine.string().email().optional(),
    contactPerson: vine
        .object({
            name: vine.string().optional(),
            phone: vine.string().optional(),
        })
        .optional(),
    address: vine.string().optional(),
    photo: vine.string().optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

import vine from "@vinejs/vine";

export const StoreRules = {
    name: vine.string().minLength(3),
    phone: vine.string().regex(/^\d+$/),
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
    name: vine.string().minLength(3).optional(),
    phone: vine.string().regex(/^\d+$/).optional(),
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

import vine from "@vinejs/vine";

export const StoreRules = {
    type: vine.string().in(["cash", "bank", "mfs", "card"]),
    name: vine.string(),
    no: vine.string(),
    openingBalance: vine.number(),
    contactPerson: vine
        .object({
            name: vine.string().optional(),
            phone: vine.string().optional(),
        })
        .optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    type: vine.string().in(["cash", "bank", "mfs", "card"]).optional(),
    name: vine.string().optional(),
    no: vine.string().optional(),
    openingBalance: vine.number(),
    contactPerson: vine
        .object({
            name: vine.string().optional(),
            phone: vine.string().optional(),
        })
        .optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

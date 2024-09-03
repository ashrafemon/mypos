import vine from "@vinejs/vine";

export const StoreRules = {
    storeId: vine.string().optional(),
    name: vine.string(),
    shortName: vine.string(),
    symbol: vine.string(),
    decimalPlace: vine.number(),
    baseAmount: vine.number(),
    position: vine.string().in(["start", "end"]),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]),
};

export const UpdateRules = {
    storeId: vine.string().optional(),
    name: vine.string().optional(),
    shortName: vine.string().optional(),
    symbol: vine.string().optional(),
    decimalPlace: vine.number().optional(),
    baseAmount: vine.number().optional(),
    position: vine.string().in(["start", "end"]).optional(),
    description: vine.string().optional(),
    order: vine.number().optional(),
    status: vine.string().in(["active", "inactive"]).optional(),
};

import vine from "@vinejs/vine";

export const RegisterRules = {
    name: vine.string(),
    email: vine.string().email(),
    phone: vine.string(),
    password: vine.string().minLength(6),
};

export const LoginRules = {
    user: vine.string(),
    password: vine.string().minLength(6),
    // code: vine.string(),
};

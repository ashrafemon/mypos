export type LoginType = {
    user: string;
    password: string;
    code?: string;
};

export type RegisterType = {
    name: string;
    email: string;
    phone: string;
    password: string;
};

export type StoreLoginType = {
    storeId: string;
};

export type AuthUserType = {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
    gender?: string;
    selectedStoreId?: string;
};

type ContactPersonType = {
    name?: string;
    phone?: string;
};

export type SupplierType = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    contactPerson?: ContactPersonType | null;
    description?: string;
    photo?: string;
    order?: string;
    status?: string;
};

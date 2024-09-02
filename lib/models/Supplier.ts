import { ContactPersonType } from "./Base";

export type SupplierType = {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    contactPerson?: ContactPersonType | null;
    description?: string;
    attachment?: string;
    order?: string;
    status?: string;
};

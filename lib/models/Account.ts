import { ContactPersonType } from "./Base";

export type AccountType = {
    id?: string;
    type?: string;
    name?: string;
    no?: string;
    openingBalance?: string;
    contactPerson?: ContactPersonType | null;
    description?: string;
    order?: string;
    status?: string;
};

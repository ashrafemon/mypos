import { AccountType } from "./Account";
import { ContactPersonType } from "./Base";
import { IncomeCategoryType } from "./IncomeCategory";

export type IncomeType = {
    id?: string;
    categoryId?: string;
    accountId?: string;
    refNo?: string;
    date?: string;
    title?: string;
    description?: string;
    contactPerson?: ContactPersonType | null;
    amount?: number;
    attachment?: string;
    status?: string;

    category?: IncomeCategoryType | null;
    account?: AccountType | null;
};

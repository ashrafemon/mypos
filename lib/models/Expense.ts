import { ExpenseCategoryType } from "./ExpenseCategory";

export type ExpenseType = {
    id?: string;
    categoryId?: string;
    refNo?: string;
    date?: string;
    title?: string;
    description?: string;
    amount?: number;
    photo?: string;
    status?: string;
    category?: ExpenseCategoryType | null;
};

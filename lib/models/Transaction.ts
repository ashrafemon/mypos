import { ExpenseCategory, IncomeCategory } from "@prisma/client";

export type TransactionType = {
    id?: string;
    incomeCategoryId?: string;
    expenseCategoryId?: string;
    type?: string;
    refNo?: string;
    date?: string;
    amount?: number;
    description?: string;
    status?: string;
    incomeCategory?: IncomeCategory | null;
    expenseCategory?: ExpenseCategory | null;
};

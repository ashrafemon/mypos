export type SaleProductType = {
    id?: string;
    productId: string;
    name?: string;
    code?: string;
    price?: number;
    discount?: number;
    taxMethod?: string;
    taxRate?: number;
    quantity: number;
    total: number;
};

export type SalePaymentType = {
    id?: string;
    methodId: string;
    name?: string;
    transactionNo?: string;
    amount: number;
    note?: string;
};

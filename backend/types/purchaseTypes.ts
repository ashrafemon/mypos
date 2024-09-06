export type PurchaseProductType = {
    id?: string;
    productId: string;
    productName?: string;
    quantity: number;
    amount: number;
    total: number;
    expireAt?: string;
};

export type PurchasePaymentType = {
    id?: string;
    methodId: string;
    methodName?: string;
    transactionNo: string;
    amount: number;
};

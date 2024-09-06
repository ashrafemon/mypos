export type PurchaseProductType = {
    id?: string | any;
    productId?: string | any;
    productName?: string | any;
    quantity?: number | any;
    amount?: number | any;
    total?: number | any;
    expireAt?: any;
};

export type PurchasePaymentType = {
    io?: string;
    methodId?: string;
    methodName?: string;
    amount: number;
    transactionNo?: string | any;
};

export type PurchaseType = {
    id?: string;
    supplierId?: string;
    refNo?: string;
    invoiceNo?: string;
    date?: string;
    discount?: number;
    otherCharge?: number;
    subtotal?: number;
    total?: number;
    purchaseProducts?: PurchaseProductType[];
    purchasePayments?: PurchasePaymentType[];
    description?: string;
    attachment?: string;
    status?: string;
};

export type PurchaseReturnType = {
    id?: string;
    supplierId?: string;
    refNo?: string;
    invoiceNo?: string;
    date?: string;
    discount?: number;
    otherCharge?: number;
    subtotal?: number;
    total?: number;
    description?: string;
    attachment?: string;
    status?: string;
};

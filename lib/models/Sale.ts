export type SaleType = {
    id?: string;
    customerId?: string;
    counterId?: string;
    invoiceNo?: string;
    date?: string;
    discount?: number;
    otherCharge?: number;
    shippingCharge?: number;
    orderTax?: number;
    subtotal?: number;
    total?: number;
    // purchaseProducts?: PurchaseProductType[];
    // purchasePayments?: PurchasePaymentType[];
    description?: string;
    attachment?: string;
    status?: string;
    customer?: {
        name: string;
    } | null;
};

export type SaleReturnType = {
    id?: string;
    name?: string;
    description?: string;
    order?: string;
    status?: string;
};

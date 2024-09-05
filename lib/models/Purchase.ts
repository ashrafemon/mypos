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

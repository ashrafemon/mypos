export type QuotationProductType = {
    id?: string | any;
    productId?: string | any;
    productName?: string | any;
    quantity?: number | any;
    amount?: number | any;
    total?: number | any;
    expireAt?: any;
};

export type QuotationType = {
    id?: string;
    customerId?: string;
    refNo?: string;
    invoiceNo?: string;
    date?: string;
    discount?: number;
    otherCharge?: number;
    subtotal?: number;
    total?: number;
    quotationProducts?: QuotationProductType[];
    description?: string;
    attachment?: string;
    status?: string;
};

export type QuotationReturnType = {
    id?: string;
    customerId?: string;
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

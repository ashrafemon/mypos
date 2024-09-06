import { LoaderProps, TableProps } from "@mantine/core";

export type IValueType = string | number | undefined | null;

export type LayoutType = {
    children: React.ReactNode;
};

export type CollapseLinkType = {
    name?: string;
    icon?: string;
    collapsed?: boolean;
    link?: string;
    links?: { name: string; link: string }[];
    clickFunc?: () => void;
};

export type CollapseLinkComponentType = {
    children: React.ReactNode;
    className?: string;
    hasChild?: boolean;
    link?: string;
    collapseHandler?: () => void;
};

export type AppTableHeaderOptionsType = {
    key: string;
    label: string;
    w?: number;
    align?: "center" | "left" | "right" | "justify" | "char" | undefined;
};

export type AppTableType = TableProps & {
    topContent?: React.ReactNode;
    topContentClassName?: string;
    bottomContent?: React.ReactNode;

    headers?: AppTableHeaderOptionsType[];
    data: React.ReactNode;
    footer?: React.ReactNode;

    isFound?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    error?: any;

    contentHeight?: number | string;
    contentWidth?: number | string;
};

export type PaginateResponseType = {
    current_page: number;
    data: any;
    first_page: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
};

export type ResponseType = {
    status?: string;
    statusCode?: number;
    message?: string;
    data?: any;
} | null;

export type AErrorType = {
    status?: number;
    originalStatus?: string;
    error?: string;
};

export type LoaderType = {
    size?: number;
    isLoading?: boolean;
    isError?: boolean;
    error?: AErrorType | any;
} & LoaderProps;

export type PurchaseProductType = {
    productId: string | any;
    productName: string | any;
    quantity: number | any;
    amount: number | any;
    total: number | any;
    expireAt?: any;
};

export type PurchasePaymentType = {
    methodId: string;
    methodName?: string;
    amount: number;
    transactionNo?: string | any;
};

export type PurchaseFormType = {
    supplierId: string | null;
    refNo: string;
    invoiceNo: string;
    date: any;
    discount: number;
    otherCharge: number;
    subtotal?: number;
    total?: number;
    products: PurchaseProductType[];
    payments: PurchasePaymentType[];
    description: string;
    attachment: string | null;
    status: string;
};

export type QuotationFormType = {
    customerId: string | null;
    // refNo: string;
    invoiceNo: string;
    date: any;
    discount: number;
    otherCharge: number;
    subtotal?: number;
    total?: number;
    products: PurchaseProductType[];
    description: string;
    attachment: string | null;
    status: string;
};

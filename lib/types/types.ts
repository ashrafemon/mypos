import { TableProps } from "@mantine/core";

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

    isFound?: boolean;
    isLoading?: boolean;

    contentHeight?: number | string;
};

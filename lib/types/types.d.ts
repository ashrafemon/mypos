declare type LayoutType = {
    children: React.ReactNode;
};

declare type CollapseLinkType = {
    name?: string;
    icon?: string;
    collapsed?: boolean;
    link?: string;
    links?: { name: string; link: string }[];
};

declare type CollapseLinkComponentType = {
    children: React.ReactNode;
    className?: string;
    hasChild?: boolean;
    link?: string;
    collapseHandler?: () => void;
};

declare type TableHeaderColumnType = {
    key: string;
    label: string;
};

declare type TableType = {
    headers?: TableHeaderColumnType[];
    hideHeader?: boolean;
    isHeaderSticky?: boolean;
    isStriped?: boolean;
    isCompact?: boolean;
    fullWidth?: boolean;
    radius?: none | sm | md | lg;
    body: React.ReactNode;
    isLoading?: boolean;
    topContent?: React.ReactNode;
    topContentPlacement?: inside | outside;
    bottomContent?: React.ReactNode;
    bottomContentPlacement?: inside | outside;
    emptyContent?: String;
};

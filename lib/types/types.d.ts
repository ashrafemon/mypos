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

declare type LoadingType = {
    label?: string;
};

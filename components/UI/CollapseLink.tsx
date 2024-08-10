"use client";

import { cn } from "@/lib/utils/helper";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React, { useState } from "react";

type IProps = {
    name?: string;
    icon?: string;
    collapsed?: boolean;
    link?: string;
    links?: { name: string; link: string }[];
};

const Comp = ({
    children,
    hasChild = false,
    className,
    link = "",
    collapseHandler = () => {},
}: {
    children: React.ReactNode;
    hasChild?: boolean;
    className?: string;
    link?: string;
    collapseHandler?: () => void;
}) => {
    if (hasChild) {
        return (
            <div className={className} onClick={collapseHandler}>
                {children}
            </div>
        );
    }

    return (
        <Link href={link} className={className}>
            {children}
        </Link>
    );
};

const CollapseLink: React.FC<IProps> = ({
    name,
    icon = "",
    collapsed = false,
    link = "",
    links = [],
}) => {
    const [isCollapse, setIsCollapse] = useState(collapsed);

    return (
        <div className="relative">
            <Comp
                hasChild={links.length > 0}
                className={cn(
                    "flex gap-2 items-center relative cursor-pointer",
                    {
                        "before:absolute before:content-[''] before:w-3 before:h-1 before:bg-[#4F5875] before:top-3 before:left-6 before:-z-10":
                            isCollapse,
                    }
                )}
                link={link}
                collapseHandler={() => setIsCollapse(!isCollapse)}
            >
                <div
                    className={cn("p-[5px] rounded-full", {
                        "bg-[#4F5875]": isCollapse,
                    })}
                >
                    <Icon icon={icon} width={17} className="text-white" />
                </div>

                <div
                    className={cn(
                        "px-3 py-[5px] rounded-full w-full relative",
                        {
                            "bg-[#4F5875]": isCollapse,
                        }
                    )}
                >
                    <p className="text-sm text-white font-semibold">{name}</p>

                    {links.length > 0 && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-2">
                            <Icon
                                icon={
                                    isCollapse
                                        ? "bx:chevron-down"
                                        : "bx:chevron-right"
                                }
                                width={20}
                                className="text-white"
                            />
                        </div>
                    )}
                </div>
            </Comp>

            {isCollapse && links.length > 0 && (
                <div className="flex flex-col gap-3 pl-12 my-3">
                    {links.map((item, i) => (
                        <div
                            key={i}
                            className="relative before:content-[''] before:w-[5px] before:h-[2px] before:bg-white before:top-2 before:-left-4 before:absolute"
                        >
                            <Link
                                href={item.link}
                                className="text-white text-sm block"
                            >
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CollapseLink;

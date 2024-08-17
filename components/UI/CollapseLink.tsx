"use client";

import { CollapseLinkType } from "@/lib/types/types";
import { cn } from "@/lib/utils/helper";
import { Icon } from "@iconify/react";
import { NavLink } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";

const classes = {
    before: "before:absolute before:content-[''] before:w-3 before:h-1 before:bg-[#4F5875] before:top-3 before:left-6 before:-z-10",
    after: "after:absolute after:content-[''] after:w-3 after:h-1 after:bg-[#4F5875] after:top-3 after:right-6 after:-z-10",
};

const CollapseLink: React.FC<CollapseLinkType> = ({
    name,
    icon = "",
    collapsed = false,
    link = "",
    links = [],
    clickFunc = () => {},
}) => {
    const [isCollapse, setIsCollapse] = useState(collapsed);

    if (links.length > 0) {
        return (
            <NavLink
                href={link}
                label={name}
                leftSection={<Icon icon={icon} />}
                childrenOffset={20}
                defaultOpened={isCollapse}
                onChange={(value) => setIsCollapse(value)}
                classNames={{
                    root: cn(
                        "text-white font-medium hover:bg-transparent p-0 relative",
                        { [classes.before]: isCollapse },
                        { [classes.after]: isCollapse }
                    ),
                    body: cn("px-2 leading-relaxed rounded-full", {
                        "bg-[#4F5875]": isCollapse,
                    }),
                    section: cn("rounded-full p-1", {
                        "bg-[#4F5875]": isCollapse,
                    }),
                }}
            >
                {links.map((item, i) => (
                    <NavLink
                        key={i}
                        href={item.link}
                        label={item.name}
                        component={Link}
                        classNames={{
                            root: "text-white font-medium p-0 hover:bg-transparent data-[active='true']:bg-[#4F5875]",
                            body: "leading-relaxed px-2 rounded-full hover:bg-[#4F5875]",
                        }}
                        leftSection={<Icon icon="bi:arrow-bar-right" />}
                        onClick={clickFunc}
                    />
                ))}
            </NavLink>
        );
    }

    return (
        <NavLink
            href={link}
            label={name}
            leftSection={<Icon icon={icon} />}
            component={Link}
            defaultOpened={isCollapse}
            onChange={(value) => setIsCollapse(value)}
            classNames={{
                root: cn(
                    "text-white font-medium hover:bg-transparent p-0 relative",
                    { [classes.before]: isCollapse }
                ),
                body: cn("px-2 leading-relaxed rounded-full", {
                    "bg-[#4F5875]": isCollapse,
                }),
                section: cn("rounded-full p-1", {
                    "bg-[#4F5875]": isCollapse,
                }),
            }}
            onClick={clickFunc}
        />
    );
};

export default CollapseLink;

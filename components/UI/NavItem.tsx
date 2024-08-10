import { cn } from "@/lib/utils/helper";
import { Icon } from "@iconify/react";
import Link from "next/link";
import React from "react";

type IProps = {
    collapsed?: boolean;
    hasChild?: boolean;
    links?: { name: string }[];
};

const NavItem: React.FC<IProps> = ({
    collapsed = false,
    hasChild = false,
    links = [],
}) => {
    return (
        <div className="relative">
            <div
                className={cn("flex gap-2 items-center relative", {
                    "before:absolute before:content-[''] before:w-3 before:h-1 before:bg-[#4F5875] before:top-3 before:left-6 before:-z-10":
                        collapsed,
                })}
            >
                <div
                    className={cn("p-[5px] rounded-full", {
                        "bg-[#4F5875]": collapsed,
                    })}
                >
                    <Icon icon="bx:store" width={17} className="text-white" />
                </div>

                <div
                    className={cn(
                        "px-3 py-[5px] rounded-full w-full relative",
                        {
                            "bg-[#4F5875]": collapsed,
                        }
                    )}
                >
                    <p className="text-sm text-white font-semibold">Outlets</p>

                    {hasChild && (
                        <div className="absolute top-1/2 -translate-y-1/2 right-2">
                            <Icon
                                icon={
                                    collapsed
                                        ? "bx:chevron-down"
                                        : "bx:chevron-right"
                                }
                                width={20}
                                className="text-white"
                            />
                        </div>
                    )}
                </div>
            </div>

            {links?.length > 0 && (
                <div className="flex flex-col gap-3 pl-12 my-3">
                    {links?.map((item, i) => (
                        <div
                            key={i}
                            className="relative before:content-[''] before:w-[5px] before:h-[2px] before:bg-white before:top-2 before:-left-4 before:absolute"
                        >
                            <Link href="/" className="text-white text-sm block">
                                {item.name}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NavItem;

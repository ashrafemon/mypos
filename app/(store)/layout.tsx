import CollapseLink from "@/components/UI/CollapseLink";
import Scrollbar from "@/components/UI/Scrollbar";
import Images from "@/lib/constants/Images";
import { StoreLinks } from "@/lib/constants/Links";
import { LayoutType } from "@/lib/types/types";
import { Icon } from "@iconify/react";
import { ActionIcon, Avatar } from "@mantine/core";
import Image from "next/image";
import React from "react";

const layout: React.FC<LayoutType> = ({ children }) => {
    return (
        <div className="w-full h-screen">
            <div className="w-[250px] h-full bg-secondary fixed top-0 left-0">
                <div className="w-full h-[70px] bg-white/20 p-2 flex items-center">
                    <Image
                        src={Images.Logo}
                        alt="Logo"
                        width={150}
                        height={35}
                    />
                </div>

                <Scrollbar className="h-[calc(100%-70px)] px-5 py-8">
                    <div className="flex flex-col gap-2">
                        {StoreLinks.map((item, i) => (
                            <CollapseLink
                                key={i}
                                name={item.name}
                                icon={item.icon}
                                link={item.link}
                                links={item.links}
                                // collapsed
                            />
                        ))}
                    </div>
                </Scrollbar>
            </div>
            <div className="w-[calc(100%-250px)] h-full ml-auto bg-[#FEFEFE]">
                <div className="h-[70px] bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.07)] p-2 flex items-center gap-1 justify-between">
                    <div className="flex gap-1 items-center">
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="mdi:point-of-sale" width={18} />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="svg-spinners:clock" width={18} />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="quill:stack-alt" width={18} />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="ri:secure-payment-fill" width={18} />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="simple-icons:quicktime" width={18} />
                        </ActionIcon>
                    </div>

                    <div className="flex gap-2 items-center">
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="fxemoji:lock" width={18} />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Icon icon="cil:language" width={18} />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Icon
                                icon="clarity:notification-solid"
                                width={18}
                            />
                        </ActionIcon>
                        <ActionIcon size="lg" variant="light">
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        </ActionIcon>
                    </div>
                </div>
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
};

export default layout;

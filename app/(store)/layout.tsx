import CollapseLink from "@/components/UI/CollapseLink";
import Scrollbar from "@/components/UI/Scrollbar";
import { StoreLinks } from "@/lib/constants/Links";
import { Icon } from "@iconify/react";
import { Avatar, Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

const layout: React.FC<LayoutType> = ({ children }) => {
    return (
        <div className="w-full h-screen">
            <div className="w-[250px] h-full bg-secondary fixed top-0 left-0">
                <div className="w-full h-[70px] bg-white/20 p-2 flex items-center">
                    <Image
                        src="https://doorsoft-demo.com/off_pos/all_types/uploads/site_settings/e8479c463b815b121d0631649a24c792.png"
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
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon icon="mdi:point-of-sale" width={18} />
                        </Button>
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon icon="svg-spinners:clock" width={18} />
                        </Button>
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon icon="quill:stack-alt" width={18} />
                        </Button>
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon icon="ri:secure-payment-fill" width={18} />
                        </Button>
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon icon="simple-icons:quicktime" width={18} />
                        </Button>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon icon="fxemoji:lock" width={18} />
                        </Button>
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon icon="cil:language" width={18} />
                        </Button>
                        <Button isIconOnly color="primary" variant="flat">
                            <Icon
                                icon="clarity:notification-solid"
                                width={18}
                            />
                        </Button>
                        <Button isIconOnly color="primary" variant="flat">
                            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                        </Button>
                    </div>
                </div>
                <div className="p-2">{children}</div>
            </div>
        </div>
    );
};

export default layout;

import CollapseLink from "@/components/UI/CollapseLink";
import Scrollbar from "@/components/UI/Scrollbar";
import { StoreLinks } from "@/lib/constants/Links";
import Image from "next/image";
import React from "react";

const layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
            <div className="w-[calc(100%-250px)] h-full ml-auto p-2 bg-[#FEFEFE]">
                {children}
            </div>
        </div>
    );
};

export default layout;

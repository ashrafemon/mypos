import NavItem from "@/components/UI/NavItem";
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

                <div className="h-[calc(100%-70px)] overflow-y-auto px-5 py-8">
                    <div className="flex flex-col gap-2">
                        {Array(30)
                            .fill(1)
                            .map((_, i) => (
                                <NavItem
                                    key={i}
                                    collapsed
                                    hasChild
                                    links={[
                                        { name: "List Outlet" },
                                        { name: "Add Outlet" },
                                    ]}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <div className="w-[calc(100%-250px)] h-full ml-auto p-2">
                {children}
            </div>
        </div>
    );
};

export default layout;

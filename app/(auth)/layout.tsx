import Images from "@/lib/constants/Images";
import { LayoutType } from "@/lib/types/types";
import { Center, Stack } from "@mantine/core";
import Image from "next/image";
import React from "react";

const layout: React.FC<LayoutType> = ({ children }) => {
    return (
        <Stack
            className="bg-[#F5F5F5] w-full h-screen"
            justify="center"
            align="center"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 rounded-md overflow-hidden">
                <div className="relative">
                    <Image
                        src={Images.AuthPos}
                        alt="Auth Pos"
                        className="w-full h-full"
                    />
                    <div className="absolute w-full h-full bg-black/50 top-0 left-0 p-4 text-white flex flex-col gap-1 justify-center">
                        <h3 className="text-2xl font-semibold">
                            Start Your Journey With Us!
                        </h3>
                        <p className="text-sm text-justify font-semibold">
                            Empower your business with cutting-edge POS
                            solutions. Transform your transactions into seamless
                            experiences.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-4">{children}</div>
            </div>
        </Stack>
    );
};

export default layout;

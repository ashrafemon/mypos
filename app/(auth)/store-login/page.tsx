import StoreLoginForm from "@/components/(auth)/StoreLoginForm";
import Images from "@/lib/constants/Images";
import Image from "next/image";
import React from "react";

const page = () => {
    return (
        <>
            <div className="w-28 h-10 mx-auto overflow-hidden mb-5">
                <Image
                    src={Images.AuthPos}
                    alt="Logo"
                    className="w-full h-full"
                />
            </div>

            <div className="flex flex-col gap-5">
                <h3 className="text-xl font-semibold text-center">
                    Please Select a Store
                </h3>
                <StoreLoginForm />
            </div>
        </>
    );
};

export default page;

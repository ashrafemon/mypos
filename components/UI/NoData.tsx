import Images from "@/lib/constants/Images";
import Image from "next/image";
import React from "react";

const NoData = () => {
    return (
        <div className="w-full">
            <Image
                src={Images.NoData}
                alt="No Data"
                className="w-2/5 h-auto mx-auto rounded"
            />
        </div>
    );
};

export default NoData;

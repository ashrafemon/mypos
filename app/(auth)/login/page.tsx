import LoginForm from "@/components/(auth)/LoginForm";
import Images from "@/lib/constants/Images";
import Image from "next/image";

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
                <h3 className="text-2xl font-semibold">Please Login</h3>
                <LoginForm />
            </div>
        </>
    );
};

export default page;

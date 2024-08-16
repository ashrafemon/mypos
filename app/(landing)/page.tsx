import { Button } from "@mantine/core";
import Link from "next/link";

const page = () => {
    return (
        <div className="h-screen flex flex-col gap-2 items-center justify-center">
            <h3 className="text-5xl font-semibold">
                Development Server of MyPOS
            </h3>
            <p className="text-lg">Please wait until development complete...</p>
            <Link href="/login">
                <Button variant="primary">Login to Store</Button>
            </Link>
        </div>
    );
};

export default page;

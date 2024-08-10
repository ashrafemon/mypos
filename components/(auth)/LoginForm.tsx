"use client";

import React from "react";
import TextField from "../UI/TextField";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const router = useRouter();

    return (
        <form className="flex flex-col gap-5">
            <TextField label="Email Address/Phone" placeholder="john@xyz.com" />
            <TextField label="Password" placeholder="******" />

            <div className="text-right">
                <Link href="/" className="text-sm font-semibold underline">
                    Forget Password
                </Link>
            </div>

            <Button
                radius="sm"
                fullWidth
                className="font-semibold"
                onClick={() => router.push("/dashboard")}
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;

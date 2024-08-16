"use client";

import React from "react";
import TextField from "../UI/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";

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
                variant="primary"
                className="font-bold"
                onClick={() => router.push("/dashboard")}
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;

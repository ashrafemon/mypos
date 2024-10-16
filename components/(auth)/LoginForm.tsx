"use client";

import { message, validateError } from "@/lib/utils/helper";
import { useCreateLoginMutation } from "@/states/actions/auth";
import { Box, Button, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Validator from "Validator";
import TextField from "../UI/TextField";
import SecretTextField from "../UI/SecretTextField";

const LoginForm = () => {
    const router = useRouter();

    const [create, result] = useCreateLoginMutation();

    const [form, setForm] = useState({
        user: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        user: { text: "", show: false },
        password: { text: "", show: false },
    });

    const fieldChangeHandler = (field: string, value: string | any) => {
        setErrors((prevState) => ({
            ...prevState,
            [field]: { text: "", show: false },
        }));
        setForm((prevState) => ({ ...prevState, [field]: value }));
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const validator = await Validator.make(form, {
            user: "required",
            password: "required|min:6",
        });

        if (validator.fails()) {
            setErrors((prevState) => ({
                ...prevState,
                ...validateError(validator.getErrors()),
            }));
            return;
        }

        try {
            const payload = await create(form).unwrap();

            message({
                title: payload.message,
                icon: "success",
                timer: 3000,
            });

            router.push("/store-login");
        } catch (err: { message: string; status: string; data: any } | any) {
            message({
                title: err.message,
                icon: "error",
                timer: 3000,
            });
            if (err.status === "validateError") {
                setErrors((prevState) => ({
                    ...prevState,
                    ...validateError(err.data),
                }));
            }
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <Stack gap="md">
                <TextField
                    label="Email Address/Phone"
                    placeholder="Ex. john@xyz.com/0190000000"
                    value={form.user}
                    error={errors.user.text}
                    onChange={(e) => fieldChangeHandler("user", e.target.value)}
                />
                <SecretTextField
                    label="Password"
                    placeholder="Ex. 123456"
                    value={form.password}
                    error={errors.password.text}
                    onChange={(e) =>
                        fieldChangeHandler("password", e.target.value)
                    }
                />

                <Box ta="right">
                    <Link href="/" className="text-sm font-semibold underline">
                        Forget Password
                    </Link>
                </Box>

                <Box>
                    <Text size="sm" fw={600}>
                        Phone: 01982411208
                    </Text>
                    <Text size="sm" fw={600}>
                        Password: 123456
                    </Text>
                </Box>

                <Button type="submit" loading={result.isLoading}>
                    Login
                </Button>

                <Box ta="center">
                    <Link
                        href="/register"
                        className="text-sm font-semibold underline"
                    >
                        Don&apos;t have an account?
                    </Link>
                </Box>
            </Stack>
        </form>
    );
};

export default LoginForm;

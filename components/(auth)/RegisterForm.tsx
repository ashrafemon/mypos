"use client";

import { message, validateError } from "@/lib/utils/helper";
import { useCreateRegisterMutation } from "@/states/actions/auth";
import { Box, Button, Stack } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Validator from "Validator";
import SecretTextField from "../UI/SecretTextField";
import TextField from "../UI/TextField";

const RegisterForm = () => {
    const router = useRouter();

    const [create, result] = useCreateRegisterMutation();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        name: { text: "", show: false },
        email: { text: "", show: false },
        phone: { text: "", show: false },
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
            name: "required",
            email: "required|email",
            phone: "required",
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

            router.push("/login");
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
                    label="Name"
                    placeholder="Ex. john@xyz.com/0190000000"
                    value={form.name}
                    error={errors.name.text}
                    onChange={(e) => fieldChangeHandler("name", e.target.value)}
                />
                <TextField
                    label="Email Address"
                    placeholder="Ex. john@xyz.com"
                    value={form.email}
                    error={errors.email.text}
                    onChange={(e) =>
                        fieldChangeHandler("email", e.target.value)
                    }
                />
                <TextField
                    label="Phone"
                    placeholder="Ex. 0190000000"
                    value={form.phone}
                    error={errors.phone.text}
                    onChange={(e) =>
                        fieldChangeHandler("phone", e.target.value)
                    }
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

                <Button type="submit" loading={result.isLoading}>
                    Register
                </Button>

                <Box ta="center">
                    <Link
                        href="/login"
                        className="text-sm font-semibold underline"
                    >
                        Already have an account?
                    </Link>
                </Box>
            </Stack>
        </form>
    );
};

export default RegisterForm;

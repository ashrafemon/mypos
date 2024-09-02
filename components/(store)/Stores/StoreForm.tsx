"use client";

import AppLoading from "@/components/UI/AppLoading";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { OutletType } from "@/lib/models/Outlet";
import { message, validateError } from "@/lib/utils/helper";
import {
    useCreateOutletMutation,
    useFetchOutletQuery,
    useUpdateOutletMutation,
} from "@/states/actions/stores/outlets";
import { Button, Grid, Group } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Validator from "Validator";

const StoreForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data, isFetching } = useFetchOutletQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateOutletMutation();
    const [update, resultUpdate] = useUpdateOutletMutation();

    const [form, setForm] = useState({
        type: "general",
        name: "",
        code: "",
        phone: "",
        email: "",
        address: "",
        description: "",
        attachment: null,
        status: "active",
    });

    const [errors, setErrors] = useState({
        type: { text: "", show: false },
        name: { text: "", show: false },
        code: { text: "", show: false },
        phone: { text: "", show: false },
        email: { text: "", show: false },
        address: { text: "", show: false },
        description: { text: "", show: false },
        attachment: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            type: { text: "", show: false },
            name: { text: "", show: false },
            code: { text: "", show: false },
            phone: { text: "", show: false },
            email: { text: "", show: false },
            address: { text: "", show: false },
            description: { text: "", show: false },
            attachment: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            type: "general",
            name: "",
            code: "",
            phone: "",
            email: "",
            address: "",
            description: "",
            attachment: null,
            status: "active",
        });
    };

    const fieldChangeHandler = (
        field: string,
        subfield: string | any,
        value: any
    ) => {
        let errKey = field;
        let fieldValue = value;

        if (subfield) {
            errKey += "." + subfield;
            fieldValue = { ...(form as any)[field] };
            fieldValue[subfield] = value;
        }

        if (errKey) {
            setErrors((prevState) => ({
                ...prevState,
                [errKey]: { text: "", show: false },
            }));
        }
        setForm((prevState) => ({ ...prevState, [field]: fieldValue }));
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await formAction(() => router.push("/stores"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            type: "required|in:general,pharmacy,restaurant",
            name: "required",
            code: "required",
            email: "sometimes|email",
            phone: "required",
            status: "required|in:active,inactive",
        });

        if (validator.fails()) {
            setErrors((prevState) => ({
                ...prevState,
                ...validateError(validator.getErrors()),
            }));
            return;
        }

        try {
            const payload = id
                ? await update(form).unwrap()
                : await create(form).unwrap();

            resetHandler();
            message({
                title: payload.message,
                icon: "success",
                timer: 3000,
            });
            cb();
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

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const payload: OutletType = { ...data };
            let obj = { ...form };
            Object.keys(payload).forEach((key: string) => {
                if ((payload as any)[key] !== null) {
                    (obj as any)[key] = (payload as any)[key];
                }
            });
            setForm(obj);
        }
    }, [data]);

    if (isFetching) {
        return <AppLoading />;
    }

    return (
        <form onSubmit={submitHandler}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Name"
                        placeholder="Ex. My Store"
                        withAsterisk
                        value={form.name}
                        error={errors.name.text}
                        onChange={(e) =>
                            fieldChangeHandler("name", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Code"
                        placeholder="000000"
                        withAsterisk
                        value={form.code}
                        error={errors.code.text}
                        onChange={(e) =>
                            fieldChangeHandler("code", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Phone"
                        placeholder="Ex. 010000000"
                        withAsterisk
                        value={form.phone}
                        error={errors.phone.text}
                        onChange={(e) =>
                            fieldChangeHandler("phone", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Email"
                        placeholder="Ex. john@doe.com"
                        value={form.email}
                        error={errors.email.text}
                        onChange={(e) =>
                            fieldChangeHandler("email", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Status"
                        placeholder="Ex. Active"
                        data={ActivityStatusOptions}
                        withAsterisk
                        value={form.status}
                        error={errors.status.text}
                        onChange={(value) =>
                            fieldChangeHandler("status", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor
                        label="Address"
                        placeholder="Ex. Landmark"
                        minRows={2}
                        value={form.address}
                        error={errors.address.text}
                        onChange={(e) =>
                            fieldChangeHandler("address", null, e.target.value)
                        }
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 12 }}>
                    <Group gap="xs">
                        <Button
                            type="submit"
                            loading={
                                result?.isLoading || resultUpdate?.isLoading
                            }
                        >
                            Save
                        </Button>
                        {!id && (
                            <Button
                                onClick={() => formAction()}
                                loading={
                                    result?.isLoading || resultUpdate?.isLoading
                                }
                            >
                                Save & Add More
                            </Button>
                        )}
                        <Button
                            color="red"
                            onClick={() => router.push("/stores")}
                            loading={
                                result?.isLoading || resultUpdate?.isLoading
                            }
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default StoreForm;

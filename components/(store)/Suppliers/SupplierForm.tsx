"use client";

import AppLoading from "@/components/UI/AppLoading";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { SupplierType } from "@/lib/models/Supplier";
import { validateError } from "@/lib/utils/helper";
import {
    useCreateSupplierMutation,
    useFetchSupplierQuery,
    useUpdateSupplierMutation,
} from "@/states/actions/stores/suppliers";
import { Button, Grid, Group } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Validator from "Validator";

const SupplierForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data, isFetching } = useFetchSupplierQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateSupplierMutation();
    const [update, resultUpdate] = useUpdateSupplierMutation();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        contactPerson: {
            name: "",
            phone: "",
        },
        address: "",
        description: "",
        status: "active",
    });

    const [errors, setErrors] = useState({
        name: { text: "", show: false },
        phone: { text: "", show: false },
        email: { text: "", show: false },
        address: { text: "", show: false },
        "contactPerson.name": { text: "", show: false },
        description: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            name: { text: "", show: false },
            phone: { text: "", show: false },
            email: { text: "", show: false },
            address: { text: "", show: false },
            "contactPerson.name": { text: "", show: false },
            description: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            name: "",
            phone: "",
            email: "",
            contactPerson: {
                name: "",
                phone: "",
            },
            address: "",
            description: "",
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
        await formAction(() => router.push("/suppliers"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            name: "required",
            email: "required|email",
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

        if (id) {
            update(form)
                .unwrap()
                .then((res) => {
                    toast.success(res.message);
                    cb();
                })
                .catch((err) => {
                    toast.error(err.message);
                    if (err.status === "validateError") {
                        setErrors((prevState) => ({
                            ...prevState,
                            ...validateError(err.data),
                        }));
                    }
                });
        } else {
            create(form)
                .unwrap()
                .then((res) => {
                    toast.success(res.message);
                    resetHandler();
                    cb();
                })
                .catch((err) => {
                    toast.error(err.message);
                    if (err.status === "validateError") {
                        setErrors((prevState) => ({
                            ...prevState,
                            ...validateError(err.data),
                        }));
                    }
                });
        }
    };

    useEffect(() => {
        if (data && Object.keys(data).length > 0) {
            const supplier: SupplierType = { ...data };
            let obj = { ...form };
            Object.keys(supplier).forEach((key: string) => {
                if ((supplier as any)[key] !== null) {
                    (obj as any)[key] = (supplier as any)[key];
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
                        placeholder="Ex. John"
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
                    <TextField
                        label="Contact Person"
                        placeholder="Ex. John"
                        withAsterisk
                        value={form.contactPerson.name}
                        error={errors["contactPerson.name"]["text"]}
                        onChange={(e) =>
                            fieldChangeHandler(
                                "contactPerson",
                                "name",
                                e.target.value
                            )
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
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about supplier"
                        minRows={2}
                        value={form.description}
                        error={errors.description.text}
                        onChange={(e) =>
                            fieldChangeHandler(
                                "description",
                                null,
                                e.target.value
                            )
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
                            onClick={() => router.push("/suppliers")}
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

export default SupplierForm;

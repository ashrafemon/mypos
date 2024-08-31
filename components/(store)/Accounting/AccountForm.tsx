"use client";

import AppLoading from "@/components/UI/AppLoading";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import {
    AccountTypeOptions,
    ActivityStatusOptions,
} from "@/lib/constants/Options";
import { AccountType } from "@/lib/models/Account";
import { message, validateError } from "@/lib/utils/helper";
import {
    useCreateAccountMutation,
    useUpdateAccountMutation,
} from "@/states/actions/stores/accounts";
import { Button, Grid, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import Validator from "Validator";

const AccountForm: React.FC<{
    isFetching?: boolean;
    data?: AccountType | null;
    close: () => void;
}> = ({ isFetching = false, data, close = () => {} }) => {
    const [create, result] = useCreateAccountMutation();
    const [update, resultUpdate] = useUpdateAccountMutation();

    const [form, setForm] = useState({
        type: null,
        name: "",
        no: "",
        openingBalance: "",
        contactPerson: {
            name: "",
            phone: "",
        },
        description: "",
        order: 0,
        status: "active",
    });

    const [errors, setErrors] = useState({
        type: { text: "", show: false },
        name: { text: "", show: false },
        no: { text: "", show: false },
        openingBalance: { text: "", show: false },
        "contactPerson.name": { text: "", show: false },
        description: { text: "", show: false },
        order: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            type: { text: "", show: false },
            name: { text: "", show: false },
            no: { text: "", show: false },
            openingBalance: { text: "", show: false },
            "contactPerson.name": { text: "", show: false },
            description: { text: "", show: false },
            order: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            type: null,
            name: "",
            no: "",
            openingBalance: "",
            contactPerson: {
                name: "",
                phone: "",
            },
            description: "",
            order: 0,
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
        await formAction(() => close());
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            type: "required|in:cash,bank,mfs,card",
            name: "required",
            no: "required_if:type,!=,cash",
            openingBalance: "required|numeric",
            description: "sometimes",
            order: "sometimes|numeric",
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
            const payload = Object.prototype.hasOwnProperty.call(form, "id")
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
            const payload: AccountType = { ...data };
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
                    <SelectBox
                        label="Type"
                        placeholder="Ex. Cash"
                        data={AccountTypeOptions}
                        withAsterisk
                        value={form.type}
                        error={errors.type.text}
                        onChange={(value) =>
                            fieldChangeHandler("type", null, value)
                        }
                    />
                </Grid.Col>
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
                        label="Account No"
                        placeholder="Ex. 456522001"
                        withAsterisk
                        value={form.no}
                        error={errors.no.text}
                        onChange={(e) =>
                            fieldChangeHandler("no", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Opening Balance"
                        placeholder="Ex. 10000"
                        withAsterisk
                        value={form.openingBalance}
                        error={errors.openingBalance.text}
                        onChange={(e) =>
                            fieldChangeHandler(
                                "openingBalance",
                                null,
                                e.target.value
                            )
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
                        label="Description"
                        placeholder="Ex. Something about account"
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
                        <Button
                            onClick={close}
                            color="red"
                            loading={
                                result?.isLoading || resultUpdate?.isLoading
                            }
                        >
                            Close
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default AccountForm;

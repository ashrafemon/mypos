"use client";

import AppLoading from "@/components/UI/AppLoading";
import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import {
    ActivityStatusOptions,
    CustomerTypeOptions,
} from "@/lib/constants/Options";
import { CustomerType } from "@/lib/models/Customer";
import { message, selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchCustomerGroupsQuery } from "@/states/actions/stores/customerGroups";
import {
    useCreateCustomerMutation,
    useFetchCustomerQuery,
    useUpdateCustomerMutation,
} from "@/states/actions/stores/customers";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Validator from "Validator";

const CustomerForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: groups, isFetching: groupIsFetching } =
        useFetchCustomerGroupsQuery("get_all=1&status=active");
    const { data, isFetching } = useFetchCustomerQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateCustomerMutation();
    const [update, resultUpdate] = useUpdateCustomerMutation();

    const [form, setForm] = useState({
        groupId: null,
        name: "",
        phone: "",
        email: "",
        dob: null,
        type: "retail",
        address: "",
        discount: 0,
        attachment: null,
        status: "active",
    });

    const [errors, setErrors] = useState({
        groupId: { text: "", show: false },
        name: { text: "", show: false },
        phone: { text: "", show: false },
        email: { text: "", show: false },
        dob: { text: "", show: false },
        type: { text: "", show: false },
        address: { text: "", show: false },
        discount: { text: "", show: false },
        attachment: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            groupId: { text: "", show: false },
            name: { text: "", show: false },
            phone: { text: "", show: false },
            email: { text: "", show: false },
            dob: { text: "", show: false },
            type: { text: "", show: false },
            address: { text: "", show: false },
            discount: { text: "", show: false },
            attachment: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            groupId: null,
            name: "",
            phone: "",
            email: "",
            dob: null,
            type: "retail",
            address: "",
            discount: 0,
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
        await formAction(() => router.push("/customers"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            groupId: "required",
            name: "required",
            email: "sometimes|email",
            phone: "required",
            dob: "sometimes",
            address: "sometimes",
            type: "required|in:retail,wholesale",
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
            const payload: CustomerType = { ...data };
            let obj = { ...form };
            Object.keys(payload).forEach((key: string) => {
                if ((payload as any)[key] !== null) {
                    if (key === "dob") {
                        (obj as any)[key] = new Date((payload as any)[key]);
                    } else {
                        (obj as any)[key] = (payload as any)[key];
                    }
                }
            });
            setForm(obj);
        }
    }, [data]);

    if (isFetching || groupIsFetching) {
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
                    <DateField
                        label="Date of Birth"
                        placeholder="Ex. 25/01/1999"
                        value={form.dob}
                        error={errors.dob.text}
                        onChange={(value) =>
                            fieldChangeHandler("dob", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Type"
                        placeholder="Ex. Retail"
                        data={CustomerTypeOptions}
                        withAsterisk
                        value={form.type}
                        error={errors.type.text}
                        onChange={(value) =>
                            fieldChangeHandler("type", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Group"
                        placeholder="Ex. Uncategory"
                        data={selectGenerator(groups, "name", "id")}
                        withAsterisk
                        leftSection={
                            <ActionIcon onClick={() => console.log("Hello")}>
                                <Icon icon="fluent:add-12-filled" />
                            </ActionIcon>
                        }
                        value={form.groupId}
                        error={errors.groupId.text}
                        onChange={(value) =>
                            fieldChangeHandler("groupId", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Default Discount"
                        placeholder="Ex. 10"
                        rightSection="%"
                        value={form.discount}
                        error={errors.discount.text}
                        onChange={(e) =>
                            fieldChangeHandler("discount", null, e.target.value)
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
                            onClick={() => router.push("/customers")}
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

export default CustomerForm;

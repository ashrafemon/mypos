"use client";

import AppLoading from "@/components/UI/AppLoading";
import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { IncomeType } from "@/lib/models/Income";
import { message, selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchAccountsQuery } from "@/states/actions/stores/accounts";
import { useFetchIncomeCategoriesQuery } from "@/states/actions/stores/incomeCategories";
import {
    useCreateIncomeMutation,
    useFetchIncomeQuery,
    useUpdateIncomeMutation,
} from "@/states/actions/stores/incomes";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Validator from "Validator";

const IncomeForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: categories, isFetching: categoriesIsFetching } =
        useFetchIncomeCategoriesQuery("get_all=1&status=active");
    const { data: accounts, isFetching: accountsIsFetching } =
        useFetchAccountsQuery("get_all=1&status=active");
    const { data, isFetching } = useFetchIncomeQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateIncomeMutation();
    const [update, resultUpdate] = useUpdateIncomeMutation();

    const [form, setForm] = useState({
        categoryId: null,
        accountId: null,
        date: new Date(),
        title: "",
        description: "",
        contactPerson: {
            name: "",
            phone: "",
        },
        amount: 0,
        attachment: null,
        status: "pending",
    });

    const [errors, setErrors] = useState({
        categoryId: { text: "", show: false },
        accountId: { text: "", show: false },
        date: { text: "", show: false },
        title: { text: "", show: false },
        description: { text: "", show: false },
        "contactPerson.name": { text: "", show: false },
        amount: { text: "", show: false },
        attachment: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            categoryId: { text: "", show: false },
            accountId: { text: "", show: false },
            date: { text: "", show: false },
            title: { text: "", show: false },
            description: { text: "", show: false },
            "contactPerson.name": { text: "", show: false },
            amount: { text: "", show: false },
            attachment: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            categoryId: null,
            accountId: null,
            date: new Date(),
            title: "",
            description: "",
            contactPerson: {
                name: "",
                phone: "",
            },
            amount: 0,
            attachment: null,
            status: "pending",
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
        await formAction(() => router.push("/incomes"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            categoryId: "required",
            accountId: "required",
            date: "required|date",
            title: "required",
            description: "sometimes",
            amount: "required|numeric",
            attachment: "sometimes",
            status: "required|in:pending",
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
            const payload: IncomeType = { ...data };
            let obj = { ...form };
            Object.keys(payload).forEach((key: string) => {
                if ((payload as any)[key] !== null) {
                    if (key === "date") {
                        (obj as any)[key] = new Date((payload as any)[key]);
                    } else {
                        (obj as any)[key] = (payload as any)[key];
                    }
                }
            });
            setForm(obj);
        }
    }, [data]);

    if (isFetching || categoriesIsFetching || accountsIsFetching) {
        return <AppLoading />;
    }

    return (
        <form onSubmit={submitHandler}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <DateField
                        label="Date"
                        placeholder="Ex. 25/01/1999"
                        withAsterisk
                        value={form.date}
                        error={errors.date.text}
                        onChange={(value) =>
                            fieldChangeHandler("date", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Title"
                        placeholder="Ex. Loan from Bank"
                        withAsterisk
                        value={form.title}
                        error={errors.title.text}
                        onChange={(e) =>
                            fieldChangeHandler("title", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Category"
                        placeholder="Ex. Loan"
                        data={selectGenerator(categories, "name", "id")}
                        withAsterisk
                        leftSection={
                            <ActionIcon onClick={() => console.log("Hello")}>
                                <Icon icon="fluent:add-12-filled" />
                            </ActionIcon>
                        }
                        value={form.categoryId}
                        error={errors.categoryId.text}
                        onChange={(value) =>
                            fieldChangeHandler("categoryId", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Amount"
                        placeholder="Ex. 1000"
                        withAsterisk
                        value={form.amount}
                        error={errors.amount.text}
                        onChange={(e) =>
                            fieldChangeHandler("amount", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Responsible Person"
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
                        label="Account"
                        placeholder="Ex. Bank"
                        data={selectGenerator(accounts, "name", "id")}
                        withAsterisk
                        leftSection={
                            <ActionIcon onClick={() => console.log("Hello")}>
                                <Icon icon="fluent:add-12-filled" />
                            </ActionIcon>
                        }
                        value={form.accountId}
                        error={errors.accountId.text}
                        onChange={(value) =>
                            fieldChangeHandler("accountId", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about income"
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

export default IncomeForm;

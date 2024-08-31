"use client";

import AppLoading from "@/components/UI/AppLoading";
import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ExpenseType } from "@/lib/models/Expense";
import { message, selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchExpenseCategoriesQuery } from "@/states/actions/stores/expenseCategories";
import {
    useCreateExpenseMutation,
    useFetchExpenseQuery,
    useUpdateExpenseMutation,
} from "@/states/actions/stores/expenses";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Validator from "Validator";

const ExpenseForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: categories, isFetching: categoriesIsFetching } =
        useFetchExpenseCategoriesQuery("get_all=1&status=active");
    const { data, isFetching } = useFetchExpenseQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateExpenseMutation();
    const [update, resultUpdate] = useUpdateExpenseMutation();

    const [form, setForm] = useState({
        categoryId: null,
        date: new Date(),
        title: "",
        description: "",
        amount: 0,
        attachment: null,
        status: "pending",
    });

    const [errors, setErrors] = useState({
        categoryId: { text: "", show: false },
        date: { text: "", show: false },
        title: { text: "", show: false },
        description: { text: "", show: false },
        amount: { text: "", show: false },
        attachment: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            categoryId: { text: "", show: false },
            date: { text: "", show: false },
            title: { text: "", show: false },
            description: { text: "", show: false },
            amount: { text: "", show: false },
            attachment: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            categoryId: null,
            date: new Date(),
            title: "",
            description: "",
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
        await formAction(() => router.push("/expenses"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            categoryId: "required",
            date: "required|date",
            title: "required",
            description: "sometimes",
            amount: "required|numeric",
            photo: "sometimes",
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
            const payload: ExpenseType = { ...data };
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

    if (isFetching || categoriesIsFetching) {
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
                        placeholder="Ex. Electricity Bill"
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
                        placeholder="Ex. Maintenance"
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
                        placeholder="Ex. 100"
                        withAsterisk
                        value={form.amount}
                        error={errors.amount.text}
                        onChange={(e) =>
                            fieldChangeHandler("amount", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about expense"
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

export default ExpenseForm;

"use client";

import AppLoading from "@/components/UI/AppLoading";
import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { TransactionOptions } from "@/lib/constants/Options";
import { TransactionType } from "@/lib/models/Transaction";
import { message, selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchExpenseCategoriesQuery } from "@/states/actions/stores/expenseCategories";
import { useFetchIncomeCategoriesQuery } from "@/states/actions/stores/incomeCategories";
import {
    useCreateTransactionMutation,
    useFetchTransactionQuery,
    useUpdateTransactionMutation,
} from "@/states/actions/stores/transactions";
import { Button, Grid, Group } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Validator from "Validator";

const TransactionForm = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data, isFetching } = useFetchTransactionQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateTransactionMutation();
    const [update, resultUpdate] = useUpdateTransactionMutation();

    const [form, setForm] = useState({
        incomeCategoryId: null,
        expenseCategoryId: null,
        type: null,
        refNo: "",
        date: null,
        amount: 0,
        description: "",
        status: "pending",
    });

    const [errors, setErrors] = useState({
        incomeCategoryId: { text: "", show: false },
        expenseCategoryId: { text: "", show: false },
        type: { text: "", show: false },
        refNo: { text: "", show: false },
        date: { text: "", show: false },
        amount: { text: "", show: false },
        description: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            incomeCategoryId: { text: "", show: false },
            expenseCategoryId: { text: "", show: false },
            type: { text: "", show: false },
            refNo: { text: "", show: false },
            date: { text: "", show: false },
            amount: { text: "", show: false },
            description: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            incomeCategoryId: null,
            expenseCategoryId: null,
            type: null,
            refNo: "",
            date: null,
            amount: 0,
            description: "",
            status: "active",
        });
    };

    const { data: expenseCategories, isFetching: expenseCategoriesIsFetching } =
        useFetchExpenseCategoriesQuery("get_all=1&status=active", {
            skip: form.type !== "withdraw",
        });
    const { data: incomeCategories, isFetching: incomeCategoriesIsFetching } =
        useFetchIncomeCategoriesQuery("get_all=1&status=active", {
            skip: form.type !== "deposit",
        });

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
        await formAction(() => router.push("/accounting/transactions"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            type: "required|in:deposit,withdraw",
            incomeCategoryId: "required_if:type,=,deposit",
            expenseCategoryId: "required_if:type,=,withdraw",
            date: "required|date",
            refNo: "required",
            amount: "required|numeric",
            description: "sometimes",
            status: "required|in:pending,done",
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
            const payload: TransactionType = { ...data };
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

    if (
        isFetching ||
        incomeCategoriesIsFetching ||
        expenseCategoriesIsFetching
    ) {
        return <AppLoading />;
    }

    return (
        <form onSubmit={submitHandler}>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Type"
                        placeholder="Ex. Deposit"
                        data={TransactionOptions}
                        withAsterisk
                        value={form.type}
                        error={errors.type.text}
                        onChange={(value) =>
                            fieldChangeHandler("type", null, value)
                        }
                    />
                </Grid.Col>
                {form.type === "deposit" && (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <SelectBox
                            label="Income Category"
                            placeholder="Ex. Sale Product"
                            data={selectGenerator(
                                incomeCategories,
                                "name",
                                "id"
                            )}
                            withAsterisk
                            value={form.incomeCategoryId}
                            error={errors.incomeCategoryId.text}
                            onChange={(value) =>
                                fieldChangeHandler(
                                    "incomeCategoryId",
                                    null,
                                    value
                                )
                            }
                        />
                    </Grid.Col>
                )}
                {form.type === "withdraw" && (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <SelectBox
                            label="Expense Category"
                            placeholder="Ex. Sale Product"
                            data={selectGenerator(
                                expenseCategories,
                                "name",
                                "id"
                            )}
                            withAsterisk
                            value={form.expenseCategoryId}
                            error={errors.expenseCategoryId.text}
                            onChange={(value) =>
                                fieldChangeHandler(
                                    "expenseCategoryId",
                                    null,
                                    value
                                )
                            }
                        />
                    </Grid.Col>
                )}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Ref No."
                        placeholder="Ex. E4555454545"
                        withAsterisk
                        value={form.refNo}
                        error={errors.refNo.text}
                        onChange={(e) =>
                            fieldChangeHandler("refNo", null, e.target.value)
                        }
                    />
                </Grid.Col>
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
                        label="Amount"
                        placeholder="Ex. 10000"
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
                        placeholder="Ex. Something about transaction"
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
                            onClick={() =>
                                router.push("/accounting/transactions")
                            }
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

export default TransactionForm;

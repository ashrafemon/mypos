"use client";

import AppLoading from "@/components/UI/AppLoading";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import {
    ActivityStatusOptions,
    CurrencyPositionOptions,
} from "@/lib/constants/Options";
import { CurrencyType } from "@/lib/models/Currency";
import { message, validateError } from "@/lib/utils/helper";
import {
    useCreateCurrencyMutation,
    useUpdateCurrencyMutation,
} from "@/states/actions/stores/currencies";
import { Button, Grid, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import Validator from "Validator";

const CurrencyForm: React.FC<{
    isFetching?: boolean;
    data?: CurrencyType | null;
    close: () => void;
}> = ({ isFetching = false, data, close = () => {} }) => {
    const [create, result] = useCreateCurrencyMutation();
    const [update, resultUpdate] = useUpdateCurrencyMutation();

    const [form, setForm] = useState({
        name: "",
        symbol: "",
        shortName: "",
        decimalPlace: 2,
        position: "start",
        baseAmount: 0,
        description: "",
        order: 0,
        status: "active",
    });

    const [errors, setErrors] = useState({
        name: { text: "", show: false },
        symbol: { text: "", show: false },
        shortName: { text: "", show: false },
        decimalPlace: { text: "", show: false },
        position: { text: "", show: false },
        baseAmount: { text: "", show: false },
        description: { text: "", show: false },
        order: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            name: { text: "", show: false },
            symbol: { text: "", show: false },
            shortName: { text: "", show: false },
            decimalPlace: { text: "", show: false },
            position: { text: "", show: false },
            baseAmount: { text: "", show: false },
            description: { text: "", show: false },
            order: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            name: "",
            symbol: "",
            shortName: "",
            decimalPlace: 2,
            position: "start",
            baseAmount: 0,
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
            name: "required",
            symbol: "required",
            position: "required|in:start,end",
            decimalPlace: "required|numeric",
            description: "sometimes",
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
            const payload: CurrencyType = { ...data };
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
                        placeholder="Ex. Bangladeshi Taka"
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
                        label="Symbol"
                        placeholder="Ex. ৳"
                        withAsterisk
                        value={form.symbol}
                        error={errors.symbol.text}
                        onChange={(e) =>
                            fieldChangeHandler("symbol", null, e.target.value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Short Name"
                        placeholder="Ex. BDT"
                        withAsterisk
                        value={form.shortName}
                        error={errors.shortName.text}
                        onChange={(e) =>
                            fieldChangeHandler(
                                "shortName",
                                null,
                                e.target.value
                            )
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Decimal Place"
                        placeholder="Ex. 2"
                        withAsterisk
                        value={form.decimalPlace}
                        error={errors.decimalPlace.text}
                        onChange={(e) =>
                            fieldChangeHandler(
                                "decimalPlace",
                                null,
                                e.target.value
                            )
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Base Amount"
                        placeholder="Ex. 108"
                        withAsterisk
                        value={form.baseAmount}
                        error={errors.baseAmount.text}
                        onChange={(e) =>
                            fieldChangeHandler(
                                "baseAmount",
                                null,
                                e.target.value
                            )
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Position"
                        placeholder="Ex. Start"
                        data={CurrencyPositionOptions}
                        withAsterisk
                        value={form.position}
                        error={errors.position.text}
                        onChange={(value) =>
                            fieldChangeHandler("position", null, value)
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
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
                        placeholder="Ex. Something about currency"
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

export default CurrencyForm;

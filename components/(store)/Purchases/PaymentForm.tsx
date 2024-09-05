import AppLoading from "@/components/UI/AppLoading";
import SelectBox from "@/components/UI/SelectBox";
import TextField from "@/components/UI/TextField";
import { selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchPaymentMethodsQuery } from "@/states/actions/stores/paymentMethods";
import { Button, Stack } from "@mantine/core";
import React, { useState } from "react";
import Validator from "Validator";

const PaymentForm: React.FC<{
    add: (value: {
        methodId: string | any;
        methodName?: string;
        transactionNo?: string | any;
        amount: number;
    }) => void;
    close: () => void;
}> = ({ add = () => {}, close = () => {} }) => {
    const { data: methods, isFetching } = useFetchPaymentMethodsQuery(
        "get_all=1&status=active"
    );

    const [form, setForm] = useState({
        methodId: null,
        transactionNo: "",
        amount: 0,
    });

    const [errors, setErrors] = useState({
        methodId: { text: "", show: false },
        transactionNo: { text: "", show: false },
        amount: { text: "", show: false },
    });

    const fieldChangeHandler = (field: string, value: string | any) => {
        setForm((prevState) => ({ ...prevState, [field]: value }));
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const validator = await Validator.make(form, {
            methodId: "required",
            transactionNo: "sometimes",
            amount: "required|numeric",
        });

        if (validator.fails()) {
            setErrors((prevState) => ({
                ...prevState,
                ...validateError(validator.getErrors()),
            }));
            return;
        }

        const methodName = methods.find(
            (item: { id: string }) => item.id === form.methodId
        );
        add({ ...form, methodName: methodName.name });
        close();
    };

    if (isFetching) {
        return <AppLoading />;
    }

    return (
        <form onSubmit={submitHandler}>
            <Stack>
                <SelectBox
                    label="Payment Method"
                    placeholder="Payment Method"
                    data={selectGenerator(methods, "name", "id")}
                    value={form.methodId}
                    error={errors.methodId.text}
                    onChange={(value) => fieldChangeHandler("methodId", value)}
                />
                <TextField
                    label="Amount"
                    value={form.amount}
                    error={errors.amount.text}
                    onChange={(e) =>
                        fieldChangeHandler("amount", e.target.value)
                    }
                />
                <Button type="submit">Add</Button>
            </Stack>
        </form>
    );
};

export default PaymentForm;

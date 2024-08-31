"use client";

import AppLoading from "@/components/UI/AppLoading";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import {
    ActivityStatusOptions,
    BarcodeSymbologyOptions,
    DurationPeriodOptions,
    ProductTypeOptions,
    TaxMethodOptions,
} from "@/lib/constants/Options";
import { ProductType } from "@/lib/models/Product";
import { message, selectGenerator, validateError } from "@/lib/utils/helper";
import { useFetchBrandsQuery } from "@/states/actions/stores/brands";
import { useFetchProductCategoriesQuery } from "@/states/actions/stores/productCategories";
import {
    useCreateProductMutation,
    useFetchProductQuery,
    useUpdateProductMutation,
} from "@/states/actions/stores/products";
import { useFetchSuppliersQuery } from "@/states/actions/stores/suppliers";
import { useFetchTaxRatesQuery } from "@/states/actions/stores/taxRates";
import { useFetchUnitsQuery } from "@/states/actions/stores/units";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Button,
    Checkbox,
    Fieldset,
    Grid,
    Group,
    Stack,
    Title,
} from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Validator from "Validator";

const ProductForm: React.FC = () => {
    const { id } = useParams();
    const router = useRouter();

    const { data: suppliers } = useFetchSuppliersQuery(
        `get_all=1&status=active`
    );
    const { data: categories } = useFetchProductCategoriesQuery(
        `get_all=1&status=active`
    );
    const { data: brands } = useFetchBrandsQuery(`get_all=1&status=active`);
    const { data: units } = useFetchUnitsQuery(`get_all=1&status=active`);
    const { data: taxRates } = useFetchTaxRatesQuery(`get_all=1&status=active`);

    const { data, isFetching } = useFetchProductQuery(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    });

    const [create, result] = useCreateProductMutation();
    const [update, resultUpdate] = useUpdateProductMutation();

    const [form, setForm] = useState({
        supplierId: null,
        categoryId: null,
        brandId: null,
        unitId: null,
        taxRateId: null,
        boxId: null,
        type: null,
        name: "",
        code: "",
        barcodeSymbology: null,
        price: 0,
        discount: 0,
        alertQuantity: 0,
        loyaltyPoint: 0,
        taxMethod: null,
        photo: null,
        description: "",
        warranty: {
            status: false,
            type: null,
            value: 0,
        },
        order: 0,
        status: "active",
    });

    const [errors, setErrors] = useState({
        supplierId: { text: "", show: false },
        categoryId: { text: "", show: false },
        brandId: { text: "", show: false },
        unitId: { text: "", show: false },
        taxRateId: { text: "", show: false },
        boxId: { text: "", show: false },
        type: { text: "", show: false },
        name: { text: "", show: false },
        code: { text: "", show: false },
        barcodeSymbology: { text: "", show: false },
        price: { text: "", show: false },
        discount: { text: "", show: false },
        alertQuantity: { text: "", show: false },
        loyaltyPoint: { text: "", show: false },
        taxMethod: { text: "", show: false },
        photo: { text: "", show: false },
        description: { text: "", show: false },
        order: { text: "", show: false },
        status: { text: "", show: false },
    });

    const resetHandler = () => {
        setErrors({
            supplierId: { text: "", show: false },
            categoryId: { text: "", show: false },
            brandId: { text: "", show: false },
            unitId: { text: "", show: false },
            taxRateId: { text: "", show: false },
            boxId: { text: "", show: false },
            type: { text: "", show: false },
            name: { text: "", show: false },
            code: { text: "", show: false },
            barcodeSymbology: { text: "", show: false },
            price: { text: "", show: false },
            discount: { text: "", show: false },
            alertQuantity: { text: "", show: false },
            loyaltyPoint: { text: "", show: false },
            taxMethod: { text: "", show: false },
            photo: { text: "", show: false },
            description: { text: "", show: false },
            order: { text: "", show: false },
            status: { text: "", show: false },
        });
        setForm({
            supplierId: null,
            categoryId: null,
            brandId: null,
            unitId: null,
            taxRateId: null,
            boxId: null,
            type: null,
            name: "",
            code: "",
            barcodeSymbology: null,
            price: 0,
            discount: 0,
            alertQuantity: 0,
            loyaltyPoint: 0,
            taxMethod: null,
            photo: null,
            description: "",
            warranty: {
                status: false,
                type: null,
                value: 0,
            },
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
        await formAction(() => router.push("/products"));
    };

    const formAction = async (cb = () => {}) => {
        const validator = await Validator.make(form, {
            supplierId: "required",
            categoryId: "required",
            brandId: "required",
            unitId: "required",
            taxRateId: "required_if:taxMethod,=,exclusive",
            type: "required",
            name: "required",
            code: "required",
            barcodeSymbology: "required|in:C128,C39",
            price: "required|numeric",
            discount: "sometimes|numeric",
            alertQuantity: "sometimes|numeric",
            loyaltyPoint: "sometimes|numeric",
            taxMethod: "required|in:inclusive,exclusive",
            photo: "sometimes",
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
            const payload: ProductType = { ...data };
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
            <Stack>
                <Fieldset
                    legend={
                        <Title component="h6" order={6}>
                            General Information
                        </Title>
                    }
                >
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Type"
                                placeholder="Ex. General"
                                data={ProductTypeOptions}
                                withAsterisk
                                value={form.type}
                                error={errors.type.text}
                                onChange={(value) =>
                                    fieldChangeHandler("type", null, value)
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <TextField
                                label="Name"
                                placeholder="Ex. Asus Laptop"
                                withAsterisk
                                value={form.name}
                                error={errors.name.text}
                                onChange={(e) =>
                                    fieldChangeHandler(
                                        "name",
                                        null,
                                        e.target.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Code"
                                placeholder="Ex. 55522110"
                                withAsterisk
                                value={form.code}
                                error={errors.code.text}
                                onChange={(e) =>
                                    fieldChangeHandler(
                                        "code",
                                        null,
                                        e.target.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <SelectBox
                                label="Barcode Symbology"
                                placeholder="Ex. Code 128"
                                data={BarcodeSymbologyOptions}
                                withAsterisk
                                value={form.barcodeSymbology}
                                error={errors.barcodeSymbology.text}
                                onChange={(value) =>
                                    fieldChangeHandler(
                                        "barcodeSymbology",
                                        null,
                                        value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Price"
                                placeholder="Ex. 10000"
                                withAsterisk
                                value={form.price}
                                error={errors.price.text}
                                onChange={(e) =>
                                    fieldChangeHandler(
                                        "price",
                                        null,
                                        e.target.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Discount"
                                placeholder="Ex. 10"
                                withAsterisk
                                value={form.discount}
                                error={errors.discount.text}
                                onChange={(e) =>
                                    fieldChangeHandler(
                                        "discount",
                                        null,
                                        e.target.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Loyalty Point"
                                placeholder="Ex. 1000"
                                withAsterisk
                                value={form.loyaltyPoint}
                                error={errors.loyaltyPoint.text}
                                onChange={(e) =>
                                    fieldChangeHandler(
                                        "loyaltyPoint",
                                        null,
                                        e.target.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Alert Quantity"
                                placeholder="Ex. 10"
                                withAsterisk
                                value={form.alertQuantity}
                                error={errors.alertQuantity.text}
                                onChange={(e) =>
                                    fieldChangeHandler(
                                        "alertQuantity",
                                        null,
                                        e.target.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <TextField
                                label="Warranty"
                                placeholder="Ex. 1"
                                withAsterisk
                                leftSection={
                                    <Checkbox
                                        checked={form.warranty.status}
                                        onChange={(e) =>
                                            fieldChangeHandler(
                                                "warranty",
                                                "status",
                                                e.target.checked
                                            )
                                        }
                                    />
                                }
                                rightSection={
                                    <SelectBox
                                        placeholder="Ex. Year"
                                        data={DurationPeriodOptions}
                                        value={form.warranty.type}
                                        disabled={!form.warranty.status}
                                        onChange={(value) =>
                                            fieldChangeHandler(
                                                "warranty",
                                                "type",
                                                value
                                            )
                                        }
                                    />
                                }
                                classNames={{
                                    section: "data-[position=right]:w-[100px]",
                                }}
                                disabled={!form.warranty.status}
                                value={form.warranty.value}
                                // error={errors.name.text}
                                onChange={(e) =>
                                    fieldChangeHandler(
                                        "warranty",
                                        "value",
                                        e.target.value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
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
                                placeholder="Ex. Something about product"
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
                    </Grid>
                </Fieldset>

                <Fieldset
                    legend={
                        <Title component="h6" order={6}>
                            Additional Information
                        </Title>
                    }
                >
                    <Grid>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Supplier"
                                placeholder="Ex. Asus"
                                data={selectGenerator(suppliers, "name", "id")}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                                value={form.supplierId}
                                error={errors.supplierId.text}
                                onChange={(value) =>
                                    fieldChangeHandler(
                                        "supplierId",
                                        null,
                                        value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Category"
                                placeholder="Ex. Computer"
                                data={selectGenerator(categories, "name", "id")}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                                value={form.categoryId}
                                error={errors.categoryId.text}
                                onChange={(value) =>
                                    fieldChangeHandler(
                                        "categoryId",
                                        null,
                                        value
                                    )
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Brand"
                                placeholder="Ex. Asus"
                                data={selectGenerator(brands, "name", "id")}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                                value={form.brandId}
                                error={errors.brandId.text}
                                onChange={(value) =>
                                    fieldChangeHandler("brandId", null, value)
                                }
                            />
                        </Grid.Col>
                        {/* <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Box"
                                placeholder="Ex. Box"
                                data={ActivityStatusOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                                value={form.name}
                                error={errors.name.text}
                                onChange={(e) => fieldChangeHandler('name', null, e.target.value)}
                            />
                        </Grid.Col> */}
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Unit"
                                placeholder="Ex. Piece"
                                data={selectGenerator(units, "name", "id")}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                                value={form.unitId}
                                error={errors.unitId.text}
                                onChange={(value) =>
                                    fieldChangeHandler("unitId", null, value)
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Tax Method"
                                placeholder="Ex. Inclusive"
                                data={TaxMethodOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                                value={form.taxMethod}
                                error={errors.taxMethod.text}
                                onChange={(value) =>
                                    fieldChangeHandler("taxMethod", null, value)
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Tax Rate"
                                placeholder="Ex. Tax 10%"
                                data={selectGenerator(taxRates, "name", "id")}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                                value={form.taxRateId}
                                error={errors.taxRateId.text}
                                onChange={(value) =>
                                    fieldChangeHandler("taxRateId", null, value)
                                }
                            />
                        </Grid.Col>
                    </Grid>
                </Fieldset>

                <Group gap="xs">
                    <Button
                        type="submit"
                        loading={result?.isLoading || resultUpdate?.isLoading}
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
                        onClick={() => router.push("/products")}
                        loading={result?.isLoading || resultUpdate?.isLoading}
                    >
                        Back
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default ProductForm;

"use client";

import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import {
    ActivityStatusOptions,
    BarcodeSymbologyOptions,
    DurationPeriodOptions,
    ProductTypeOptions,
} from "@/lib/constants/Options";
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
import { useRouter } from "next/navigation";

const ProductForm = () => {
    const router = useRouter();

    return (
        <form>
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
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <TextField
                                label="Name"
                                placeholder="Ex. Asus Laptop"
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Code"
                                placeholder="Ex. 55522110"
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <SelectBox
                                label="Barcode Symbology"
                                placeholder="Ex. Code 128"
                                data={BarcodeSymbologyOptions}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Price"
                                placeholder="Ex. 10000"
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Discount"
                                placeholder="Ex. 10"
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Loyalty Point"
                                placeholder="Ex. 1000"
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 2 }}>
                            <TextField
                                label="Alert Quantity"
                                placeholder="Ex. 10"
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <TextField
                                label="Warranty"
                                placeholder="Ex. 1"
                                withAsterisk
                                leftSection={<Checkbox />}
                                rightSection={
                                    <SelectBox
                                        placeholder="Ex. Year"
                                        data={DurationPeriodOptions}
                                    />
                                }
                                classNames={{
                                    section: "data-[position=right]:w-[100px]",
                                }}
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Status"
                                placeholder="Ex. Active"
                                data={ActivityStatusOptions}
                                withAsterisk
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 12 }}>
                            <TextEditor
                                label="Description"
                                placeholder="Ex. Something about product"
                                minRows={2}
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
                                data={ActivityStatusOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Category"
                                placeholder="Ex. Computer"
                                data={ActivityStatusOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Brand"
                                placeholder="Ex. Asus"
                                data={ActivityStatusOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
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
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Unit"
                                placeholder="Ex. Piece"
                                data={ActivityStatusOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Tax Method"
                                placeholder="Ex. Inclusive"
                                data={ActivityStatusOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                            />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 3 }}>
                            <SelectBox
                                label="Tax Rate"
                                placeholder="Ex. Tax 10%"
                                data={ActivityStatusOptions}
                                leftSection={
                                    <ActionIcon
                                        onClick={() => console.log("Hello")}
                                    >
                                        <Icon icon="fluent:add-12-filled" />
                                    </ActionIcon>
                                }
                            />
                        </Grid.Col>
                    </Grid>
                </Fieldset>

                <Group gap="xs">
                    <Button>Save</Button>
                    <Button>Save & Add More</Button>
                    <Button
                        color="red"
                        onClick={() => router.push("/products")}
                    >
                        Back
                    </Button>
                </Group>
            </Stack>
        </form>
    );
};

export default ProductForm;

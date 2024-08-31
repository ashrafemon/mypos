"use client";

import SelectBox from "@/components/UI/SelectBox";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

const VariantForm = () => {
    const router = useRouter();

    return (
        <form>
            <Grid>
                <Grid.Col span={12}>
                    <TextField
                        label="Name"
                        placeholder="Ex. Liter"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextField
                        label="Property"
                        placeholder="Ex. 2, 5"
                        withAsterisk
                        rightSection={
                            <ActionIcon onClick={() => console.log("Hello")}>
                                <Icon icon="fluent:add-12-filled" />
                            </ActionIcon>
                        }
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <SelectBox
                        label="Status"
                        placeholder="Ex. Active"
                        data={ActivityStatusOptions}
                        withAsterisk
                    />
                </Grid.Col>

                <Grid.Col span={12}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/products/variants")}
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default VariantForm;

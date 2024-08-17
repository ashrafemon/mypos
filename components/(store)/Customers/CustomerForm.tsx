"use client";

import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import {
    ActivityStatusOptions,
    CustomerTypeOptions,
} from "@/lib/constants/Options";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

const CustomerForm = () => {
    const router = useRouter();

    return (
        <form>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField label="Name" withAsterisk />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField label="Phone" withAsterisk />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField label="Email" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <DateField label="Date of Birth" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Type"
                        data={CustomerTypeOptions}
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Group"
                        data={[]}
                        withAsterisk
                        leftSection={
                            <ActionIcon onClick={() => console.log("Hello")}>
                                <Icon icon="fluent:add-12-filled" />
                            </ActionIcon>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField label="Default Discount" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Status"
                        data={ActivityStatusOptions}
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor label="Address" minRows={2} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 12 }}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/customers")}
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

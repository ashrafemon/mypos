"use client";

import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

const ExpenseForm = () => {
    const router = useRouter();

    return (
        <form>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <DateField label="Date" withAsterisk />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField label="Title" withAsterisk />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Category"
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
                    <TextField label="Amount" />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor label="Description" minRows={2} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/expenses")}
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

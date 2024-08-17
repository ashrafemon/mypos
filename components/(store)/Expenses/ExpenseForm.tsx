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
                    <DateField
                        label="Date"
                        placeholder="Ex. 25/01/1999"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Title"
                        placeholder="Ex. Electricity Bill"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Category"
                        placeholder="Ex. Maintenance"
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
                    <TextField
                        label="Amount"
                        placeholder="Ex. 100"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about expense"
                        minRows={2}
                    />
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

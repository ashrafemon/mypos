"use client";

import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Grid, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

const IncomeForm = () => {
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
                        placeholder="Ex. Loan from Bank"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Category"
                        placeholder="Ex. Loan"
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
                        placeholder="Ex. 1000"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Responsible Person"
                        placeholder="Ex. John"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <SelectBox
                        label="Account"
                        placeholder="Ex. Bank"
                        data={[]}
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about income"
                        minRows={2}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/incomes")}
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default IncomeForm;

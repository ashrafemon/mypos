"use client";

import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { Button, Grid, Group } from "@mantine/core";

const CustomerGroupForm = () => {
    return (
        <form>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Name"
                        placeholder="Ex. John"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
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
                        placeholder="Ex. Something about group"
                        minRows={2}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default CustomerGroupForm;

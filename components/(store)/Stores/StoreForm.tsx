"use client";

import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { Button, Grid, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

const StoreForm = () => {
    const router = useRouter();

    return (
        <form>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField label="Code" placeholder="000000" withAsterisk />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Name"
                        placeholder="Ex. My Store"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField
                        label="Phone"
                        placeholder="Ex. 010000000"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextField label="Email" placeholder="Ex. john@doe.com" />
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
                        label="Address"
                        placeholder="Ex. Landmark"
                        minRows={2}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 12 }}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/stores")}
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default StoreForm;

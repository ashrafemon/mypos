"use client";

import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { Button, Grid, Group } from "@mantine/core";
import { useRouter } from "next/navigation";

const SupplierForm = () => {
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
                    <TextField label="Contact Person" withAsterisk />
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
                    <TextEditor label="Description" minRows={2} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 12 }}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/suppliers")}
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default SupplierForm;

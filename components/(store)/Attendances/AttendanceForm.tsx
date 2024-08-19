"use client";

import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import TextEditor from "@/components/UI/TextEditor";
import TimeField from "@/components/UI/TimeField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { Button, Grid, Group } from "@mantine/core";

const AttendanceForm = () => {
    return (
        <form>
            <Grid>
                <Grid.Col span={12}>
                    <DateField
                        label="Date"
                        placeholder="Ex. 25/01/2024"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <SelectBox
                        label="Employee"
                        placeholder="Ex. John Doe"
                        data={ActivityStatusOptions}
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TimeField
                        label="In Time"
                        placeholder="Ex. 08:02:12"
                        withSeconds
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TimeField
                        label="Out Time"
                        placeholder="Ex. 08:02:12"
                        withSeconds
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 12 }}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about attendance"
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

export default AttendanceForm;

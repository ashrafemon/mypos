import DamageForm from "@/components/(store)/Damages/DamageForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Damage
                </Title>
            </CardSection>

            <DamageForm />
        </Card>
    );
};

export default page;

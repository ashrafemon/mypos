import VariantForm from "@/components/(store)/Products/VariantForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={800} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Variant
                </Title>
            </CardSection>

            <VariantForm />
        </Card>
    );
};

export default page;

import StoreForm from "@/components/(store)/Stores/StoreForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={800} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Store
                </Title>
            </CardSection>

            <StoreForm />
        </Card>
    );
};

export default page;

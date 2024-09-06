import PurchaseForm from "@/components/(store)/Purchases/PurchaseForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Edit Purchase
                </Title>
            </CardSection>

            <PurchaseForm />
        </Card>
    );
};

export default page;

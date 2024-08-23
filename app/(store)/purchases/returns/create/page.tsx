import PurchaseReturnForm from "@/components/(store)/Purchases/PurchaseReturnForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Purchase Return
                </Title>
            </CardSection>

            <PurchaseReturnForm />
        </Card>
    );
};

export default page;

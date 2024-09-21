import SaleReturnForm from "@/components/(store)/Sales/SaleReturnForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Sale Return
                </Title>
            </CardSection>

            <SaleReturnForm />
        </Card>
    );
};

export default page;

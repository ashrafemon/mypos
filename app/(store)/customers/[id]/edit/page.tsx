import CustomerForm from "@/components/(store)/Customers/CustomerForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={800} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Edit Customer
                </Title>
            </CardSection>

            <CustomerForm />
        </Card>
    );
};

export default page;

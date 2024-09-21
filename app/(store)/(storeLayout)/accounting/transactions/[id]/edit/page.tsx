import TransactionForm from "@/components/(store)/Accounting/TransactionForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={800} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Edit Transaction
                </Title>
            </CardSection>

            <TransactionForm />
        </Card>
    );
};

export default page;

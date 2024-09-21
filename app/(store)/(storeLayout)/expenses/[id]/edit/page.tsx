import ExpenseForm from "@/components/(store)/Expenses/ExpenseForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={800} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Edit Expense
                </Title>
            </CardSection>

            <ExpenseForm />
        </Card>
    );
};

export default page;

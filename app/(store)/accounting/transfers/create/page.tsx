import TransferForm from "@/components/(store)/Accounting/TransferForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={800} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Transfer
                </Title>
            </CardSection>

            <TransferForm />
        </Card>
    );
};

export default page;

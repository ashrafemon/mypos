import QuotationForm from "@/components/(store)/Quotations/QuotationForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Edit Quotation
                </Title>
            </CardSection>

            <QuotationForm />
        </Card>
    );
};

export default page;

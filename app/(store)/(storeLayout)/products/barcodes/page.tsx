import BarcodeForm from "@/components/(store)/Products/BarcodeForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={900} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Print Barcode
                </Title>
            </CardSection>

            <BarcodeForm />
        </Card>
    );
};

export default page;

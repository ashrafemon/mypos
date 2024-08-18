import ProductForm from "@/components/(store)/Products/ProductForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Product
                </Title>
            </CardSection>

            <ProductForm />
        </Card>
    );
};

export default page;

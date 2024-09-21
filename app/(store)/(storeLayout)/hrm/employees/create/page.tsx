import EmployeeForm from "@/components/(store)/Employees/EmployeeForm";
import { Card, CardSection, Title } from "@mantine/core";

const page = () => {
    return (
        <Card shadow="lg" withBorder radius="md" maw={800} mx="auto">
            <CardSection p="md">
                <Title component="h5" order={3}>
                    Add Employee
                </Title>
            </CardSection>

            <EmployeeForm />
        </Card>
    );
};

export default page;

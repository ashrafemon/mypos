"use client";

import SelectBox from "@/components/UI/SelectBox";
import TextField from "@/components/UI/TextField";
import Images from "@/lib/constants/Images";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Card,
    CardSection,
    Flex,
    Grid,
    Group,
    ScrollArea,
    Table,
    TableTbody,
    TableTd,
    TableTh,
    TableThead,
    TableTr,
    Text,
} from "@mantine/core";
import Image from "next/image";
import PosLayout from "../Layout/PosLayout";

const SaleForm = () => {
    return (
        <PosLayout>
            <div className="grid grid-cols-12 gap-4 px-2 items-stretch">
                <div className="col-span-full lg:col-span-7 2xl:col-span-8">
                    <Card radius="md" shadow="sm" h="100%">
                        <Box mb="md">
                            <TextField
                                placeholder="Search Product"
                                size="lg"
                                leftSection={
                                    <Icon
                                        icon="material-symbols:barcode"
                                        width={36}
                                    />
                                }
                                rightSection={
                                    <ActionIcon size="lg" color="red">
                                        <Icon
                                            icon="hugeicons:hold-01"
                                            width={28}
                                        />
                                    </ActionIcon>
                                }
                            />
                        </Box>

                        <ScrollArea
                            h={{ base: 400, lg: 730 }}
                            offsetScrollbars
                            pb="sm"
                        >
                            <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
                                {Array(50)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Card
                                            key={i}
                                            withBorder
                                            radius="md"
                                            className="cursor-pointer"
                                        >
                                            <CardSection>
                                                <Group
                                                    justify="space-between"
                                                    className="absolute w-full top-0 left-0"
                                                >
                                                    <Badge
                                                        size="sm"
                                                        tt="capitalize"
                                                        radius="sm"
                                                    >
                                                        $100
                                                    </Badge>
                                                    <Badge
                                                        size="sm"
                                                        tt="capitalize"
                                                        radius="sm"
                                                        color="green"
                                                    >
                                                        500 Piece
                                                    </Badge>
                                                </Group>

                                                <Image
                                                    src={Images.Product}
                                                    alt="Product Image"
                                                    className="w-full h-32 p-2"
                                                />
                                            </CardSection>
                                            <Text
                                                size="md"
                                                fw={600}
                                                lineClamp={1}
                                            >
                                                Laptop
                                            </Text>
                                            <Text size="xs">123456</Text>
                                        </Card>
                                    ))}
                            </div>
                        </ScrollArea>
                    </Card>
                </div>
                <div className="col-span-full lg:col-span-5 2xl:col-span-4">
                    <Card radius="md" shadow="sm" h="100%">
                        <Grid mb="lg">
                            <Grid.Col span={{ base: 12, lg: 6 }}>
                                <Text size="md" fw={600}>
                                    Customer:
                                </Text>
                                <Group>
                                    <Text size="xl" fw={600}>
                                        Walking Customer
                                    </Text>
                                    <ActionIcon size="sm" variant="light">
                                        <Icon icon="lucide:edit" width={14} />
                                    </ActionIcon>
                                </Group>

                                {/* <TextField placeholder="Search Customer" /> */}
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, lg: 6 }}>
                                <Text size="md" fw={600}>
                                    Counter No:
                                </Text>
                                <Group>
                                    <Text size="xl" fw={600}>
                                        01
                                    </Text>
                                    <ActionIcon size="sm" variant="light">
                                        <Icon icon="lucide:edit" width={14} />
                                    </ActionIcon>
                                </Group>

                                {/* <TextField placeholder="Search Customer" /> */}
                            </Grid.Col>
                        </Grid>

                        <Table.ScrollContainer
                            minWidth="100%"
                            h={{ base: "100%", lg: 380 }}
                        >
                            <Table
                                striped
                                highlightOnHover
                                withTableBorder
                                withColumnBorders
                            >
                                <TableThead>
                                    <TableTr>
                                        <TableTh className="min-w-36">
                                            Product
                                        </TableTh>
                                        <TableTh className="min-w-32 text-center">
                                            Quantity
                                        </TableTh>
                                        <TableTh className="min-w-28 text-center">
                                            Price
                                        </TableTh>
                                        <TableTh className="min-w-28 text-center">
                                            Subtotal
                                        </TableTh>
                                        <TableTh className="min-w-4 text-center">
                                            Action
                                        </TableTh>
                                    </TableTr>
                                </TableThead>
                                <TableTbody>
                                    {Array(5)
                                        .fill(0)
                                        .map((_, i) => (
                                            <TableTr key={i}>
                                                <TableTd>
                                                    <Text
                                                        size="sm"
                                                        fw={600}
                                                        lineClamp={1}
                                                    >
                                                        Laptop
                                                    </Text>
                                                    <Badge
                                                        size="xs"
                                                        radius="xs"
                                                    >
                                                        123456
                                                    </Badge>
                                                </TableTd>
                                                <TableTd>
                                                    <TextField
                                                        leftSection={
                                                            <ActionIcon
                                                                size="sm"
                                                                variant="light"
                                                            >
                                                                <Icon
                                                                    icon="ri:subtract-line"
                                                                    width={16}
                                                                />
                                                            </ActionIcon>
                                                        }
                                                        rightSection={
                                                            <ActionIcon
                                                                size="sm"
                                                                variant="light"
                                                            >
                                                                <Icon
                                                                    icon="ri:add-fill"
                                                                    width={16}
                                                                />
                                                            </ActionIcon>
                                                        }
                                                        value={100}
                                                        classNames={{
                                                            input: "text-center",
                                                        }}
                                                    />
                                                </TableTd>
                                                <TableTd className="text-center">
                                                    <Text size="sm">1000</Text>
                                                    <Text size="xs">
                                                        Inclusive (5%)
                                                    </Text>
                                                </TableTd>
                                                <TableTd className="text-center">
                                                    1000
                                                </TableTd>
                                                <TableTd>
                                                    <Flex justify="center">
                                                        <ActionIcon
                                                            variant="light"
                                                            color="red"
                                                            size="sm"
                                                        >
                                                            <Icon
                                                                icon="icon-park-outline:delete"
                                                                width={16}
                                                            />
                                                        </ActionIcon>
                                                    </Flex>
                                                </TableTd>
                                            </TableTr>
                                        ))}
                                </TableTbody>
                            </Table>
                        </Table.ScrollContainer>

                        <Grid gutter="xs" pt="md">
                            <Grid.Col span={6}>
                                {/* <TextField label="Product Discount" /> */}
                                <Text size="sm" fw={500}>
                                    Product Discount
                                </Text>
                                <Group gap="xs" align="center">
                                    <Text size="xl" fw={600}>
                                        $10
                                    </Text>
                                    <ActionIcon size="sm" variant="light">
                                        <Icon icon="lucide:edit" width={14} />
                                    </ActionIcon>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                {/* <TextField label="Extra Discount" /> */}
                                <Text size="sm" fw={500}>
                                    Extra Discount
                                </Text>
                                <Group gap="xs" align="center">
                                    <Text size="xl" fw={600}>
                                        $10
                                    </Text>
                                    <ActionIcon size="sm" variant="light">
                                        <Icon icon="lucide:edit" width={14} />
                                    </ActionIcon>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                {/* <TextField label="Order Tax (0%)" /> */}
                                <Text size="sm" fw={500}>
                                    Order Tax (0%)
                                </Text>
                                <Group gap="xs" align="center">
                                    <Text size="xl" fw={600}>
                                        $10
                                    </Text>
                                    <ActionIcon size="sm" variant="light">
                                        <Icon icon="lucide:edit" width={14} />
                                    </ActionIcon>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                {/* <TextField label="Other Charge" /> */}
                                <Text size="sm" fw={500}>
                                    Other Charge
                                </Text>
                                <Group gap="xs" align="center">
                                    <Text size="xl" fw={600}>
                                        $10
                                    </Text>
                                    <ActionIcon size="sm" variant="light">
                                        <Icon icon="lucide:edit" width={14} />
                                    </ActionIcon>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={6}>
                                {/* <TextField label="Shipping Charge" /> */}
                                <Text size="sm" fw={500}>
                                    Shipping Charge
                                </Text>
                                <Group gap="xs" align="center">
                                    <Text size="xl" fw={600}>
                                        $10
                                    </Text>
                                    <ActionIcon size="sm" variant="light">
                                        <Icon icon="lucide:edit" width={14} />
                                    </ActionIcon>
                                </Group>
                            </Grid.Col>
                            <Grid.Col span={12}>
                                <Button size="xl" variant="light" fullWidth>
                                    <Text className="text-2xl" fw={600}>
                                        Net Amount: $100
                                    </Text>
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, lg: 6 }}>
                                <Button
                                    size="xl"
                                    color="red"
                                    fullWidth
                                    leftSection={
                                        <Icon
                                            icon="hugeicons:hold-01"
                                            width={28}
                                        />
                                    }
                                >
                                    Hold
                                </Button>
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, lg: 6 }}>
                                <Button
                                    size="xl"
                                    color="green"
                                    fullWidth
                                    leftSection={
                                        <Icon
                                            icon="ic:twotone-payments"
                                            width={28}
                                        />
                                    }
                                >
                                    Pay Now
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Card>
                </div>
            </div>
        </PosLayout>
    );
};

export default SaleForm;

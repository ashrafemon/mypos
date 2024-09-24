import NumberField from "@/components/UI/NumberField";
import SelectBox from "@/components/UI/SelectBox";
import TextField from "@/components/UI/TextField";
import { CounterType } from "@/lib/models/Counter";
import { CustomerType } from "@/lib/models/Customer";
import { ProductType } from "@/lib/models/Product";
import { TaxRateType } from "@/lib/models/TaxRate";
import { selectGenerator } from "@/lib/utils/helper";
import { useFetchCountersQuery } from "@/states/actions/stores/counters";
import { useFetchCustomersQuery } from "@/states/actions/stores/customers";
import { useFetchTaxRatesQuery } from "@/states/actions/stores/taxRates";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Badge,
    Button,
    Flex,
    Grid,
    Group,
    Table,
    Text,
} from "@mantine/core";
import {
    forwardRef,
    Ref,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
} from "react";

const CartSection = (
    {
        selectedProducts,
        addProduct,
        deleteProduct,
    }: {
        selectedProducts: {
            productId?: string;
            name: string;
            code?: string;
            price?: number;
            discount?: number;
            taxMethod?: string;
            taxRate?: any;
            quantity: number;
            total: number;
        }[];
        addProduct: (
            product: ProductType,
            quantity?: number,
            quantityType?: string
        ) => void;
        deleteProduct: (index: number) => void;
    },
    ref: Ref<unknown> | undefined
) => {
    const { data: customers, isFetching: customersIsFetching } =
        useFetchCustomersQuery(`get_all=1&status=active`);
    const { data: counters, isFetching: countersIsFetching } =
        useFetchCountersQuery(`get_all=1&status=active`);
    const { data: taxes, isFetching: taxesIsFetching } = useFetchTaxRatesQuery(
        `get_all=1&status=active`
    );

    const walkingCustomer = useCallback(() => {
        const wkCustomer = customers?.find(
            (item: CustomerType) => item.name === "Walking Customer"
        );
        if (wkCustomer)
            setCustomer((prevState) => ({
                ...prevState,
                value: wkCustomer,
                selectedId: wkCustomer?.id,
            }));
    }, [customers]);

    const [customer, setCustomer] = useState<{
        editStatus: boolean;
        value: CustomerType | null;
        selectedId: string | null;
    }>({
        editStatus: false,
        value: null,
        selectedId: null,
    });

    const [counter, setCounter] = useState<{
        editStatus: boolean;
        value: CounterType | null;
        selectedId: string | null;
    }>({
        editStatus: false,
        value: null,
        selectedId: null,
    });

    const [discount, setDiscount] = useState<{
        editStatus: boolean;
        value: number | string | any;
    }>({
        editStatus: false,
        value: 0,
    });

    const [orderTax, setOrderTax] = useState<{
        editStatus: boolean;
        value: TaxRateType | null;
        selectedId: string | null;
    }>({
        editStatus: false,
        value: null,
        selectedId: null,
    });

    const [otherCharge, setOtherCharge] = useState<{
        editStatus: boolean;
        value: number | string | any;
    }>({
        editStatus: false,
        value: 0,
    });

    const [shippingCharge, setShippingCharge] = useState<{
        editStatus: boolean;
        value: number | string | any;
    }>({
        editStatus: false,
        value: 0,
    });

    const total = useMemo(() => {
        const productDiscount = selectedProducts.reduce(
            (acc, cur) => acc + Number(cur.discount),
            0
        );
        const productTotal = selectedProducts.reduce(
            (acc, cur) => acc + Number(cur.total),
            0
        );

        const taxAmount =
            productTotal * (Number(orderTax.value?.rate ?? 0) / 100);
        const extraCharge =
            Number(otherCharge.value) + Number(shippingCharge.value);
        const netAmount =
            productTotal + extraCharge + taxAmount - Number(discount.value);

        return { productDiscount, netAmount };
    }, [
        discount.value,
        orderTax.value?.rate,
        otherCharge.value,
        selectedProducts,
        shippingCharge.value,
    ]);

    useEffect(() => {
        walkingCustomer();
    }, [walkingCustomer]);

    useImperativeHandle(
        ref,
        () => {
            return {
                customer,
                counter,
                shippingCharge,
                otherCharge,
                discount,
                orderTax,
                total,
            };
        },
        [
            customer,
            counter,
            shippingCharge,
            otherCharge,
            discount,
            orderTax,
            total,
        ]
    );

    return (
        <>
            <Grid mb="lg">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Text size="md" fw={600} mb="xs">
                        Customer:
                    </Text>

                    {customer.editStatus ? (
                        <SelectBox
                            placeholder="Search Customer"
                            data={selectGenerator(customers, "name", "id")}
                            disabled={customersIsFetching}
                            value={customer.selectedId}
                            autoFocus
                            onChange={(value) => {
                                if (!value) return;
                                const selected = customers.find(
                                    (item: CustomerType) => item.id === value
                                );
                                setCustomer((prevState) => ({
                                    ...prevState,
                                    value: selected,
                                    selectedId: value,
                                }));
                            }}
                            onBlur={() =>
                                setCustomer((prevState) => ({
                                    ...prevState,
                                    editStatus: false,
                                }))
                            }
                        />
                    ) : (
                        <Group gap="xs">
                            <Text size="xl" fw={600}>
                                {customer.value?.name ?? "N/A"}
                            </Text>
                            <ActionIcon
                                size="sm"
                                variant="light"
                                onClick={() =>
                                    setCustomer((prevState) => ({
                                        ...prevState,
                                        editStatus: !prevState.editStatus,
                                    }))
                                }
                            >
                                <Icon icon="lucide:edit" width={14} />
                            </ActionIcon>
                        </Group>
                    )}
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Text size="md" fw={600} mb="xs">
                        Counter No:
                    </Text>

                    {counter.editStatus ? (
                        <SelectBox
                            placeholder="Select Counter"
                            data={selectGenerator(counters, "name", "id")}
                            disabled={countersIsFetching}
                            value={counter.selectedId}
                            autoFocus
                            onChange={(value) => {
                                if (!value) return;
                                const selected = counters.find(
                                    (item: CounterType) => item.id === value
                                );
                                setCounter((prevState) => ({
                                    ...prevState,
                                    value: selected,
                                    selectedId: value,
                                }));
                            }}
                            onBlur={() =>
                                setCounter((prevState) => ({
                                    ...prevState,
                                    editStatus: false,
                                }))
                            }
                        />
                    ) : (
                        <Group gap="xs">
                            <Text size="xl" fw={600}>
                                {counter.value?.name ?? "N/A"}
                            </Text>
                            <ActionIcon
                                size="sm"
                                variant="light"
                                onClick={() =>
                                    setCounter((prevState) => ({
                                        ...prevState,
                                        editStatus: !prevState.editStatus,
                                    }))
                                }
                            >
                                <Icon icon="lucide:edit" width={14} />
                            </ActionIcon>
                        </Group>
                    )}
                </Grid.Col>
            </Grid>

            <Table.ScrollContainer
                minWidth="100%"
                h={{ base: "100%", lg: 335 }}
            >
                <Table
                    striped
                    highlightOnHover
                    withTableBorder
                    withColumnBorders
                >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th className="min-w-36">Product</Table.Th>
                            <Table.Th className="min-w-32 text-center">
                                Quantity
                            </Table.Th>
                            <Table.Th className="min-w-28 text-center">
                                Price
                            </Table.Th>
                            <Table.Th className="min-w-28 text-center">
                                Subtotal
                            </Table.Th>
                            <Table.Th className="min-w-4 text-center">
                                Action
                            </Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {selectedProducts.length > 0 ? (
                            selectedProducts.map((item: any, i) => (
                                <Table.Tr key={i}>
                                    <Table.Td>
                                        <Text size="sm" fw={600} lineClamp={1}>
                                            {item?.name}
                                        </Text>
                                        <Badge size="xs" radius="xs">
                                            {item?.code}
                                        </Badge>
                                    </Table.Td>
                                    <Table.Td>
                                        <TextField
                                            pattern="[0-9]*"
                                            leftSection={
                                                <ActionIcon
                                                    size="sm"
                                                    variant="light"
                                                    onClick={() =>
                                                        addProduct(
                                                            {
                                                                id: item.productId,
                                                                name: item.name,
                                                            },
                                                            1,
                                                            "sub"
                                                        )
                                                    }
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
                                                    onClick={() =>
                                                        addProduct({
                                                            id: item.productId,
                                                            name: item.name,
                                                        })
                                                    }
                                                >
                                                    <Icon
                                                        icon="ri:add-fill"
                                                        width={16}
                                                    />
                                                </ActionIcon>
                                            }
                                            value={item.quantity}
                                            classNames={{
                                                input: "text-center",
                                            }}
                                            readOnly
                                        />
                                    </Table.Td>
                                    <Table.Td className="text-center">
                                        <Text size="sm">{item.price}</Text>
                                        <Text size="xs" tt="capitalize">
                                            {item.taxMethod} (0%)
                                        </Text>
                                    </Table.Td>
                                    <Table.Td className="text-center">
                                        {item.total}
                                    </Table.Td>
                                    <Table.Td>
                                        <Flex justify="center">
                                            <ActionIcon
                                                variant="light"
                                                color="red"
                                                size="sm"
                                                onClick={() => deleteProduct(i)}
                                            >
                                                <Icon
                                                    icon="icon-park-outline:delete"
                                                    width={16}
                                                />
                                            </ActionIcon>
                                        </Flex>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        ) : (
                            <Table.Tr>
                                <Table.Td colSpan={5} py="xl">
                                    <Text size="lg" fw={500} ta="center">
                                        No product selected yet!
                                    </Text>
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <Grid gutter="xs" pt="md">
                <Grid.Col span={6}>
                    {/* <TextField label="Product Discount" /> */}
                    <Text size="sm" fw={500} mb="xs">
                        Product Discount
                    </Text>
                    <Group gap="xs" align="center">
                        <Text size="xl" fw={600}>
                            ${total.productDiscount}
                        </Text>
                    </Group>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text size="sm" fw={500} mb="xs">
                        Extra Discount
                    </Text>

                    {discount.editStatus ? (
                        <NumberField
                            placeholder="Extra Discount"
                            value={discount.value}
                            min={0}
                            onChange={(value) => {
                                setDiscount((prevState) => ({
                                    ...prevState,
                                    value: value,
                                }));
                            }}
                            onBlurCapture={() =>
                                setDiscount((prevState) => ({
                                    ...prevState,
                                    editStatus: false,
                                }))
                            }
                        />
                    ) : (
                        <Group gap="xs">
                            <Text size="xl" fw={600}>
                                ${discount.value ?? "0"}
                            </Text>
                            <ActionIcon
                                size="sm"
                                variant="light"
                                onClick={() =>
                                    setDiscount((prevState) => ({
                                        ...prevState,
                                        editStatus: !prevState.editStatus,
                                    }))
                                }
                            >
                                <Icon icon="lucide:edit" width={14} />
                            </ActionIcon>
                        </Group>
                    )}
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text size="sm" fw={500} mb="xs">
                        Order Tax
                    </Text>

                    {orderTax.editStatus ? (
                        <SelectBox
                            placeholder="Select OrderTax"
                            data={selectGenerator(taxes, "name", "id")}
                            disabled={taxesIsFetching}
                            value={orderTax.selectedId}
                            autoFocus
                            onChange={(value) => {
                                if (!value) return;
                                const selected = taxes.find(
                                    (item: TaxRateType) => item.id === value
                                );
                                setOrderTax((prevState) => ({
                                    ...prevState,
                                    value: selected,
                                    selectedId: value,
                                }));
                            }}
                            onBlur={() =>
                                setOrderTax((prevState) => ({
                                    ...prevState,
                                    editStatus: false,
                                }))
                            }
                        />
                    ) : (
                        <Group gap="xs">
                            <Text size="xl" fw={600}>
                                {orderTax.value?.name ?? "N/A"}
                            </Text>
                            <ActionIcon
                                size="sm"
                                variant="light"
                                onClick={() =>
                                    setOrderTax((prevState) => ({
                                        ...prevState,
                                        editStatus: !prevState.editStatus,
                                    }))
                                }
                            >
                                <Icon icon="lucide:edit" width={14} />
                            </ActionIcon>
                        </Group>
                    )}
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text size="sm" fw={500} mb="xs">
                        Other Charge
                    </Text>

                    {otherCharge.editStatus ? (
                        <NumberField
                            placeholder="Other Charge"
                            value={otherCharge.value}
                            min={0}
                            onChange={(value) => {
                                setOtherCharge((prevState) => ({
                                    ...prevState,
                                    value: value,
                                }));
                            }}
                            onBlur={() =>
                                setOtherCharge((prevState) => ({
                                    ...prevState,
                                    editStatus: false,
                                }))
                            }
                        />
                    ) : (
                        <Group gap="xs">
                            <Text size="xl" fw={600}>
                                ${otherCharge.value ?? "0"}
                            </Text>
                            <ActionIcon
                                size="sm"
                                variant="light"
                                onClick={() =>
                                    setOtherCharge((prevState) => ({
                                        ...prevState,
                                        editStatus: !prevState.editStatus,
                                    }))
                                }
                            >
                                <Icon icon="lucide:edit" width={14} />
                            </ActionIcon>
                        </Group>
                    )}
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text size="sm" fw={500} mb="xs">
                        Shipping Charge
                    </Text>

                    {shippingCharge.editStatus ? (
                        <NumberField
                            placeholder="Shipping Charge"
                            value={shippingCharge.value}
                            min={0}
                            onChange={(value) => {
                                setShippingCharge((prevState) => ({
                                    ...prevState,
                                    value: value,
                                }));
                            }}
                            onBlur={() =>
                                setShippingCharge((prevState) => ({
                                    ...prevState,
                                    editStatus: false,
                                }))
                            }
                        />
                    ) : (
                        <Group gap="xs">
                            <Text size="xl" fw={600}>
                                ${shippingCharge.value ?? "0"}
                            </Text>
                            <ActionIcon
                                size="sm"
                                variant="light"
                                onClick={() =>
                                    setShippingCharge((prevState) => ({
                                        ...prevState,
                                        editStatus: !prevState.editStatus,
                                    }))
                                }
                            >
                                <Icon icon="lucide:edit" width={14} />
                            </ActionIcon>
                        </Group>
                    )}
                </Grid.Col>
                <Grid.Col span={12}>
                    <Button size="xl" variant="light" fullWidth>
                        <Text className="text-2xl" fw={600}>
                            Net Amount: ${total.netAmount}
                        </Text>
                    </Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <Button
                        size="xl"
                        color="red"
                        fullWidth
                        leftSection={
                            <Icon icon="hugeicons:hold-01" width={28} />
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
                            <Icon icon="ic:twotone-payments" width={28} />
                        }
                        type="submit"
                    >
                        Pay Now
                    </Button>
                </Grid.Col>
            </Grid>
        </>
    );
};

export default forwardRef(CartSection);

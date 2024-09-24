import AppLoading from "@/components/UI/AppLoading";
import SelectBox from "@/components/UI/SelectBox";
import TextField from "@/components/UI/TextField";
import Images from "@/lib/constants/Images";
import { ProductType } from "@/lib/models/Product";
import { selectGenerator } from "@/lib/utils/helper";
import { useFetchBrandsQuery } from "@/states/actions/stores/brands";
import { useFetchProductCategoriesQuery } from "@/states/actions/stores/productCategories";
import { useFetchProductsQuery } from "@/states/actions/stores/products";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Badge,
    Card,
    CardSection,
    Grid,
    Group,
    ScrollArea,
    Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import Image from "next/image";
import React, { useState } from "react";

const ProductSection: React.FC<{
    addProduct: (value: any) => void;
}> = ({ addProduct }) => {
    const [search, setSearch] = useState("");
    const [debounced] = useDebouncedValue(search, 1500);

    const [productQueries, setProductQueries] = useState({
        categoryId: null,
        brandId: null,
        // search: debounced,
        fields: "type,id,name,price,code,discount,taxMethod",
    });

    const productQueryHandler = (field: string, value: string | any) => {
        setProductQueries((prevState) => ({ ...prevState, [field]: value }));
    };

    const { data: categories, isFetching: categoriesIsFetching } =
        useFetchProductCategoriesQuery(`get_all=1&status=active`);
    const { data: brands, isFetching: brandsIsFetching } = useFetchBrandsQuery(
        `get_all=1&status=active`
    );

    const { data: products, isFetching: productIsFetching } =
        useFetchProductsQuery(
            `limit=20&fields=${productQueries.fields}${
                productQueries.categoryId
                    ? `&categoryId=${productQueries.categoryId}`
                    : ""
            }${
                productQueries.brandId
                    ? `&brandId=${productQueries.brandId}`
                    : ""
            }${debounced ? `&search=${debounced}` : ""}`
        );

    return (
        <>
            <Grid mb="md">
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <TextField
                        placeholder="Search Product"
                        size="lg"
                        leftSection={
                            <Icon icon="material-symbols:barcode" width={36} />
                        }
                        rightSection={
                            <ActionIcon size="lg" color="red">
                                <Icon icon="hugeicons:hold-01" width={28} />
                            </ActionIcon>
                        }
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 3 }}>
                    <SelectBox
                        placeholder="Search Category"
                        size="lg"
                        data={selectGenerator(categories, "name", "id")}
                        disabled={categoriesIsFetching}
                        value={productQueries.categoryId}
                        onChange={(value) =>
                            productQueryHandler("categoryId", value)
                        }
                        classNames={{
                            option: "text-sm font-semibold",
                        }}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, lg: 3 }}>
                    <SelectBox
                        placeholder="Search Brand"
                        size="lg"
                        data={selectGenerator(brands, "name", "id")}
                        disabled={brandsIsFetching}
                        value={productQueries.brandId}
                        onChange={(value) =>
                            productQueryHandler("brandId", value)
                        }
                        classNames={{
                            option: "text-sm font-semibold",
                        }}
                    />
                </Grid.Col>
            </Grid>

            {productIsFetching ? (
                <div className="flex flex-1 justify-center items-center">
                    <AppLoading isLoading={productIsFetching} />
                </div>
            ) : products?.data?.length > 0 ? (
                <ScrollArea h={{ base: 400, lg: 730 }} offsetScrollbars pb="sm">
                    <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-3">
                        {products.data.map((item: ProductType, i: number) => (
                            <Card
                                key={i}
                                withBorder
                                radius="md"
                                className="cursor-pointer"
                                onClick={() => addProduct(item)}
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
                                            ${item.price}
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
                                <Text size="md" fw={600} lineClamp={1}>
                                    {item.name}
                                </Text>
                                <Text size="xs">{item.code}</Text>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    <Text size="xl" fw={600}>
                        No products found...
                    </Text>
                </div>
            )}
        </>
    );
};

export default ProductSection;

import { UnitType } from "dayjs";
import { BrandType } from "./Brand";
import { ProductCategoryType } from "./ProductCategory";
import { SupplierType } from "./Supplier";
import { TaxRateType } from "./TaxRate";

type WarrantyType = {
    status?: boolean;
    type?: string;
    value: number;
};

export type ProductType = {
    id?: string;
    supplierId?: string;
    categoryId?: string;
    brandId?: string;
    unitId?: string;
    taxRateId?: string;
    boxId?: string;
    type?: string;
    name: string;
    code?: string;
    barcodeSymbology?: string;
    barcode?: string;
    price?: number;
    discount?: number;
    loyaltyPoint?: number;
    alertQuantity?: number;
    warranty?: WarrantyType | null;
    taxMethod?: string;
    photo?: string;
    description?: string;
    order?: number;
    status?: string;

    supplier?: SupplierType | null;
    category?: ProductCategoryType | null;
    brand?: BrandType | null;
    unit?: UnitType | null;
    taxRate?: TaxRateType | null;
};

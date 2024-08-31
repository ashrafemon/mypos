import accounts from "./accounts";
import accountTransfers from "./accountTransfers";
import attendances from "./attendances";
import brands from "./brands";
import counters from "./counters";
import currencies from "./currencies";
import customerGroups from "./customerGroups";
import customers from "./customers";
import damages from "./damages";
import employees from "./employees";
import expenseCategories from "./expenseCategories";
import expenses from "./expenses";
import incomeCategories from "./incomeCategories";
import incomes from "./incomes";
import outlets from "./outlets";
import paymentMethods from "./paymentMethods";
import productCategories from "./productCategories";
import products from "./products";
import purchaseReturns from "./purchaseReturns";
import purchases from "./purchases";
import quotations from "./quotations";
import saleReturns from "./saleReturns";
import sales from "./sales";
import suppliers from "./suppliers";
import taxRates from "./taxRates";
import transactions from "./transactions";
import units from "./units";
import variants from "./variants";

export const storeApiReducers = {
    [suppliers.reducerPath]: suppliers.reducer,

    [customers.reducerPath]: customers.reducer,
    [customerGroups.reducerPath]: customerGroups.reducer,

    [expenseCategories.reducerPath]: expenseCategories.reducer,
    [expenses.reducerPath]: expenses.reducer,

    [incomeCategories.reducerPath]: incomeCategories.reducer,
    [incomes.reducerPath]: incomes.reducer,

    [accounts.reducerPath]: accounts.reducer,
    [transactions.reducerPath]: transactions.reducer,
    [accountTransfers.reducerPath]: accountTransfers.reducer,

    [productCategories.reducerPath]: productCategories.reducer,
    [products.reducerPath]: products.reducer,

    [sales.reducerPath]: sales.reducer,
    [saleReturns.reducerPath]: saleReturns.reducer,

    [purchases.reducerPath]: purchases.reducer,
    [purchaseReturns.reducerPath]: purchaseReturns.reducer,

    [quotations.reducerPath]: quotations.reducer,
    [damages.reducerPath]: damages.reducer,

    [employees.reducerPath]: employees.reducer,
    [attendances.reducerPath]: attendances.reducer,

    [outlets.reducerPath]: outlets.reducer,
    [counters.reducerPath]: counters.reducer,
    [taxRates.reducerPath]: taxRates.reducer,
    [currencies.reducerPath]: currencies.reducer,
    [paymentMethods.reducerPath]: paymentMethods.reducer,
    [brands.reducerPath]: brands.reducer,
    [units.reducerPath]: units.reducer,
    [variants.reducerPath]: variants.reducer,
};

export const storeApiMiddleWares = [
    suppliers.middleware,

    customers.middleware,
    customerGroups.middleware,

    expenseCategories.middleware,
    expenses.middleware,

    incomeCategories.middleware,
    incomes.middleware,

    accounts.middleware,
    transactions.middleware,
    accountTransfers.middleware,

    productCategories.middleware,
    products.middleware,

    sales.middleware,
    saleReturns.middleware,

    purchases.middleware,
    purchaseReturns.middleware,

    quotations.middleware,
    damages.middleware,

    employees.middleware,
    attendances.middleware,

    outlets.middleware,
    counters.middleware,
    taxRates.middleware,
    currencies.middleware,
    paymentMethods.middleware,
    brands.middleware,
    units.middleware,
    variants.middleware,
];

export const API_URL = "/api/v1";

export const StoreLinks = [
    {
        name: "Dashboard",
        link: "#",
        icon: "carbon:dashboard",
        links: [
            { name: "Master Dashboard", link: "/dashboard" },
            { name: "Counter Dashboard", link: "/counter-dashboard" },
        ],
    },
    {
        name: "Stores",
        link: "#",
        icon: "bx:store",
        links: [
            { name: "Add Store", link: "/stores/create" },
            { name: "List Store", link: "/stores" },
        ],
    },
    {
        name: "Sale",
        link: "#",
        icon: "mdi:point-of-sale",
        links: [
            { name: "POS Screen", link: "/stores/create" },
            { name: "List Sale", link: "/sales" },
            { name: "Return Sale", link: "/sales/returns" },
        ],
    },
    {
        name: "Customers",
        link: "#",
        icon: "carbon:customer",
        links: [
            { name: "Add Customer", link: "/customers/create" },
            { name: "List Customer", link: "/customers" },
            { name: "List Customer Group", link: "/customers/groups" },
        ],
    },
    {
        name: "Suppliers",
        link: "#",
        icon: "carbon:scis-transparent-supply",
        links: [
            { name: "Add Supplier", link: "/suppliers/create" },
            { name: "List Supplier", link: "/suppliers" },
        ],
    },
    {
        name: "Services/Products",
        link: "#",
        icon: "fluent-mdl2:product-variant",
        links: [
            { name: "Add Item", link: "/products/create" },
            { name: "List Item", link: "/products" },
            { name: "List Category", link: "/products/categories" },
            { name: "Print Barcode", link: "/products/barcodes" },
        ],
    },
    {
        name: "Stocks",
        link: "/stocks",
        icon: "fxemoji:stockchart",
        links: [],
    },
    {
        name: "Purchases",
        link: "#",
        icon: "icon-park-outline:buy",
        links: [
            { name: "Add Purchase", link: "/purchases/create" },
            { name: "List Purchase", link: "/purchases" },
            { name: "Return Purchase", link: "/purchases/returns" },
        ],
    },
    {
        name: "Expenses",
        link: "#",
        icon: "arcticons:day-to-day-expenses",
        links: [
            { name: "Add Expense", link: "/expenses/create" },
            { name: "List Expense", link: "/expenses" },
            { name: "List Expense Category", link: "/expenses/categories" },
        ],
    },
    {
        name: "Accounting",
        link: "#",
        icon: "material-symbols:account-balance-outline-rounded",
        links: [
            { name: "List Account", link: "/accounting/accounts" },
            {
                name: "Add Deposit/Withdraw",
                link: "/accounting/transactions/create",
            },
            { name: "List Deposit/Withdraw", link: "/accounting/transactions" },
            { name: "Add Transfer", link: "/accounting/transfers/create" },
            { name: "List Transfer", link: "/accounting/transfers" },
            // {
            //     name: "Balance Statement",
            //     link: "/accounting/balance-statements",
            // },
            // { name: "Trial Balance", link: "/accounting/trial-balances" },
            // { name: "Balance Sheet", link: "/accounting/balance-sheets" },
        ],
    },
    {
        name: "Incomes",
        link: "#",
        icon: "tdesign:money",
        links: [
            { name: "Add Income", link: "/incomes/create" },
            { name: "List Income", link: "/incomes" },
            { name: "List Income Category", link: "/incomes/categories" },
        ],
    },
    {
        name: "Quotations",
        link: "#",
        icon: "hugeicons:estimate-01",
        links: [
            { name: "Add Quotation", link: "/quotations/create" },
            { name: "List Quotation", link: "/quotations" },
        ],
    },
    // {
    //     name: "Transfers",
    //     link: "#",
    //     icon: "mingcute:transfer-fill",
    //     links: [
    //         { name: "Add Transfer", link: "/transfers/create" },
    //         { name: "List Transfer", link: "/transfers" },
    //     ],
    // },
    // {
    //     name: "Damages",
    //     link: "#",
    //     icon: "ri:file-damage-fill",
    //     links: [
    //         { name: "Add Damage", link: "/damages/create" },
    //         { name: "List Damage", link: "/damages" },
    //     ],
    // },
    {
        name: "HR Management",
        link: "#",
        icon: "hugeicons:permanent-job",
        links: [
            { name: "Add Employee", link: "/hrm/employees/create" },
            { name: "List Employee", link: "/hrm/employees" },
            { name: "List Payroll", link: "/hrm/payrolls" },
            { name: "List Attendance", link: "/hrm/attendances" },
        ],
    },
    // {
    //     name: "Report",
    //     link: "#",
    //     icon: "fluent-mdl2:report-document",
    //     links: [
    //         { name: "Register Report", link: "/stores/create" },
    //         { name: "Z Report", link: "/stores/list" },
    //         { name: "Daily Summary Report", link: "/stores/list" },
    //         { name: "Sale Report", link: "/stores/list" },
    //         { name: "Service Sale Report", link: "/stores/list" },
    //         { name: "Stock Report", link: "/stores/list" },
    //         { name: "Employee Sale Report", link: "/stores/list" },
    //         { name: "Customer Receive Report", link: "/stores/list" },
    //         { name: "Attendance Report", link: "/stores/list" },
    //         { name: "Product Profit Report", link: "/stores/list" },
    //         { name: "Supplier Ledger", link: "/stores/list" },
    //         { name: "Supplier Balance Report", link: "/stores/list" },
    //         { name: "Customer Ledger", link: "/stores/list" },
    //         { name: "Customer Balance Report", link: "/stores/list" },
    //         { name: "Servicing Report", link: "/stores/list" },
    //         { name: "Product Sale Report", link: "/stores/list" },
    //         { name: "Tax Report", link: "/stores/list" },
    //         { name: "Detailed Sale Report", link: "/stores/list" },
    //         { name: "Low Stock Report", link: "/stores/list" },
    //         { name: "Profit Loss Report", link: "/stores/list" },
    //         { name: "Purchase Report", link: "/stores/list" },
    //         { name: "Product Purchase Report", link: "/stores/list" },
    //         { name: "Expense Report", link: "/stores/list" },
    //         { name: "Income Report", link: "/stores/list" },
    //         { name: "Salary Report", link: "/stores/list" },
    //         { name: "Purchase Return Report", link: "/stores/list" },
    //         { name: "Sale Return Report", link: "/stores/list" },
    //         { name: "Damage Report", link: "/stores/list" },
    //         { name: "Installment Report", link: "/stores/list" },
    //         { name: "Item Movement Report", link: "/stores/list" },
    //         { name: "Price History Report", link: "/stores/list" },
    //         { name: "Cash Flow Report", link: "/stores/list" },
    //         { name: "Available Loyalty Point Report", link: "/stores/list" },
    //         { name: "Usage Loyalty Point Report", link: "/stores/list" },
    //     ],
    // },
    {
        name: "System",
        link: "#",
        icon: "hugeicons:solar-system",
        links: [
            { name: "Counter", link: "/system/counters" },
            { name: "Tax/Vat", link: "/system/taxes" },
            { name: "Currency", link: "/system/currencies" },
            { name: "Payment Method", link: "/system/payment-methods" },
            { name: "Unit", link: "/system/units" },
            { name: "Brand", link: "/system/brands" },
            // { name: "List Variant", link: "/system/variants" },
        ],
    },
];

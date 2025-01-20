import pool from "./pool.js";

function createTableQuery(tableName, columns) {
    const sanitizedTableName = tableName.replace(/[^a-zA-Z0-9_]/g, ''); // Basic sanitization
    return `CREATE TABLE IF NOT EXISTS ${sanitizedTableName} (${columns});`;
}

const createCategoryTable = createTableQuery(
    "categories",
    "id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(255)"
);

const createBrandTable = createTableQuery(
    "brands",
    "id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(255)"
);

const createInventoryTable = createTableQuery(
    "inventory",
    "id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR(255), quantity INTEGER, brand INT REFERENCES brands(id), category INT REFERENCES categories(id)"
);

const categoryData = `
    INSERT INTO categories (name) VALUES 
    ('Electronics'), ('Home Appliances'), ('Furniture'), ('Clothing'), ('Sports Equipment')
    ON CONFLICT DO NOTHING;
`;

const brandsData = `
    INSERT INTO brands (name) VALUES 
    ('Sony'), ('Samsung'), ('LG'), ('Nike'), ('Adidas')
    ON CONFLICT DO NOTHING;
`;

const inventoryData = `
    INSERT INTO inventory (name, quantity, brand, category) VALUES 
    ('Sony Headphones', 50, 1, 1),
    ('Samsung TV', 30, 2, 1),
    ('LG Refrigerator', 20, 3, 2),
    ('Nike Running Shoes', 100, 4, 4),
    ('Adidas Soccer Ball', 75, 5, 5)
    ON CONFLICT DO NOTHING;
`;

async function setupDatabase() {
    try {
        await pool.query(createCategoryTable);
        await pool.query(createBrandTable);
        await pool.query(createInventoryTable);
        await pool.query(categoryData);
        await pool.query(brandsData);
        await pool.query(inventoryData);
        console.log("Tables created and data inserted successfully!");
    } catch (err) {
        console.error("Error setting up database:", err);
    } finally {
        pool.end(); // Close the connection pool
    }
}

setupDatabase();

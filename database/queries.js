const pool = require("./pool");

async function getInventory() {
    const { rows } = await pool.query(`
        SELECT 
            inventory.id,
            inventory.name AS inventory_name,
            inventory.quantity,
            brands.name AS brand_name,
            categories.name AS category_name
        FROM inventory
        JOIN brands ON inventory.brand = brands.id
        JOIN categories ON inventory.category = categories.id
    `);
    return rows;
}

async function getBrands() {
    const { rows } = await pool.query(`SELECT * FROM brands`);
    return rows;
}

async function getCategories() {
    const { rows } = await pool.query(`SELECT * FROM categories`);
    return rows;
}

async function createInventory(name, quantity, brandId, categoryId) {
    const result = await pool.query(`
        INSERT INTO inventory (name, quantity, brand, category)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `, [name, quantity, brandId, categoryId]);
    return result.rows[0];
}

async function createBrand(name) {
    const result = await pool.query(`
        INSERT INTO brands (name)
        VALUES ($1)
        RETURNING *;
    `, [name]);
    return result.rows[0];
}

async function createCategory(name) {
    const result = await pool.query(`
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *;
    `, [name]);
    return result.rows[0];
}

async function updateInventory(id, name, quantity, brandId, categoryId) {
    const result = await pool.query(`
        UPDATE inventory
        SET name = $1, quantity = $2, brand = $3, category = $4
        WHERE id = $5
        RETURNING *;
    `, [name, quantity, brandId, categoryId, id]);
    return result.rows[0];
}

async function updateBrand(id, name) {
    const result = await pool.query(`
        UPDATE brands
        SET name = $1
        WHERE id = $2
        RETURNING *;
    `, [name, id]);
    return result.rows[0];
}

async function updateCategory(id, name) {
    const result = await pool.query(`
        UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING *;
    `, [name, id]);
    return result.rows[0];
}

async function deleteInventory(id) {
    const result = await pool.query(`
        DELETE FROM inventory
        WHERE id = $1
        RETURNING *;
    `, [id]);
    return result.rows[0];
}

async function deleteBrand(id) {
    const result = await pool.query(`
        DELETE FROM brands
        WHERE id = $1
        RETURNING *;
    `, [id]);
    return result.rows[0];
}

async function deleteCategory(id) {
    const result = await pool.query(`
        DELETE FROM categories
        WHERE id = $1
        RETURNING *;
    `, [id]);
    return result.rows[0];
}

async function getInventoryForEdit(id) {
    const result = await pool.query(`
        SELECT 
            inventory.id,
            inventory.name AS inventory_name,
            inventory.quantity,
            inventory.brand AS brand_id,
            inventory.category AS category_id,
            brands.name AS brand_name,
            categories.name AS category_name
        FROM inventory
        JOIN brands ON inventory.brand = brands.id
        JOIN categories ON inventory.category = categories.id
        WHERE inventory.id = $1;
    `, [id]);

    return result.rows[0]; // Return the single row for editing
}

module.exports = {
    getInventory,
    getBrands,
    getCategories,
    createInventory,
    createBrand,
    createCategory,
    updateInventory,
    updateBrand,
    updateCategory,
    deleteInventory,
    deleteBrand,
    deleteCategory,
    getInventoryForEdit
};

const db = require("../database/queries");

async function getInventory(req, res) {
    try {
        const inventoryItems = await db.getInventory();
        res.render("inventory", { inventory: inventoryItems });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch inventory");
    }
}

async function getCreateInventoryView(req, res) {
    try {
        const brands = await db.getBrands();
        const categories = await db.getCategories();
        res.render("createInventory", { brands, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load form");
    }
}

async function createInventory(req, res) {
    const { name, quantity, brand, category } = req.body;

    if (!name || !quantity || !brand || !category) {
        return res.status(400).send("Name, quantity, brand, and category are required");
    }

    try {
        await db.createInventory(name, quantity, brand, category);
        res.redirect("/inventory");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to create inventory item");
    }
}

async function getInventoryForEdit(req, res) {
    const { id } = req.params;

    try {
        const inventoryItem = await db.getInventoryForEdit(id);
        const brands = await db.getBrands();
        const categories = await db.getCategories();

        if (!inventoryItem) {
            return res.status(404).send("Inventory item not found");
        }

        res.render("editInventory", { inventory: inventoryItem, brands, categories });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to fetch inventory item for editing");
    }
}

async function updateInventory(req, res) {
    const { id } = req.params;
    const { name, quantity, brand, category } = req.body;

    if (!name || !quantity || !brand || !category) {
        return res.status(400).send("Name, quantity, brand, and category are required");
    }

    try {
        const updatedInventoryItem = await db.updateInventory(id, name, quantity, brand, category);
        if (!updatedInventoryItem) {
            return res.status(404).send("Inventory item not found");
        }
        res.redirect("/inventory");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to update inventory item");
    }
}

async function deleteInventory(req, res) {
    const { id } = req.params;

    try {
        const deletedInventoryItem = await db.deleteInventory(id);
        if (!deletedInventoryItem) {
            return res.status(404).send("Inventory item not found");
        }
        res.redirect("/inventory");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to delete inventory item");
    }
}

module.exports = {
    getInventory,
    getCreateInventoryView,
    createInventory,
    getInventoryForEdit,
    updateInventory,
    deleteInventory,
};

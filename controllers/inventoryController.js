const db = require("../database/queries");

async function getInventory() {
    try {
        const inventoryItems = await db.getInventory();
        return inventoryItems;
    } catch (err) {
        throw new Error("Failed to fetch inventory");
    }
}

async function createInventory(name, quantity, brand, category) {
    if (!name || !quantity || !brand || !category) {
        throw new Error("Name, quantity, brand, and category are required");
    }

    try {
        const newInventoryItem = await db.createInventory(name, quantity, brand, category);
        return newInventoryItem;
    } catch (err) {
        throw new Error("Failed to create inventory item");
    }
}

async function updateInventory(id, name, quantity, brand, category) {
    if (!name || !quantity || !brand || !category) {
        throw new Error("Name, quantity, brand, and category are required");
    }

    try {
        const updatedInventoryItem = await db.updateInventory(id, name, quantity, brand, category);
        if (!updatedInventoryItem) {
            throw new Error("Inventory item not found");
        }
        return updatedInventoryItem;
    } catch (err) {
        throw new Error("Failed to update inventory item");
    }
}

async function deleteInventory(id) {
    try {
        const deletedInventoryItem = await db.deleteInventory(id);
        if (!deletedInventoryItem) {
            throw new Error("Inventory item not found");
        }
        return deletedInventoryItem;
    } catch (err) {
        throw new Error("Failed to delete inventory item");
    }
}

module.exports = {
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory
};
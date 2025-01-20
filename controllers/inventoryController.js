const db = require("../database/queries");

async function getInventory(req, res) {
    try {
        const inventory = await db.getInventory();
        res.render("inventory", { inventory });
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to fetch inventory");
    }
}

async function createInventory(req, res) {
    const { name, quantity, brand, category } = req.body;

    if (!name || !quantity || !brand || !category) {
        return res.status(400).send("Name, quantity, brand, and category are required");
    }

    try {
        const newInventoryItem = await db.createInventory(name, quantity, brand, category);
        res.redirect("/inventory");
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to create inventory item");
    }
}

async function updateInventory(req, res) {
    const { id, name, quantity, brand, category } = req.body;

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
        console.log(err);
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
        console.log(err);
        res.status(500).send("Failed to delete inventory item");
    }
}

module.exports = {
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory
};

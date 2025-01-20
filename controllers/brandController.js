// controllers/brandController.js
const db = require("../database/queries");

async function getBrands(req, res) {
    try {
        const brands = await db.getBrands();
        res.render("brands", { brands });
    } catch (err) {
        console.error("Error fetching brands:", err);
        res.status(500).json({ error: "Failed to fetch brands" });
    }
}

async function createBrand(req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Brand name is required" });
    }

    try {
        const newBrand = await db.createBrand(name);
        res.status(201).json(newBrand);
    } catch (err) {
        console.error("Error creating brand:", err);
        res.status(500).json({ error: "Failed to create brand" });
    }
}

async function updateBrand(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Brand name is required" });
    }

    try {
        const updatedBrand = await db.updateBrand(id, name);
        if (!updatedBrand) {
            return res.status(404).json({ error: "Brand not found" });
        }
        res.status(200).json(updatedBrand);
    } catch (err) {
        console.error("Error updating brand:", err);
        res.status(500).json({ error: "Failed to update brand" });
    }
}

async function deleteBrand(req, res) {
    const { id } = req.params;

    try {
        const deletedBrand = await db.deleteBrand(id);
        if (!deletedBrand) {
            return res.status(404).json({ error: "Brand not found" });
        }
        res.status(200).json(deletedBrand);
    } catch (err) {
        console.error("Error deleting brand:", err);
        res.status(500).json({ error: "Failed to delete brand" });
    }
}

module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
};

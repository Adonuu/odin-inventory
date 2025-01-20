const db = require("../database/queries");

async function getCategories(req, res) {
    try {
        const categories = await db.getCategories();
        res.render("categories", { categories });
    } catch (err) {
        console.error("Error fetching categories:", err);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
}

async function createCategory(req, res) {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    try {
        const newCategory = await db.createCategory(name);
        res.status(201).json(newCategory);
    } catch (err) {
        console.error("Error creating category:", err);
        res.status(500).json({ error: "Failed to create category" });
    }
}

async function updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Category name is required" });
    }

    try {
        const updatedCategory = await db.updateCategory(id, name);
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (err) {
        console.error("Error updating category:", err);
        res.status(500).json({ error: "Failed to update category" });
    }
}

async function deleteCategory(req, res) {
    const { id } = req.params;

    try {
        const deletedCategory = await db.deleteCategory(id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(deletedCategory);
    } catch (err) {
        console.error("Error deleting category:", err);
        res.status(500).json({ error: "Failed to delete category" });
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};

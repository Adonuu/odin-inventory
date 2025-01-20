const db = require("../database/queries");

async function getCategories() {
    try {
        const categories = await db.getCategories();
        return categories;
    } catch (err) {
        throw new Error("Failed to fetch categories");
    }
}

async function createCategory(name) {
    if (!name) {
        throw new Error("Category name is required");
    }

    try {
        const newCategory = await db.createCategory(name);
        return newCategory;
    } catch (err) {
        throw new Error("Failed to create category");
    }
}

async function updateCategory(id, name) {
    if (!name) {
        throw new Error("Category name is required");
    }

    try {
        const updatedCategory = await db.updateCategory(id, name);
        if (!updatedCategory) {
            throw new Error("Category not found");
        }
        return updatedCategory;
    } catch (err) {
        throw new Error("Failed to update category");
    }
}

async function deleteCategory(id) {
    try {
        const deletedCategory = await db.deleteCategory(id);
        if (!deletedCategory) {
            throw new Error("Category not found");
        }
        return deletedCategory;
    } catch (err) {
        throw new Error("Failed to delete category");
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
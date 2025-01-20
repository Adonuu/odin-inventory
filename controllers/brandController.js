const db = require("../database/queries");

async function getBrands() {
    try {
        const brands = await db.getBrands();
        return brands;
    } catch (err) {
        throw new Error("Failed to fetch brands");
    }
}

async function createBrand(name) {
    if (!name) {
        throw new Error("Category name is required");
    }

    try {
        const newBrand = await db.createBrand(name);
        return newBrand;
    } catch (err) {
        throw new Error("Failed to create brand");
    }
}

async function updateBrand(id, name) {
    if (!name) {
        throw new Error("Brand name is required");
    }

    try {
        const updatedBrand = await db.updateBrand(id, name);
        if (!updatedBrand) {
            throw new Error("Brand not found");
        }
        return updatedBrand;
    } catch (err) {
        throw new Error("Failed to update brand");
    }
}

async function deleteBrand(id) {
    try {
        const deletedCategory = await db.deleteBrand(id);
        if (!deletedBrand) {
            throw new Error("Brand not found");
        }
        return deletedBrand;
    } catch (err) {
        throw new Error("Failed to delete brand");
    }
}

module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
};
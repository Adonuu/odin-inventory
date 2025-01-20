const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController"); // Adjust path if needed
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getInventory);
inventoryRouter.post("/", inventoryController.createInventoryItem);
inventoryRouter.put("/:id", inventoryController.updateInventoryItem);
inventoryRouter.delete("/:id", inventoryController.deleteInventoryItem);

module.exports = inventoryRouter;

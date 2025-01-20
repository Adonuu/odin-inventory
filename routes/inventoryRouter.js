const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController"); // Adjust path if needed
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getInventory);
inventoryRouter.post("/", inventoryController.createInventory);
inventoryRouter.put("/:id", inventoryController.updateInventory);
inventoryRouter.delete("/:id", inventoryController.deleteInventory);

module.exports = inventoryRouter;

const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.getInventory);
inventoryRouter.get("/new", inventoryController.getCreateInventoryView);
inventoryRouter.post("/new", inventoryController.createInventory);
inventoryRouter.get("/edit/:id", inventoryController.getInventoryForEdit);
inventoryRouter.post("/edit/:id", inventoryController.updateInventory);
inventoryRouter.get("/delete/:id", inventoryController.deleteInventory);

module.exports = inventoryRouter;

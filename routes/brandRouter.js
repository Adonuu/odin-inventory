const { Router } = require("express");
const brandController = require("../controllers/brandController");
const brandRouter = Router();

brandRouter.get("/", brandController.getBrands);
brandRouter.post("/", brandController.createBrand);
brandRouter.put("/:id", brandController.updateBrand);
brandRouter.delete("/:id", brandController.deleteBrand);

module.exports = brandRouter;

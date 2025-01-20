const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.getCategories);
categoryRouter.post("/", categoryController.createCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

module.exports = categoryRouter;

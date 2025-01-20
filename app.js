const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const inventoryRouter = require("./routes/inventoryRouter");
const brandRouter = require("./routes/brandRouter");
const categoryRouter = require("./routes/categoryRouter");



app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/", inventoryRouter);
app.use("/brand", brandRouter);
app.use("/category", categoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
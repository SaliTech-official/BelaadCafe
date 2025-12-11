const express = require("express");
const cors = require("cors");
const configSwagger = require("./configs/swagger");

const itemsRouter = require("./routes/item");

const app = express();

app.use(cors());
app.use(express.json());

configSwagger(app);

app.use("/items", itemsRouter);

module.exports = app;

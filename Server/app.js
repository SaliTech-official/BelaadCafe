const express = require("express");
const cors = require("cors");
const configSwagger = require("./configs/swagger");

const itemsRouter = require("./routes/item");

const app = express();

app.use(cors());
app.use(express.json());

configSwagger(app);

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: This API returns the items list.
 *     responses:
 *       200:
 *         description: Items fetched successfully.
 */
app.use("/items", itemsRouter);

module.exports = app;

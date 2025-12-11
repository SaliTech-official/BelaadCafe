const express = require("express");
const controller = require("./../controllers/item");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: Items management
 */

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: List of items.
 *
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "لاته"
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["قهوه", "شیر"]
 *               category:
 *                 type: string
 *                 example: "693ad3699c9d73a12caf1f8a"
 *               price:
 *                 type: number
 *                 example: 120000
 *               hasDiscount:
 *                 type: boolean
 *                 example: true
 *               discount:
 *                 type: object
 *                 properties:
 *                   percent:
 *                     type: number
 *                     example: 20
 *                   oldPrice:
 *                     type: number
 *                     example: 150000
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/latte.png"
 *     responses:
 *       201:
 *         description: Item created successfully.
 */
router.get("/", controller.getAllItems);
router.post("/", controller.createItem);

module.exports = router;

const express = require("express");
const controller = require("../controllers/item");
const validate = require("../middlewares/validate");
const {
    validateCreateItem,
    validateUpdateItem,
} = require("../validators/item.validator");

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
 *         description: List of items
 */
router.get("/", controller.getAllItems);

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - price
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
 *         description: Item created successfully
 *       400:
 *         description: Validation error
 */
router.post("/", validate(validateCreateItem), controller.createItem);

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               category:
 *                 type: string
 *               price:
 *                 type: number
 *               hasDiscount:
 *                 type: boolean
 *               discount:
 *                 type: object
 *                 properties:
 *                   percent:
 *                     type: number
 *                   oldPrice:
 *                     type: number
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Item updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Item not found
 */
router.put("/:id", validate(validateUpdateItem), controller.updateItem);

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Remove an item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Item ID
 *     responses:
 *       200:
 *         description: Item removed successfully
 *       400:
 *         description: Invalid ID
 *       404:
 *         description: Item not found
 */
router.delete("/:id", controller.removeItem);

module.exports = router;

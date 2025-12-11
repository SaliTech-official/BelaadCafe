const express = require("express");
const controller = require("./../controllers/item");

const router = express.Router();

router.get("/", controller.getAllItems);
router.post("/", controller.createItem);

module.exports = router;

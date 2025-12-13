const { default: mongoose } = require("mongoose");
const CategoryModel = require("../models/Category");
const ItemsModel = require("../models/Item");

exports.getAllItems = async (req, res) => {
    try {
        const items = await ItemsModel.find().populate("category");
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

exports.createItem = async (req, res) => {
    try {
        const { category } = req.body;

        const categoryExists = await CategoryModel.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ message: "Category not found" });
        }

        const newItem = await ItemsModel.create(req.body);
        await newItem.populate("category");

        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({
            message: "Cannot create item",
            error: err.message,
        });
    }
};

exports.removeItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid item id" });
        }

        const deletedItem = await ItemsModel.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({
            message: "Item removed successfully",
            deletedItem,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: "Invalid item id" });
        }

        if (req.body.category) {
            const categoryExists = await CategoryModel.findById(
                req.body.category
            );
            if (!categoryExists) {
                return res.status(404).json({ message: "Category not found" });
            }
        }

        if (req.body.hasDiscount === false) {
            req.body.discount = { percent: 0, oldPrice: 0 };
        }

        if (req.body.hasDiscount === true && !req.body.discount) {
            return res.status(400).json({
                message: "Discount data is required when hasDiscount is true",
            });
        }

        const updatedItem = await ItemsModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        }).populate("category");

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message,
        });
    }
};

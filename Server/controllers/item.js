const ItemsModel = require("./../models/Item");

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
        const {
            name,
            ingredients,
            category,
            price,
            hasDiscount,
            discount,
            imageUrl,
        } = req.body;

        const newItem = await ItemsModel.create({
            name,
            ingredients,
            category,
            price,
            hasDiscount,
            discount,
            imageUrl: imageUrl || "",
        });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({
            message: "cannot create item",
            error: err.message,
        });
    }
};

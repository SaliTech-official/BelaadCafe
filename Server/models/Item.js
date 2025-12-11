const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        ingredients: {
            type: [String],
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        hasDiscount: {
            type: Boolean,
            default: false,
        },

        discount: {
            percent: { type: Number, default: 0 },
            oldPrice: { type: Number, default: 0 },
        },

        imageUrl: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

const model = mongoose.model("Item", schema);

module.exports = model;

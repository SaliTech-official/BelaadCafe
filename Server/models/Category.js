const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        label: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const model = mongoose.model("Category", schema);

module.exports = model;

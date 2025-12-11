const Validator = require("fastest-validator");
const v = new Validator();

exports.createItemSchema = {
    name: { type: "string", min: 2, max: 100 },
    ingredients: { type: "array", optional: true, items: "string" },
    category: { type: "string", min: 24, max: 24 },
    price: { type: "number", positive: true },
    hasDiscount: { type: "boolean", optional: true },
    discount: {
        type: "object",
        optional: true,
        props: {
            percent: { type: "number", min: 1, max: 100 },
            oldPrice: { type: "number", positive: true },
        },
    },
    imageUrl: { type: "string", optional: true },
};

exports.validator = v;

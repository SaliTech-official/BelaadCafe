const Validator = require("fastest-validator");
const v = new Validator();

const objectIdRule = {
    type: "string",
    pattern: /^[0-9a-fA-F]{24}$/,
};

const discountRule = {
    type: "object",
    optional: true,
    props: {
        percent: { type: "number", min: 1, max: 99 },
        oldPrice: { type: "number", positive: true },
    },
};

/* ---------- CREATE ---------- */
exports.createItemSchema = {
    name: { type: "string", min: 2, max: 100 },

    ingredients: {
        type: "array",
        optional: true,
        items: "string",
    },

    category: objectIdRule,

    price: { type: "number", positive: true },

    hasDiscount: { type: "boolean", optional: true },

    discount: discountRule,

    imageUrl: { type: "string", optional: true },

    $$strict: true,
};

/* ---------- UPDATE ---------- */
exports.updateItemSchema = {
    name: { type: "string", min: 2, max: 100, optional: true },

    ingredients: {
        type: "array",
        optional: true,
        items: "string",
    },

    category: { ...objectIdRule, optional: true },

    price: { type: "number", positive: true, optional: true },

    hasDiscount: { type: "boolean", optional: true },

    discount: discountRule,

    imageUrl: { type: "string", optional: true },

    $$strict: true,
};

exports.validateCreateItem = v.compile(exports.createItemSchema);
exports.validateUpdateItem = v.compile(exports.updateItemSchema);

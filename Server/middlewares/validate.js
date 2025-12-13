module.exports = (validator) => {
    return (req, res, next) => {
        const result = validator(req.body);

        if (result !== true) {
            return res.status(400).json({
                message: "Validation error",
                errors: result,
            });
        }

        next();
    };
};

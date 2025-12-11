const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const configSwagger = (app) => {
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition: {
            openapi: "3.0.1",
            info: {
                title: "BelaadCafe",
                description:
                    "coffee project with nodejs + express.js + MongoDB",
                version: "1.0.0",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
        },
        apis: ["./routes/*.js", "./app.js"],
    });

    const swagger = swaggerUi.setup(swaggerDocument, {});
    app.use("/api-docs", swaggerUi.serve, swagger);
};

module.exports = configSwagger;

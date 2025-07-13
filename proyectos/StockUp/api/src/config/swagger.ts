import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        tags: [
            {
                name: "Products",
                description: "API operations related to products"
            },
        ],
        info: {
            title: "REST API Node.js / Express / TypeScript",
            version: "1.0",
            description: "API doc for Products"
        }
    },
    apis: [
        './src/router.ts'
    ]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUIOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url('/logo.png');
            height: 200;
            width: 200    
        }
    `
}
export default swaggerSpec
export {swaggerUIOptions}
import { CorsOptions } from "cors"

export const corsConfig : CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [
            process.env.FRONTEND_URL,
        ]

        // Permitir solicitudes sin 'origin' (como Thunder Client o Postman)
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}
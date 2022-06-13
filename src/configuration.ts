import { registerAs } from "@nestjs/config";

export default registerAs('configuration', () => ({
    mongo: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        connection: process.env.CONNECTION,
        dbName: process.env.DB_NAME
    },
    auth: {
        roles: process.env.API_ROLES
    }

}));
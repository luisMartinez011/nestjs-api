import { registerAs } from "@nestjs/config";

export default registerAs('configuration',  () => ({
    mongo: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.HOST,
        port: process.env.PORT,
        connection: process.env.CONNECTION
    }
    
  }));
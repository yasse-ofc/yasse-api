import router from './routes.js';
import express from 'express';
import * as dotenv from 'dotenv';
import { db, connectToDatabase } from './connect_db.js';

dotenv.config();

const FALLBACK_PORT = 3000;
const DEFAULT_PORT = process.env.API_PORT;

connectToDatabase()
    .then(() => {
        const app = express();

        app.use('/', router);

        const server = app.listen(DEFAULT_PORT || FALLBACK_PORT, () => {
            console.log(`Listening on port ${DEFAULT_PORT || FALLBACK_PORT}`);
        });

        process.on('exit', async () => {
            db.client?.close();
            server.close(() => {
                console.log('API closed');
            });
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed', err);
        process.exit();
    });

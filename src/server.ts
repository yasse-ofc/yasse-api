import router from './routes.js';
import express from 'express';
import { db, connectToDatabase } from './connect_db.js';

const PORT = 3000;

connectToDatabase()
    .then(() => {
        const app = express();

        app.use('/', router);

        const server = app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });

        process.on('exit', async () => {
            db.client.close();
            server.close(() => {
                console.log('API closed');
            });
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed', err);
        process.exit();
    });

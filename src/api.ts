import express from 'express';
import router from './routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

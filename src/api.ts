import { searchDB } from './search_db.js';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/anime', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter ?? false;

    res.send(await searchDB(title.toString(), 'anime', !!orderByLatestChapter));
});

app.get('/manga', async (req, res) => {
    const title = req.query.title;
    const orderByLatestChapter = req.query.orderByLatestChapter;

    res.send(await searchDB(title.toString(), 'manga', !!orderByLatestChapter));
});

app.get('/webtoon', async (req, res) => {
    const title = req.query.title;
    const orderByLatestChapter = req.query.orderByLatestChapter;

    res.send(
        await searchDB(title.toString(), 'webtoon', !!orderByLatestChapter)
    );
});

app.get('/novel', async (req, res) => {
    const title = req.query.title;
    const orderByLatestChapter = req.query.orderByLatestChapter;

    res.send(await searchDB(title.toString(), 'novel', !!orderByLatestChapter));
});

export default app;

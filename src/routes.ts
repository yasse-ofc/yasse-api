import express from 'express';
import cors from 'cors';
import { searchDB } from './search_db.js';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes by series type

router.get('/anime', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter ?? false;

    res.send(await searchDB(title.toString(), 'anime', !!orderByLatestChapter));
});

router.get('/manga', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    res.send(await searchDB(title.toString(), 'manga', !!orderByLatestChapter));
});

router.get('/webtoon', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    res.send(
        await searchDB(title.toString(), 'webtoon', !!orderByLatestChapter)
    );
});

router.get('/novel', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    res.send(await searchDB(title.toString(), 'novel', !!orderByLatestChapter));
});

// Error Handling

router.use((_req, res, _next) => {
    res.status(400);
    res.send({
        status: res.statusCode,
        message: 'Please check for any errors in your request!',
    });
});

export default router;

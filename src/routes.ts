import express from 'express';
import { searchDB } from './search_db';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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

export default router;

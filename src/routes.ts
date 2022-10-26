import express from 'express';
import cors from 'cors';
import { searchDB } from './search_db.js';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/anime', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter ?? false;

    try {
        const result = await searchDB(title.toString(), 'anime', !!orderByLatestChapter);
        if (result && result.length > 0) {
            return res.status(200).send(result);
        } else if (result && result.length === 0) {
            return res.status(404).send('Not found');
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
});

router.get('/manga', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    try {
        const result = await searchDB(title.toString(), 'manga', !!orderByLatestChapter);
        if (result && result.length > 0) {
            return res.status(200).send(result);
        } else if (result && result.length === 0) {
            return res.status(404).send('Not found');
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
});

router.get('/webtoon', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    try {
        const result = await searchDB(title.toString(), 'webtoon', !!orderByLatestChapter);
        if (result && result.length > 0) {
            return res.status(200).send(result);
        } else if (result && result.length === 0) {
            return res.status(404).send('Not found');
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
});

router.get('/novel', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    try {
        const result = await searchDB(title.toString(), 'novel', !!orderByLatestChapter);
        if (result && result.length > 0) {
            return res.status(200).send(result);
        } else if (result && result.length === 0) {
            return res.status(404).send('Not found');
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
});

export default router;

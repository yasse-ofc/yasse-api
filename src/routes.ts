import express from 'express';
import cors from 'cors';
import { searchDB } from './search_db.js';

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const errorHandler = async (req, res) => {
    try {
        const result = await req();
        if (result) {
            return res.status(200).send(result);
        } else {
            return res.status(404).send('Not found');
        }
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

router.get('/anime', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter ?? false;

    errorHandler(searchDB(title.toString(), 'anime', !!orderByLatestChapter), res);
});

router.get('/manga', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    errorHandler(searchDB(title.toString(), 'manga', !!orderByLatestChapter), res);
});

router.get('/webtoon', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    errorHandler(
        searchDB(title.toString(), 'webtoon', !!orderByLatestChapter), res
    );
});

router.get('/novel', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    errorHandler(searchDB(title.toString(), 'novel', !!orderByLatestChapter), res);
});

export default router;

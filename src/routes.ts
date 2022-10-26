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

    await tryToGetFromDb(
        title.toString(),
        'anime',
        !!orderByLatestChapter,
        res
    );
});

router.get('/manga', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    await tryToGetFromDb(
        title.toString(),
        'manga',
        !!orderByLatestChapter,
        res
    );
});

router.get('/webtoon', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    await tryToGetFromDb(
        title.toString(),
        'webtoon',
        !!orderByLatestChapter,
        res
    );
});

router.get('/novel', async (req, res) => {
    const title = req.query.title ?? '';
    const orderByLatestChapter = req.query.orderByLatestChapter;

    await tryToGetFromDb(
        title.toString(),
        'novel',
        !!orderByLatestChapter,
        res
    );
});

// Error Handling

/**
 * @param {string} title - Title to search in DB.
 * @param {string} seriesType - Type of series to search for.
 * @param {boolean} orderByLatestChapter -Order result or not.
 * @param res - Response object.
 * @returns response with status code and result
 */
async function tryToGetFromDb(
    title: string,
    seriesType: string,
    orderByLatestChapter: boolean,
    res
) {
    try {
        const result = await searchDB(title, seriesType, orderByLatestChapter);

        if (result && result.length > 0) return res.status(200).send(result);
        return res.status(404).send({
            status: res.statusCode,
            message: '[NOT FOUND] Please check for any typos in your request!',
        });
    } catch {
        return res.status(500).send({
            status: res.statusCode,
            message:
                '[INTERNAL SERVER ERROR] Please try again (if this persists, report this issue)!',
        });
    }
}

router.use((_req, res, _next) => {
    res.status(400).send({
        status: res.statusCode,
        message: '[BAD REQUEST] Please check for any errors in your request!',
    });
});

export default router;

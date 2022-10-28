import express from "express";
import cors from "cors";
import { searchDB } from "./search_db.js";
import type { Response } from "express-serve-static-core";

const router = express.Router();

router.use(cors());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Routes by series type

const routes = ["anime", "manga", "webtoon", "novel"];

routes.forEach((route) => {
	router.get(`/${route}`, async (req, res) => {
		const title: string = req.query.title?.toString() ?? "";
		const orderByLatestChapter: boolean = !req.query.orderByLatestChapter;
		const source: string = req.query.source?.toString() ?? "";

		await tryToGetFromDb(title, route, !orderByLatestChapter, source, res);
	});
});

// Error Handling

/**
 * @param {string} title - Title to search in DB.
 * @param {string} seriesType - Type of series to search for.
 * @param {boolean} orderByLatestChapter -Order result or not.
 * @param res - Response object.
 * @returns response with status code and message or result.
 */
async function tryToGetFromDb(
	title: string,
	seriesType: string,
	orderByLatestChapter: boolean,
	source: string,
	res: Response<any, Record<string, any>, number>,
) {
	try {
		const result = await searchDB(
			title,
			seriesType,
			orderByLatestChapter,
			source,
		);

		if (result && result.length > 0) {
			return res.status(200).send(result);
		}

		return res.status(404).send({
			status: res.statusCode,
			message: "[NOT FOUND] Please check for any typos in your request!",
		});
	} catch {
		return res.status(500).send({
			status: res.statusCode,
			message:
				"[INTERNAL SERVER ERROR] Please try again (if this persists, report this issue)!",
		});
	}
}

router.use((_req, res, _next) => {
	res.status(400).send({
		status: res.statusCode,
		message: "[BAD REQUEST] Please check for any errors in your request!",
	});
});

export default router;

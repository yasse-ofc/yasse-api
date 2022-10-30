import cors from "cors";
import express from "express";
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
		const sort: string = req.query.sort?.toString() ?? "";
		const source: string = req.query.source?.toString() ?? "";
		const random: boolean = !req.query.random;

		await tryToGetFromDb(
			title,
			route,
			sort,
			source,
			!random,
			res,
		);
	});
});

// Error Handling

/**
 * @param {string} title - Title to search in DB.
 * @param {string} seriesType - Type of series to search for.
 * @param {string} sort -Sort results by chapter or name.
 * @param {string} source - Search in specific source.
 * @param {boolean} random - Randomize result or not.
 * @param res - Response object.
 * @returns response with status code and message or result.
 */
async function tryToGetFromDb(
	title: string,
	seriesType: string,
	sort: string,
	source: string,
	random: boolean,
	res: Response<any, Record<string, any>, number>,
) {
	try {
		const result = await searchDB(
			title,
			seriesType,
			sort,
			source,
			random,
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

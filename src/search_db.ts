import { db } from "./connect_db.js";

/**
 * Creates ideal string to make regex search in MongoDB.
 * @param {string} searchTerm - String to be formatted.
 * @return {string} Formatted string.
 */
function formatSearch(searchTerm: string): string {
	if (typeof searchTerm !== "string") {
		throw new Error("Search term must be a string.");
	}

	return searchTerm.split("").join(".*");
}

/**
 * Searches for title in collectionToSearch.
 * @param {string} title - Term to be searched.
 * @param {string} collectionToSearch - Collection to search.
 * @param {string} sort - Sort results by chapter or name.
 * @param {string} source - Search in specific source.
 * @param {boolean} random - Randomize result or not.
 * @return List of JSON document with search results.
 */
async function searchDB(
	title: string,
	collectionToSearch: string,
	sort: string,
	source: string,
	random: boolean,
) {
	try {
		const collection = db.db?.collection(collectionToSearch);

		if (!collection) {
			throw new Error("Collection not found.");
		}

		const searchResult = collection.find(
			{
				title: { $regex: `.*${title.toLowerCase()}.*` },
				source: { $regex: `.*${source.toLowerCase()}.*` },
			},
			{ projection: { _id: 0 } },
		);

		let result;

		if (random) {
			result = await searchResult.toArray();
			result = [result[Math.floor(Math.random() * result.length)]];
		}

		// Sorting in descending order
		else if (sort === ">chapter") {
			result = await searchResult.sort({ latestChapter: -1 }).toArray();
		}

		// Sorting in ascending order
		else if (sort === "<chapter") {
			result = await searchResult.sort({ latestChapter: 1 }).toArray();
		}

		// Sorting from Z to A
		else if (sort === ">name") {
			result = await searchResult.sort({ title: -1 }).toArray();
		}

		// Sorting from A to Z
		else if (sort === "<name") {
			result = await searchResult.sort({ title: 1 }).toArray();
		}

		// No sorting nor random
		else {
			result = await searchResult.toArray();
		}

		return result;
	} catch (error) {
		console.error(error);
	}
}

export { formatSearch, searchDB };

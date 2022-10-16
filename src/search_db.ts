require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_LINK ?? "";
const dbName = "yasse";

/**
 * Creates ideal string to make regex search in MongoDB.
 * @param {string} searchTerm - String to be formatted.
 * @return {string} Formatted string.
 */
export function formatSearch(searchTerm: string): string {
  if (typeof searchTerm !== "string") {
    throw new Error("Search term must be a string.");
  }

  return searchTerm.split("").join(".*");
}

/**
 * Searches for title in collectionToSearch.
 * @param {string} title - Term to be searched.
 * @param {string} collectionToSearch - Collection to search.
 * @param {boolean} [orderByLatestChapter] - Order search or not.
 * @return List of JSON document with search results.
 */
export async function searchDB(
  title: "anime" | "manga" | "webtoon" | "novel",
  collectionToSearch: string,
  orderByLatestChapter?: boolean
) {
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionToSearch);

    if (!collection) {
      throw new Error("Collection not found.");
    }

    const searchResult = await collection.find(
      { title: { $regex: `.*${title.toLowerCase()}.*` } },
      { projection: { _id: 0 } }
    );

    const result = orderByLatestChapter
      ? searchResult.sort({ latestChapter: -1 }).toArray()
      : searchResult.toArray();

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
}

module.exports = { formatSearch, searchDB };

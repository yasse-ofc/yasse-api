import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const url = process.env.MONGODB_LINK ?? '';
const dbName = 'yasse';

/**
 * Creates ideal string to make regex search in MongoDB.
 * @param {string} searchTerm - String to be formatted.
 * @return {string} Formatted string.
 */
function formatSearch(searchTerm: string): string {
    if (typeof searchTerm !== 'string') {
        throw new Error('Search term must be a string.');
    }

    return searchTerm.split('').join('.*');
}

/**
 * Searches for title in collectionToSearch.
 * @param {string} title - Term to be searched.
 * @param {string} collectionToSearch - Collection to search.
 * @param {boolean} [orderByLatestChapter] - Order search or not.
 * @return List of JSON document with search results.
 */
async function searchDB(
    title: string,
    collectionToSearch: 'anime' | 'manga' | 'webtoon' | 'novel',
    orderByLatestChapter?: boolean
) {
    let client: MongoClient;
    try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(collectionToSearch);

        if (!collection) {
            throw new Error('Collection not found.');
        }

        const searchResult = collection.find(
            { title: { $regex: `.*${title.toLowerCase()}.*` } },
            { projection: { _id: 0 } }
        );

        const result = orderByLatestChapter
            ? await searchResult.sort({ latestChapter: -1 }).toArray()
            : await searchResult.toArray();

        return result;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

export { formatSearch, searchDB };

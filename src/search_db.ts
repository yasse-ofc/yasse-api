require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_LINK ?? '';
const dbName = 'yasse';

/**
* Creates ideal string to make regex search in MongoDB.
* @param {string} searchTerm - String to be formatted.
* @return {string} Formatted string.
*/
export function formatSearch( searchTerm: string ): string {
    const formattedSearch: string = searchTerm.split( '' ).join( '.*' );

    return formattedSearch;
}

/**
* Searches for title in collectionToSearch.
* @param {string} title - Term to be searched.
* @param {boolean} orderByLatestChapter - Order search or not.
* @param {string} collectionToSearch - Collection to search.
* @return List of JSON document with search results.
*/
export async function searchDB( title: string, collectionToSearch: string, orderByLatestChapter?: boolean ) {
    const client = await MongoClient.connect( url );
    const db = client.db( dbName );
    const collection = db.collection( collectionToSearch );
    
    const result_search = await collection.find(
        { 'title': { $regex: `.*${ title.toLowerCase() }.*` } },
        { projection: { _id: 0 } }
    );
    
    const result = orderByLatestChapter ?
        await result_search.sort({ latestChapter: -1 }).toArray() :
        await result_search.toArray();

    await client.close();
    
    return result;
}

module.exports = { formatSearch, searchDB };
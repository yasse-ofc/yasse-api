require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_LINK ?? '';
const dbName = 'yasse';

/** 
* Creates ideal string to make regex search in MongoDB.
* @param {string} searchTerm - String to be formatted.
* @return {string} Formatted string.
*/
function formatSearch( searchTerm: string ): string {
    const formattedSearch: string = searchTerm.split( '' ).join( '.*' );

    return formattedSearch;
}

/** 
* Searches for title in collectionToSearch.
* @param {string} title - Term to be searched.
* @param {string} collectionToSearch - Collection to search.
* @return List of JSON document with search results.
*/
export async function searchDB( title: string, collectionToSearch: string ) {
    const client = await MongoClient.connect( url );
    const db = client.db( dbName );
    const collection = db.collection( collectionToSearch );
    
    const result = await collection.find(
        { 'title': { $regex: `.*${ title.toLowerCase() }.*` } },
        { projection: { _id: 0 } }
    ).toArray();
    
    await client.close();
    
    return result;
}
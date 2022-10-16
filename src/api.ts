const express = require('express');
const { searchDB } = require('./search_db');

export const app = express();

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get( '/anime', async ( req, res ) => {
    const title = req.query.title;
    const orderByLatestChapter = req.query.orderByLatestChapter;

    orderByLatestChapter ?
        res.send( await searchDB( title.toString(), 'anime', true ) ) :
        res.send( await searchDB( title.toString(), 'anime' ) );
});

app.get( '/manga', async ( req, res ) => {
    const title = req.query.title;
    const orderByLatestChapter = req.query.orderByLatestChapter;
    
    orderByLatestChapter ?
        res.send( await searchDB( title.toString(), 'manga', true ) ) :
        res.send( await searchDB( title.toString(), 'manga' ) );
});

app.get( '/webtoon', async ( req, res ) => {
    const title = req.query.title;
    const orderByLatestChapter = req.query.orderByLatestChapter;
    
    orderByLatestChapter ?
        res.send( await searchDB( title.toString(), 'webtoon', true ) ) :
        res.send( await searchDB( title.toString(), 'webtoon' ) );
});

app.get( '/novel', async ( req, res ) => {
    const title = req.query.title;
    const orderByLatestChapter = req.query.orderByLatestChapter;
    
    orderByLatestChapter ?
        res.send( await searchDB( title.toString(), 'novel', true ) ) :
        res.send( await searchDB( title.toString(), 'novel' ) );
});

module.exports = { app };

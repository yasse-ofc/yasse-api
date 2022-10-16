const express = require('express');
const { searchDB } =  require('./search_db');

export const app = express();
const PORT = 3000;

app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );

app.get( '/anime', async (req, res) => {
    const title = req.query.title;
    res.send( await searchDB( title.toString(), 'anime' ));
});

app.get( '/manga', async (req, res) => {
    const title = req.query.title;
    res.send( await searchDB( title.toString(), 'manga' ));
});

app.get( '/webtoon', async (req, res) => {
    const title = req.query.title;
    res.send( await searchDB( title.toString(), 'webtoon' ));
});

app.get( '/novel', async (req, res) => {
    const title = req.query.title;
    res.send( await searchDB( title.toString(), 'novel' ));
});

app.listen( PORT );

module.exports = { app };
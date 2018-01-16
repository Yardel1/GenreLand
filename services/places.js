require('isomorphic-fetch');
require('dotenv').config();
const axios = require('axios');

const getPlaces = async (req, res, next) => {
    //google places configuration
    const places = {}
    places.type = 'bar';
    places.searchRadius = 1000;
    places.searchQuery = req.body.zipcode
    try {
        const searchResults = await axios(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${places.searchQuery}&type=${places.type}&radius=${places.searchRadius}&&key=${process.env.GOOGLE_PLACES_API}`)
        const venues = [
            searchResults.data.results[0].name,
            searchResults.data.results[1].name,
            searchResults.data.results[2].name,
            searchResults.data.results[3].name,
            searchResults.data.results[4].name,
        ]
        console.log('====>', venues)
        res.locals.venues = venues;
        next();
    }
    catch (err) { console.log(err) };
}

module.exports = {getPlaces};

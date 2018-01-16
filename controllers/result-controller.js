const Music2locations = require('../models/music2location')
const Location = require('../models/location')

const resultsController = {};

resultsController.queryResults = async (req, res) => {
    console.log('queryResults(results-Controller)');
    try {
        const results = await Music2locations.results(res.locals.allZips);
        console.log(results, 'this was the results controller');
        res.json({ message: 'ok', data: results, events: res.locals.events });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'page not found', error });
    }
}

resultsController.insertLocation = async (req, res, next) => {
    console.log('insertLocation reached');
    console.log(req.body)
    try {
        const data = await Location.insert(req.body.zipcode, req.body.description);
        res.locals.id = data.id;
        next();
    }
    catch (err) { console.log(err) };
}

resultsController.insertMusic2Location = async (req, res, next) => {
    console.log('music2locations reached');
    const data = {genre_id: req.body.genre,location_id: res.locals.id,user_id: req.body.id}
    try {
        await Music2locations.insert(data);
        next();
    }
    catch (err) { console.log(err) };
}

module.exports = resultsController;
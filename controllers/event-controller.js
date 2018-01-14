const Events2user = require('../models/events2user');
const Location = require('../models/location');
const Events = require('../models/events');

const eventController = {};

eventController.EventsByZips = async (req, res, next) => {
    try {
        const rez = await Events.FindByZips(res.locals.allZips)
        res.locals.events = rez
        next()
    } catch (err) { console.log(err) };
}

eventController.findAll = async (req, res) => {
    try {
        const rez = await Events.findAll();
        res.json({ message: 'show all events', data: rez });
    }
    catch (error) { res.status(500).json({ message: 'all events page not found', error }) };
}

eventController.findOne = async (req, res) => {
    try {
        const rez = await Events.findById(req.body.id)
        res.json({ message: 'show one event', data: rez })
    }
    catch (err) { console.log(err) };
}

eventController.create = async (req, res) => {
    try {
        const rez = Events.create(req.body.info);
        res.json({ message: "event created", data: rez })
    }
    catch (err) { console.log(err) };
}

eventController.kill = async (req, res) => {
    try {
        await Events.destroy(req.body.id);
        res.end();
    }
    catch (err) { console.log(err) };
}

eventController.update = async (req, res) => {
    try {
        const rez = await Events.update({
            title: req.body.title,
            address: req.body.address,
            event_date: req.body.date,
            event_time: req.body.time,
            genre: req.body.genre,
            description: req.body.description,
            createdby: req.body.user,
            zip_code: req.body.zip_code
        });
        res.json({ message: 'edit event', data: rez });
    }
    catch (err) { console.log(err) };
}

module.exports = eventController;
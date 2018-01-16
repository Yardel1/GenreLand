const Events = require('../models/events');
const Events2user = require('../models/events2user');

const profileController = {};

profileController.findUsersEvents = async (req, res) => {
    console.log('profileController.findUsersEvents');
    // console.log(req.body.data.id)
    // console.log(req.body.id)
    try {
    const rez = await Events.findUserCreatedEvents(req.body.id);
    res.json({ message: 'ok', data: rez, eventsAttending: res.locals.eventsAttending });
    } catch (err) { console.log(err) };
};

profileController.findUsersAttendEvents = async (req, res, next) => {
    console.log('first controller');
    try {
        const rez = await Events2user.findAllUsersAttendingEvents(req.body.id);
        res.locals.eventsAttending = rez;
        next();
    }
    catch (err) { console.log(err) };
};

module.exports = profileController;

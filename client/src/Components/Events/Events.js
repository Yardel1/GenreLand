import React, { Component } from 'react';
//connecting to react routes
import { Link } from 'react-router-dom';

const Events = ({ event }) => {
    console.log('Events.js', event);
    return (
        <div className="eventshowlist"> 
            <h4>{event.title}</h4>
            <h5>{event.address}</h5>
            <p>{event.date}</p>
        <Link to={`/show/${event.id}`}>More Info</Link>
        </div>
    );
};

export default Events;

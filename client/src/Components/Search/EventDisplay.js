import React from 'react';

const EventDisplay = (props) => {
  const { areaName, eventList, userLocation } = props
  return (
      <div className="EventResults">
        <h1 className={userLocation?"markzipcode":''}>{areaName}</h1>
        <ul>
          {eventList.map( (event,index) => {
            return (
              <li className={"list-group-item " + !(userLocation)?"markGenre":''} key = {String(event.title)+String(index)}>
                {event.title}<br />
                Details: {event.description}<br />
                Venue: {event.address}<br />
                Date: {event.eventDate}<br />
                Time: {event.eventTime}<br />
                Total Attending: {event.count}
              </li>
            )
          })}
        </ul>
      </div>
  ) 
}

export default EventDisplay;
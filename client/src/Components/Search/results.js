import React, { Component } from 'react';
import GenreDisplay from './GenreDisplay';
import EventDisplay from './EventDisplay';
import MapDisplay from './MapDisplay';
import { Link } from 'react-router-dom';

class Results extends Component {
  state = { events: false };

  displayAreasMap = (results, usersChoices) => <MapDisplay usersZipcode={usersChoices.location} results={results} />; //TBA

  DisplayAreaEvents = (results, usersChoices) => {
    const zipcodes = Object.getOwnPropertyNames(results);
    if (zipcodes.length === 0)
      return (
        <h2>
          No Events yet. <br />Perhaps an opportunity...
        </h2>
      );
    return zipcodes.map((zipcode, index) => {
      const key = String(zipcode) + String(' number ' + index);

      /* 
      we will use this code later to sort Events display by the # of participants
      
      const occurrenceValue = (a,b) => results[zipcode][b]-results[zipcode][a]
      const genres = unsortedGenres.sort(occurrenceValue) 
      */
      //iterate over events for a given zipcode
      return <EventDisplay key={key} areaName={zipcode} eventList={results[zipcode]} userLocation={String(usersChoices.location) === zipcode ? true : false} />;
    });
  };

  AreaGenreDisplay = (results, usersChoices) => {
    console.log('AreaGenreDisplay(results)', usersChoices);
    let zipcodes = Object.getOwnPropertyNames(results);
    return zipcodes.map((zipcode, index) => {
      const key = String(zipcode) + String(' number ' + index);
      const unsortedGenres = Object.getOwnPropertyNames(results[zipcode]);
      const occurrenceValue = (a, b) => results[zipcode][b] - results[zipcode][a];
      const genres = unsortedGenres.sort(occurrenceValue);
      const genreOccurences = genres.map(genre => results[zipcode][genre]);
      return <GenreDisplay key={key} areaName={zipcode} genreOccurences={genreOccurences} genresList={genres} selectedGenre={Number(usersChoices.music)} usersLocation={String(usersChoices.location) === zipcode ? true : false} />;
    });
  };
  eventsView = () => {
    if (this.state.events) return this.setState({ events: false });
    return this.setState({ events: true }); //this will link the user to events component. That's also where the user can see local bars
  };
  sort = data => {
    let results = {};
    data.map(number => {
      if (!results[number.zipcode]) return (results[number.zipcode] = { [number.genre]: 1 });
      else if (!results[number.zipcode][number.genre]) return (results[number.zipcode][number.genre] = 1);
      else return results[number.zipcode][number.genre]++;
    });
    return results;
  };

  eventSort = data => {
    console.log('EventSort(results), before sort', data);
    let events = {};
    data.map(number => {
      if (!events[number.zip_code]) events[number.zip_code] = [];
      events[number.zip_code].push({
        title: number.title,
        description: number.description,
        address: number.address,
        createdBy: number.createdby,
        eventDate: number.event_date,
        eventTime: number.event_time,
        count: number.count,
      });
    });

    console.log('EventSort(results), sorted', events);
    return events;
  };
  resultsParser = (results, usersChoices) => {
    console.log('resultsParser(results):', this.state);
    if (results.message !== 'ok') return <div>Try a different zipcode.</div>;
    const eventList = this.eventSort(results.events);
    results = this.sort(results.data);
    return (
      <div className="result-box">
        <h5><Link to={`/Events/Form`}>Post an Event! </Link></h5>
        <button onClick={this.eventsView}>{this.state.events ? 'Genres List' : 'Local Scene'}</button>
        {this.state.events ? this.DisplayAreaEvents(eventList, usersChoices) : this.AreaGenreDisplay(results, usersChoices)}
        {/* {this.displayAreasMap(results, usersChoices)} */}
      </div>
    );
  };
  renderLoading = () => <h2>Searching your area...</h2>;
  
  checkResults = () => {
    const { location, music, waiting, results } = this.props.state;
    let usersChoices = {};
    usersChoices = { location, music };
    if (!results && !waiting) return '';
    if (waiting) return this.renderLoading();
    return this.resultsParser(results, usersChoices);
  };
  render = () => <div>{this.checkResults()}</div>;
}

export default Results;

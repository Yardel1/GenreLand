import React from 'react';

const GenreDisplay = props => {
  console.log('GenreDisplay file');
  const { areaName, genresList, genreOccurences, selectedGenre, usersLocation } = props;
  const genreList = ["That can't be right", 'Rock', 'Alternative', 'RnB', 'Hip Hop', 'Pop', 'Country', 'EDM', 'Christian/Gospel', 'Seasonal', 'Jazz', 'Classical', 'Heavy Metal', 'Blues', 'Oldies', 'Folk', 'Soul', 'Punk Rock', 'Grunge', 'Raggae', 'Industrial', 'Opera', 'Bluegrass', 'Disco'];
  const usersGenre = genreList[selectedGenre];
  return (
    <div className="GenreResults">
      <h1 className={usersLocation ? 'markzipcode' : ''}> {areaName} </h1>
      <ul>
        {genresList.map((genre, index) => {
          let genreUsers = genreOccurences[index];
          return (
            <li
              className={`list-group-item ${genreUsers} ` + !(usersGenre > genre || usersGenre < genre) ? 'markGenre' : ''}
              key={String(genre) + String(index)}
            >
              {genre + ' ' + genreUsers}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenreDisplay;

class SearchParameters {
  constructor({ location, music }, id = '0') {
    this.zipcode = location;
    this.genre = Number(music);
    this.description = ' ';
    this.id = id;
  }
};
module.exports = SearchParameters;

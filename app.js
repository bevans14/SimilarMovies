// need to get all movie data
// need to get all similar movie data
// need to display results

const request = require('request')
const apiKey = '6a012ff350bc1bd4a28e7ef0173d15ef'

const movieData = (title, callback) => {
    const url = 'https://api.themoviedb.org/3/search/movie?query=' + title + '&api_key=' + apiKey;

    request({ url: url, json: true }, (error, response, body) => {
        if (error) {
            callback('Cannot connect to server');
        } else {
            const results = body.results;
            if (results && results.length > 0) {
                callback(undefined, {
                    movieId: results[0].id
                });
            } else {
                callback('No movie found with that title.');
            }
        }
    });
};


const similarMovie = (id, callback) => {

    const url = 'https://api.themoviedb.org/3/movie/' + id + '/similar?api_key=' + apiKey;


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Error fetching data', undefined)
        } else {
            const results = response.body.results;
                callback(undefined, results)
            }
        }
    )}


  function movieSearch(movieName) {
    movieData(movieName, (err, res) => {
        if (err) {
            console.error('Error', err)
        } else {
            similarMovie(res.movieId, (err, result) => {
                if (err) {
                    console.error('Error', err)
                } else {
                    console.log('Results:')
                    displayMovies(result)
                }
            })
        }
    })
  }


function displayMovies(similarMovies) {
    similarMovies.forEach(movie => {
        console.log('MOVIE TITLE:', movie.title);
        console.log('MOVIE DESCRIPTION:', movie.overview);
        console.log('*********************************')
    })
  }

  const search = process.argv.slice(2).join(' ');
  console.log('Movie:', search);
  movieSearch(search);

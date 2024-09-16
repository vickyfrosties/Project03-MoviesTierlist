const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);


app.listen(8000, function() {
    console.log('Server is running and listening on port 8000');
   });

app.use("/", express.static(__dirname + "/htdocs"));
app.use(express.urlencoded({extended:false}));


app.get('/movies', function(request, response) {
    findAllMovies().then(function(movies){
        response.setHeader('Content-Type', 'application/json');
        response.send(movies);
    });
});

app.get('/movie/:id', function(request, response) {
    findMovieFromId(request.params.id).then(function(movie){
        response.setHeader('Content-Type', 'application/json');
        response.send(movie);
    });
});


app.delete('/movie/:id', function(request, response) {
    deleteMovieFromId(request.params.id).then(function(){
        response.setHeader('Content-Type', 'application/json');
        response.send("Movie deleted");
    });
});

app.post('/movies', function(request, response) {
    addMovie(request.body).then(function(){
        response.setHeader('Content-Type', 'application/json');
        response.send("Movie created");
    });
});

async function addMovie(body) {
    let newMovie = {
        Series_Title: body.Series_Title,
        Released_Year: body.Released_Year,
        Genre: body.Genre,
        Director: body.Director,
        Poster_Link: body.Poster_Link,
        Star1: body.Star1,
        IMDB_Rating: body.IMDB_Rating,
        Runtime: body.Runtime,
        Gross: body.Gross
    }

    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const result = await movieCollection.insertOne(newMovie);
    }
    catch (error) { console.error(error); }
}

async function findMovieFromId(movieId) {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const options = {
            projection: { },
            };
        const query = {_id : new ObjectId(movieId)}; 
        const movie = await movieCollection.find(query, options).toArray();
        return movie[0];
    }
    catch (error) { console.error(error); }
   }


async function findAllMovies() {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("imdb");
        const movieCollection = imdbDatabase.collection("movies");
        const movies = await movieCollection.find().toArray();
        return movies;
    }
    catch (error) { console.error(error); }
   }

async function deleteMovieFromId(movieId) {
try {
    await mongoClient.connect();
    const imdbDatabase = mongoClient.db("imdb");
    const movieCollection = imdbDatabase.collection("movies");
    const query = {_id : new ObjectId(movieId)};
    const response = await movieCollection.deleteOne(query);
}
catch (error) { console.error(error); }
}
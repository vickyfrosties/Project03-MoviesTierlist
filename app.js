const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const {ObjectId} = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';
const mongoClient = new MongoClient(url);


app.listen(8000, function() {
    console.log('Server is running and listening on port 8000');
   });

   // pour dire dans quel répertoire se trouvent les fichiers à lire
app.use("/", express.static(__dirname + "/htdocs"));


// pour le test : http://localhost:8000/movies
app.get('/movies', function(request, response) {
    findAllMovies().then(function(movies){
        response.setHeader('Content-Type', 'application/json');
        response.send(movies);
    });
});

// pour le test : http://localhost:8000/movie/66e045c78482ccc436c7316e
app.get('/movie/:id', function(request, response) {
    findMovieFromId(request.params.id).then(function(movie){
        response.setHeader('Content-Type', 'application/json');
        response.send(movie);
    });
});

// traitement de la route DELETE /movie/id (D de DELETE dans CRUD)
// pour le test : http://localhost:8000/movie/66e045c78482ccc436c7316e
app.delete('/movie/:id', function(request, response) {
    deleteMovieFromId(request.params.id).then(function(){
        response.setHeader('Content-Type', 'application/json');
        response.send("Object deleted");
    });
});

async function findMovieFromId(movieId) {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("IMDB");
        const movieCollection = imdbDatabase.collection("movies");
        const options = {
            projection: { },  // projection : on garde tout
            };
        const query = {_id : new ObjectId(movieId)};    // requête de sélection
        const movie = await movieCollection.find(query, options).toArray();
        return movie[0];
    }
    catch (error) { console.error(error); }
   }


async function findAllMovies() {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("IMDB");
        const movieCollection = imdbDatabase.collection("movies");
        const movies = await movieCollection.find().toArray();
        return movies;
    }
    catch (error) { console.error(error); }
   }

   async function deleteMovieFromId(movieId) {
    try {
        await mongoClient.connect();
        const imdbDatabase = mongoClient.db("IMDB");
        const movieCollection = imdbDatabase.collection("movies");
        const query = {_id : new ObjectId(movieId)};    // requête de sélection
        const movie = await movieCollection.deleteOne(query);
    }
    catch (error) { console.error(error); }
   }
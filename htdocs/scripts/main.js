
const MOVIES_CONTAINER = document.getElementById("left-container");
const VIGNETTE = document.getElementById("vignette");


fetch('http://127.0.0.1:8000/movies')
// ici je prends la réponse je transforme en json
    .then(function (response) {
        return response.json();
    })

    // je prends la réponse et les datas que je lance dnas la console. je rename data en movies et je prends seulement le premier film avec son titre maintenant faire une boucle. 
    .then(function(movies) {
        for(const movie of movies) {
            const TITLE_MOVIE = document.createElement("h2");
            TITLE_MOVIE.textContent = movie.Series_Title;
            MOVIES_CONTAINER.append(TITLE_MOVIE);
            const A_LINK_MOVIE = document.createElement("a");
            TITLE_MOVIE.appendChild(A_LINK_MOVIE);
            TITLE_MOVIE.classList.add("title-movie");

            TITLE_MOVIE.addEventListener("click", () => {
                const IMG = document.getElementById("affiche");
                const TITRE = document.getElementById("titre");
                const REAL = document.getElementById("real");
                const YEAR = document.getElementById("year");
                const TIMING = document.getElementById("timing");
                const CASTING = document.getElementById("casting");
                const SYNOPSIS = document.getElementById("synopsis");

                IMG.src = movie.Poster_Link;
                TITRE.textContent = movie.Series_Title;
                REAL.textContent = movie.Director;
                YEAR.textContent = movie.Released_Year;
                TIMING.textContent = movie.Runtime;
                CASTING.textContent = movie.Star1 + "," + movie.Star2 + "," + movie.Star3 + "," + movie.Star4;
                SYNOPSIS.textContent = movie.Overview;

            })

            const DELETE_BTN = document.getElementById("delete");
            DELETE_BTN.addEventListener("click", () => {
                fetch('http://127.0.0.1:8000/movie/' + idMovie, {method: "DELETE"})
                    .then(function(response) {
                        location.reload();
                        console.log("film deleted")
                    })
        
                    .catch(function (err) {
                        console.log("Something went wrong!", err);
                        });
            })

        }
    })

    .catch(function (err) {
        console.log("Something went wrong!", err);
    });

function displayMovie(idMovie){
    fetch('http://127.0.0.1:8000/movie/' + idMovie) 
        .then(function (response) {
            return response.json();
        })

        .then(function(movies) {
            console.log(movies); 
        })

        .catch(function (err) {
            console.log("Something went wrong!", err);
            });
    }
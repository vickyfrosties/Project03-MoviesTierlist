const MOVIES_CONTAINER = document.getElementById("left-container");
const VIGNETTE = document.getElementById("vignette");


fetch('http://127.0.0.1:8000/movies')

    .then(function (response) {
        return response.json();
    })

    .then(function(movies) {
        
        const ADD = document.getElementById("add");
        ADD.addEventListener("click", () => {
            window.location.replace("../adding-form.html");
        })
        
        const DELETE_BTN = document.getElementById("delete");
        DELETE_BTN.addEventListener("click", () => {
        fetch('http://127.0.0.1:8000/movie/' + movies._id, {method: "DELETE"})
            .then(function(response) {
                window.location.reload();
            })

            .catch(function (err) {
                console.log("Something went wrong!", err);
            });
        })

        const EDIT = document.getElementById("edit");
        EDIT.addEventListener('click', () => {
            window.location.replace("../edit-form.html");
        })

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
                const GENRE = document.getElementById("genre");
                const TIMING = document.getElementById("timing");
                const CASTING = document.getElementById("casting");
                const SYNOPSIS = document.getElementById("synopsis");

                IMG.src = movie.Poster_Link;
                TITRE.textContent = movie.Series_Title;
                REAL.textContent = movie.Director;
                YEAR.textContent = movie.Released_Year;
                GENRE.textContent = movie.Genre; 
                TIMING.textContent = movie.Runtime;
                CASTING.textContent = movie.Star1 + "," + movie.Star2 + "," + movie.Star3 + "," + movie.Star4;
                SYNOPSIS.textContent = movie.Overview;

                const BUTTONS = document.querySelector(".boutons");
                BUTTONS.style.display = "block";
            })  
        }
    })

    .catch(function (err) {
        console.log("Something went wrong!", err);
    });

function displayMovie(idMovie){
        fetch('http://127.0.0.1:8000/movie/' + movie._id) 
        .then(function (response) {
            return response.json();
        })

        .then(movie => {displayMovie(movie); })
        
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
    }      




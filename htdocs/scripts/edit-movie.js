
fetch('http://127.0.0.1:8000/movie/' + movie._id) 
    .then(function (response) {
        return response.json();
    })

    .then(movie => {
        function displayMovie(movie){
            let elements = document.getElementById("editMovieForm").elements;
            for (let i = 0, element; element = elements[i++];) {
                if(element.type == "text")
                element.value = movie[element.name]
            }
        }
    })
    
    .catch(function (err) {
        console.log("Something went wrong!", err);
        });
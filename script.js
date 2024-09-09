//The API link to connect to movie db
const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=003dab51df20c6c116dcc25e62ce20ce&page=1';
//Source for image thumbnails
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
//API used for querying for movies
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=003dab51df20c6c116dcc25e62ce20ce&query=';

const main = document.getElementById("section");
const form = document.getElementById("search-bar");
const search = document.getElementById("search-text-box");

getMovies(APILINK);
function getMovies(url) {
  //Getting data from the url
  fetch(url).then(res => res.json()).then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
      //creates new elements for the movies searched
      const div_card = document.createElement('div');
      div_card.setAttribute('class', 'card');
      
      const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');
      const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');
      
      const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');
      
      const title = document.createElement('h3');
        title.setAttribute('id', 'title');
      
      const center = document.createElement('center');

      //Sets the movie title in the card
      title.innerHTML = `${element.title}`;
      //sets the image link as the poster path
      image.src = IMG_PATH + element.poster_path;
      //Add the image to the center
      //make image a child of center
      center.appendChild(image);
      center.appendChild(title);
      //Then make center a child of the card
      div_card.appendChild(center);
      div_column.appendChild(div_card);
      div_row.appendChild(div_column);
      //When main (the section) makes div_row a child, it puts the whole thing into the section
      main.appendChild(div_row);
    });
  });
}

form.addEventListener("submit", (e) => {
  //When someone searches for a movie, it will remove the previous searched movies
  e.preventDefault();
  main.innerHTML = '';

  //Gets the typed text from the text box
  const searchItem = search.value;

  //When something is actually searched, it would clear the search box
  if (searchItem) {
    getMovies(SEARCHAPI + searchItem);
    search.value = "";
  }
})

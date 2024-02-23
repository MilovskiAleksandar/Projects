// GET ELEMENTS HTML
const html = {
    cardContainer: document.getElementById("cardContainer"),
    notification: document.getElementById("notification"),
    cardContainer1: document.getElementById("cardContainer1"),
    resultRandom: document.getElementById('result'),
    catchRandom: document.getElementById('catchRandom')
}
//API ENDPOINT
const beerApi = 'https://api.punkapi.com/v2/beers';

//FUNCTIONS
//creating card
function createCard(beer) {
    return `
    <div class="col mb-4 ">
        <div class="card">
            <img class="card-img-top" src="${beer.image_url}" alt="${beer.name} ">
            <div class="card-body">
                <h5 class="card-title">${beer.name}</h5>
                <p class="card-text">${beer.description}</p>
                <button id="${beer.id}" onclick="fetchApiClick(${beer.id})"  class="btn btn-primary">More description</button>
            </div>
        </div>
    </div>`
}

// description for beer
function createDescription(beer) {
    buttonNext.style.display = "none";
    previousButton.style.display = "none";
    return `
        <div class='imgDesc'>
            <img class='img' src='${beer.image_url}' alt='${beer.name}'>
        </div>
        <div class='descriptionAlone'>
            <div class="nameTagline">${beer.name} : ${beer.tagline}</div>
            <br>
            <div class="">${beer.description}</div>
            <br>
            <div class="">Brewed: ${beer.first_brewed}</div>
            <br>
            <div class="">alcohol: ${beer.abv}%</div>
            <br>
            <div class="">bitterness: ${beer.ibu}</div>
            <br>
            <div class="">Food Pairing: ${beer.food_pairing}</div>
        </div>
    
    `
}

//random beer
function getRandomBeer(beer) {
    return `
    <div class='randomImg'>
        <img class='imageForRandomBeer' src='${beer.image_url}' alt='${beer.name}'>
    </div>
    <div class='descriptionRandom'>
        <div class="nameTaglineRandom">${beer.name} : ${beer.tagline}</div>
        <br>
        <div class="">${beer.description}</div>
        <br>
        <div class="">Brewed: ${beer.first_brewed}</div>
        <br>
        <div class="">alcohol: ${beer.abv}%</div>
        <br>
        <div class="">bitterness: ${beer.ibu}</div>
        <br>
        <div class="">Food Pairing: ${beer.food_pairing}</div>
    </div>

`
}

const secondPageContent = document.getElementById('beersPage')
const mainPageContent = document.getElementById('mainPage')
const randomBeerContent = document.getElementById('randomBeerPage')
secondPageContent.style.display = 'none'
randomBeerContent.style.display = 'none'


const firstPage = document.getElementById('firstPage')
firstPage.addEventListener('click', () => {
    mainPageContent.style.display = 'block'
    secondPageContent.style.display = 'none'
    randomBeerContent.style.display = 'none'
    // location.reload()
})

const secondPage = document.getElementById('Beers');
secondPage.addEventListener('click', () => {
    mainPageContent.style.display = 'none'
    randomBeerContent.style.display = 'none'
    html.cardContainer1.innerHTML = ''
    secondPageContent.style.display = 'block'
    showingBeers(beerApi);
})

const randomBeerPage = document.getElementById('RandomBeer');
randomBeerPage.addEventListener('click', () => {
    secondPageContent.style.display = 'none'
    mainPageContent.style.display = 'none'
    html.resultRandom.innerHTML = ''
    randomBeerContent.style.display = 'block'
    fetchRandomBeer(beerApi);
})


//FETCH CALLS
//page and show calls
let numberOfPage = 1;
let perPage = 25;
function showingBeers(beerApi) {
    fetch(`${beerApi}?page=${numberOfPage}&per_page=${perPage}`)
        .then(data => data.json())
        .then(function (result) {
            html.cardContainer.innerHTML = "";
            try {
                for (let beer of result) {
                    html.cardContainer.innerHTML += createCard(beer); //card
                }
            } catch (error) {
                html.notification.innerHTML = `
        <div class="alert alert-danger" role="alert">
            You have entered a wrong beer name, please try again!
        </div>
        `
            }
        })
}

function fetchApiClick(id) {
    fetch(`${beerApi}/${id}`)
        .then(data => data.json())
        .then(function (data) {
            html.cardContainer.innerHTML = "";
            try {
                for (let beer of data) {
                    html.cardContainer1.innerHTML += createDescription(beer);

                }

            } catch (error) {
                html.notification.innerHTML = `
        <div class="alert alert-danger" role="alert">
            You have entered a wrong beer name, please try again!
        </div>
        `
            }
        })
}
//random beer
function fetchRandomBeer(beerApi) {
    fetch(`${beerApi}/random`)
        .then(data => data.json())
        .then(function (result) {
            try {
                for (let beer of result) {
                    html.resultRandom.innerHTML += getRandomBeer(beer);
                }
            }
            catch (error) {
                html.catchRandom.innerHTML = `
                <div> 
                You have entered a wrong beer name, please try again!
                </div>
            `
            }
        })
}

//EVENTS
//next button
let buttonNext = document.getElementById('next');
buttonNext.addEventListener('click', () => {
    numberOfPage++;
    showingBeers(beerApi);
})

//previous button
let previousButton = document.getElementById('previous');
previousButton.addEventListener('click', () => {
    numberOfPage--;
    showingBeers(beerApi);
})

//show 5 dropdown lista
let showFive = document.getElementById('showFive');
showFive.addEventListener('click', () => {
    perPage = 5;
    showingBeers(beerApi);
})

//show 10 dropdown lista
let showTen = document.getElementById('showTen');
showTen.addEventListener('click', () => {
    perPage = 10;
    showingBeers(beerApi);
})

//show 20
let showTwenty = document.getElementById('showTwenty');
showTwenty.addEventListener('click', () => {
    perPage = 20;
    showingBeers(beerApi);
})

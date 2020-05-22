//DOM elements to work with
const __main = document.getElementById('__main');
const __aside = document.getElementById('__aside');
const __asideBackground = document.getElementById('__asideBackground');
const __wall = document.getElementById('__wall');
const favMenuButton = document.getElementById('favMenuButton');
const MSI2020 = document.getElementById('MSI2020');
const variantsMenu = document.getElementById('variantsMenu');
const textArea = document.getElementsByTagName('textarea')[0];
const jokes_container = document.getElementById('jokes-container');
const fav_container = document.getElementById('fav-container');
let allOuterCircles = document.getElementsByClassName('circle-outer');
let allInnerCircles = document.getElementsByClassName('circle-inner');
//chuck norris API links
let jokesLink = "https://api.chucknorris.io/jokes/";
let randomJokeRequestURL = "https://api.chucknorris.io/jokes/random";
let randomJokeFromCategoriesRequestURL ="https://api.chucknorris.io/jokes/random?category=";
let allCategoriesRequestURL = "https://api.chucknorris.io/jokes/categories";
let searchRequestURL = "https://api.chucknorris.io/jokes/search?query=";
let request = new XMLHttpRequest();
//special variables
let variant = 'Random';
let allCategories = [];
let chosenCategory = 'animal';
let searchTest;
let randomJoke;
let arrOfJokes = [];
let arrOfFavs = [];
let arrOfHearts = [];
let favorites = [];
//initialization
window.onload = () => {
    if (+window.innerWidth > 1240)
        __main.style.width = +window.innerWidth - 480 + "px";
    getAllCategories();
    updateFavorites();
    if (favorites.length > 0) {
        arrOfFavs = [];
        getJokeWithID(favorites.length - 1);
    }
};
//main functions
function buildJokeDiv(isFav, jokesID, jokesText, lastUpdateTime, _category) {
    let outerDiv = document.createElement('div');
    outerDiv.className = "outer-jokes-div reg";
    outerDiv.style.font = "font-family: Roboto, sans-serif;";

    let heartImage = document.createElement('img');
    heartImage.src = (isFav)? "img/heartFGrey.png" : "img/heartEGrey.png";
    heartImage.id = jokesID + "_reg";
    heartImage.className = "heart";
    heartImage.onclick = () => like_dislike(jokesID, "_reg");

    let middleDiv = document.createElement('div');
    middleDiv.className = "middle-jokes-div reg";
    middleDiv.style = "display: inline-flex; margin-top: 10px";

    let commentImage = document.createElement('img');
    commentImage.src = "img/commentWhite.png";
    commentImage.className = "commentImage";

    let innerDiv = document.createElement('div');
    innerDiv.style = "margin-left: 20px;";

    let idDiv = document.createElement('div');
    idDiv.className = "id-text reg";
    idDiv.style.padding = "0";
    idDiv.style.height = "14px";

    let idP = document.createElement('p');
    idP.className = "ids-p";
    idP.innerText = "ID:";

    let idA = document.createElement('a');
    idA.href = jokesLink + jokesID;
    idA.innerText = jokesID;

    idDiv.append(idP, idA);

    let textP = document.createElement('p');
    textP.innerText = jokesText;
    textP.style.display = "inline-block";

    let lastUpdateP = document.createElement('p');
    lastUpdateP.className = "lastUpdateP";
    lastUpdateP.innerText = "Last update: " + lastUpdateTime;

    innerDiv.append(idDiv, textP, lastUpdateP);

    if (_category) {
        let categoriesP = document.createElement('p');
        categoriesP.className = "categoriesOfDiv";
        categoriesP.innerText = _category.toUpperCase();
        innerDiv.append(categoriesP);
    }

    middleDiv.append(commentImage, innerDiv);

    outerDiv.append(heartImage, middleDiv);

    return outerDiv;
}
function buildFavDiv(jokesID, jokesText, lastUpdateTime, _category) {
    let outerDiv = document.createElement('div');
    outerDiv.className = "fav-outer-jokes-div";
    outerDiv.style.margin = "20px 20px 0 20px";
    outerDiv.style.padding = "20px";
    outerDiv.style.font = "font-family: Roboto, sans-serif;";

    let heartImage = document.createElement('img');
    heartImage.src = "img/heartFWhite.png";
    heartImage.id = jokesID + "_fav";
    heartImage.className = "heart";
    heartImage.onclick = () => like_dislike(jokesID, "_fav");

    let middleDiv = document.createElement('div');
    middleDiv.className = "middle-jokes-div fav";
    middleDiv.style = "display: inline-flex; margin: 0; padding: 0";

    let commentImage = document.createElement('img');
    commentImage.src = "img/commentGrey.png";
    commentImage.className = "commentImage";

    let innerDiv = document.createElement('div');
    innerDiv.style = "margin: 0 0 0 20px; padding: 0;";

    let idDiv = document.createElement('div');
    idDiv.className = "id-text fav";
    idDiv.style = "margin: 0; padding: 0; height: 14px";

    let idP = document.createElement('p');
    idP.className = "ids-p";
    idP.innerText = "ID:";

    let idA = document.createElement('a');
    idA.href = jokesLink + jokesID;
    idA.innerText = jokesID;

    idDiv.append(idP, idA);

    let textP = document.createElement('p');
    textP.innerText = jokesText;
    textP.style.display = "inline-block";

    let lastUpdateP = document.createElement('p');
    lastUpdateP.className = "lastUpdateP";
    lastUpdateP.innerText = "Last update: " + lastUpdateTime;

    innerDiv.append(idDiv, textP, lastUpdateP);

    if (_category) {
        let categoriesP = document.createElement('p');
        categoriesP.className = "categoriesOfDiv";
        categoriesP.innerText = _category.toUpperCase();
        categoriesP.style = "background-color: #F8F8F8;";
        innerDiv.append(categoriesP);
    }

    middleDiv.append(commentImage, innerDiv);

    outerDiv.append(heartImage, middleDiv);

    return outerDiv;
}
function removeDivs(className) {
    let divs = document.getElementsByClassName(className);
    for (let i = divs.length - 1; i >= 0; i--)
        divs[i].remove();
}

function getJokeWithID(number_length) {
    request.open('GET', jokesLink+ favorites[number_length]);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        arrOfFavs.push(request.response);
        if (number_length < 1) {
            if (arrOfFavs && arrOfFavs !== [])
                for (let key in arrOfFavs)
                    fav_container.append( buildFavDiv(arrOfFavs[key].id, arrOfFavs[key].value, arrOfFavs[key].updated_at, arrOfFavs[key].categories[0]) );
            return;
        }
        getJokeWithID(number_length-1);
    }
}
function getRandomJoke() {
    request.open('GET', randomJokeRequestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        randomJoke = request.response;
        jokes_container.append( buildJokeDiv(false, randomJoke.id, randomJoke.value, randomJoke.updated_at, randomJoke.categories[0]) );
        arrOfHearts = randomJoke.id;
    }
}
function getRandomJokeFromCategories() {
    request.open('GET', randomJokeFromCategoriesRequestURL + chosenCategory);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        randomJoke = request.response;
        jokes_container.append( buildJokeDiv(false, randomJoke.id, randomJoke.value, randomJoke.updated_at, chosenCategory) );
        arrOfHearts = [randomJoke.id];
    }
}
function getAllCategories() {
    request.open('GET', allCategoriesRequestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        allCategories = request.response;
        builtCategoryVarMenu();
    }
}
function getSearchJoke() {
    request.open('GET', searchRequestURL + searchTest);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        arrOfJokes = request.response.result;
        arrOfHearts = [];
        if (arrOfJokes && arrOfJokes !== [])
            for (let key in arrOfJokes) {
                jokes_container.append(buildJokeDiv(false, arrOfJokes[key].id, arrOfJokes[key].value, arrOfJokes[key].updated_at, arrOfJokes[key].categories[0]));
                arrOfHearts.push(arrOfJokes[key].id);
            }
    }
}

function like_dislike(thisID, thisType) {
    removeDivs("fav-outer-jokes-div" );
    updateFavorites();
    let heartToChange;
    if (thisType === "_reg") {
        heartToChange = document.getElementById(thisID + thisType);
        if (favorites.indexOf(thisID) > -1) {
            favorites.splice(favorites.indexOf(thisID), 1);
            heartToChange.src = "img/heartEGrey.png";
        } else {
            favorites.push(thisID);
            heartToChange.src = "img/heartFGrey.png";
        }
    } else {
        if (favorites.indexOf(thisID) > -1) {
            favorites.splice(favorites.indexOf(thisID), 1);
            if ( arrOfHearts.indexOf(thisID) > -1){
                heartToChange = document.getElementById(thisID + "_reg");
                heartToChange.src = "img/heartEGrey.png";
            }
        } else
            favorites.push(thisID);
    }
    updateCookies();
    refreshHearts();
    if (favorites.length > 0){
        arrOfFavs = [];
        getJokeWithID(favorites.length-1);
    }
}
function updateFavorites() {
    if (document.cookie !== '' && document.cookie !== "undefined") {
        let cookies = document.cookie.split('; ');
        for (let index = 0; index < cookies.length; index++) {
            let cookiesNameAndValue = cookies[index].split('=');
            if (cookiesNameAndValue[0] === 'IDS') {
                favorites = cookiesNameAndValue[1].split(',');
                break;
            }
        }
    } else {
        favorites = [];
    }
}
function refreshHearts() {
    if (arrOfHearts !== [])
        for (let index = 0; index < arrOfHearts; index++){
            let heartToCheck = document.getElementById(arrOfHearts[index] + "_reg");
            if ( favorites.indexOf(arrOfHearts[index][0]) > -1 )
                heartToCheck.src = "img/heartEGrey.png";
            else
                heartToCheck.src = "img/heartFGrey.png";
        }
}
function updateCookies() {
    deleteAllCookies();
    let updateCookies;
    if (favorites !== undefined && favorites !== []) {
        updateCookies = favorites[0];
        if (favorites.length > 1)
            for (let i = 1; i < favorites.length; i++)
                if (favorites[i] !== '' && favorites[i] !== undefined)
                    updateCookies += "," + favorites[i];
    }
    if (updateCookies !== undefined)
        document.cookie = "IDS=" + updateCookies + "; path=/; max-age=60";
    else
        document.cookie = "IDS=; path=/; max-age=-1";
}
function getJoke() {
    removeDivs("outer-jokes-div reg" );
    switch (variant) {
        case 'Random':
            getRandomJoke();
            break;
        case 'FromCategories':
            getRandomJokeFromCategories();
            break;
        case 'Search':
            searchTest = textArea.value;
            if (searchTest.length > 2)
                getSearchJoke();
            else
                alert("Not enough length to search!");
            break;
    }
}
//functions that works with interface
function showAside(){
    if (window.innerWidth < 1239)
        if (__aside.style.display === 'none' || __aside.style.display === "") {
            __main.style.position = 'fixed';
            __wall.style.display = 'inline';
            __asideBackground.style.display = 'inline-block';
            favMenuButton.src = "img/favCloseIcon.png";
            __aside.style.display = 'inline-block';
            MSI2020.style.position = 'fixed';
        } else {
            __main.style.position = 'absolute';
            __wall.style.display = 'none';
            __asideBackground.style.display = 'none';
            favMenuButton.src = "img/favOpenIcon.png";
            __aside.style.display = 'none';
            MSI2020.style.position = 'absolute';
        }
}
function changeMenuVar(text) {
    for (let i = 0; i < allOuterCircles.length; i++)
        allOuterCircles[i].style.border = "2px solid #ABABAB";
    for (let i = 0; i < allInnerCircles.length; i++)
        allInnerCircles[i].style.backgroundColor = "#FFF";

    variantsMenu.hidden = true;
    textArea.hidden = true;
    switch (text) {
        case 'Random':
            variant = 'Random';
            document.getElementById('circle-outer-random').style.border = "2px solid black";
            document.getElementById('circle-inner-random').style.backgroundColor ="black";
            break;
        case 'FromCategories':
            variant = 'FromCategories';
            document.getElementById('circle-outer-categories').style.border = "2px solid black";
            document.getElementById('circle-inner-categories').style.backgroundColor ="black";
            variantsMenu.hidden = false;
            break;
        case 'Search':
            variant = 'Search';
            document.getElementById('circle-outer-search').style.border = "2px solid black";
            document.getElementById('circle-inner-search').style.backgroundColor ="black";
            textArea.hidden = false;
            break;
    }
}
function builtCategoryVarMenu() {
    //default choice of var menu
    variant = 'Random';
    document.getElementById('circle-outer-random').style.border = "2px solid black";
    document.getElementById('circle-inner-random').style.backgroundColor ="black";
    for (let index = 0; index < allCategories.length; index++) {
        let categoryVarButton = document.createElement('button');
        categoryVarButton.id = allCategories[index];
        categoryVarButton.onclick = () => chooseVar(categoryVarButton.id);
        categoryVarButton.innerText = allCategories[index];
        variantsMenu.append(categoryVarButton);
    }
    let newCategory = document.getElementById('animal');
    newCategory.style.backgroundColor = '#F8F8F8';
    newCategory.style.color = '#000';
};
function chooseVar(text) {
    let prevCategory = document.getElementById(chosenCategory);
    prevCategory.style.backgroundColor = '#FFF';
    prevCategory.style.color = '#ABABAB';

    let newCategory = document.getElementById(text);
    newCategory.style.backgroundColor = '#F8F8F8';
    newCategory.style.color = '#000';
    chosenCategory = text;
}
//spec functions, not mine btw...
/*
function setCookie(name, value, options = {}) {

    options = {
        path: '/'
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}
var utilCookie = Cookies.get('utilCookie');
if (typeof utilCookie === 'undefined') {
  // performs a failsafe by falling back to a default value
} else {
  // uses the value of the cookie elsewhere in the app
}
*/
function deleteAllCookies() {
    let cookies = document.cookie.split(";");
    let name;
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

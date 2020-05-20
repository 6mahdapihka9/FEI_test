//DOM elements to work with
const __main = document.getElementById('__main');
const __aside = document.getElementById('__aside');
const __wall = document.getElementById('__wall');
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
let allCategories = [];
let variant = 'Random';
let arrOfJokesDivs = [];
let arrOfFavDivs = [];
let chosenCategory;
let randomJoke;


//initialization
if (+window.innerWidth > 1239)
    __main.style.width = +window.innerWidth - 480 + "px";
getAllCategories();
//favor();

//DONE
function buildJokeDiv(isFav, jokesID, jokesText, lastUpdateTime, _categorie) {
    let outerDiv = document.createElement('div');
    outerDiv.className = "outer-jokes-div reg";

    let heartImage = document.createElement('img');
    heartImage.src = (isFav)? "heartFullGrey.png" : "heartEmptyGrey.png";
    heartImage.id = jokesID;
    heartImage.className = "heart";
    heartImage.onclick = () => like();

    let middleDiv = document.createElement('div');
    middleDiv.className = "middle-jokes-div reg";
    middleDiv.style = "display: inline-flex; margin-top: 10px";

    let commentImage = document.createElement('img');
    commentImage.src = "commentWhite.png";
    commentImage.className = "commentImage";

    let innerDiv = document.createElement('div');
    innerDiv.style = "margin-left: 20px";

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

    let lastUpdateP = document.createElement('p');
    lastUpdateP.className = "lastUpdateP";
    lastUpdateP.innerText = "Last update: " + lastUpdateTime;

    innerDiv.append(idDiv, textP, lastUpdateP);

    if (_categorie) {
        let categoriesP = document.createElement('p');
        categoriesP.className = "categoriesOfDiv";
        categoriesP.innerText = _categorie.toUpperCase();
        innerDiv.append(categoriesP);
    }

    middleDiv.append(commentImage, innerDiv);

    outerDiv.append(heartImage, middleDiv);

    return outerDiv;
}
function buildFavDiv(jokesID, jokesText, lastUpdateTime, _categorie) {
    let outerDiv = document.createElement('div');
    outerDiv.className = "fav-outer-jokes-div";
    outerDiv.style = "margin: 20px 20px 0 20px; padding: 20px";

    let heartImage = document.createElement('img');
    heartImage.src = "heartFullWhite.png";
    heartImage.id = jokesID;
    heartImage.className = "heart";
    heartImage.onclick = () => dislike();

    let middleDiv = document.createElement('div');
    middleDiv.className = "middle-jokes-div fav";
    middleDiv.style = "display: inline-flex; margin: 0; padding: 0";

    let commentImage = document.createElement('img');
    commentImage.src = "commentGrey.png";
    commentImage.className = "commentImage";

    let innerDiv = document.createElement('div');
    innerDiv.style = "margin: 0 0 0 20px; padding: 0 ";

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

    let lastUpdateP = document.createElement('p');
    lastUpdateP.className = "lastUpdateP";
    lastUpdateP.innerText = "Last update: " + lastUpdateTime;

    innerDiv.append(idDiv, textP, lastUpdateP);

    if (_categorie) {
        let categoriesP = document.createElement('p');
        categoriesP.className = "categoriesOfDiv";
        categoriesP.innerText = _categorie.toUpperCase();
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

function getRandomJoke() {
    request.open('GET', randomJokeRequestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        randomJoke = request.response;
        jokes_container.append( buildJokeDiv(false, randomJoke.id, randomJoke.value, randomJoke.updated_at, randomJoke.categories[0]) );
    }
}
function getRandomJokeFromCategories() {
    request.open('GET', randomJokeFromCategoriesRequestURL + chosenCategory);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        randomJoke = request.response;
        jokes_container.append( buildJokeDiv(false, randomJoke.id, randomJoke.value, randomJoke.updated_at, chosenCategory) );
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
//TO DO
function getSearchJoke(search) {
    request.open('GET', searchRequestURL + search);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        let allCategories = request.response;
        console.log(allCategories);
    }
}

function like(thisID) {
    //TODO
    //fav_container.append( buildFavDiv(randomJoke.id, randomJoke.value, randomJoke.updated_at, randomJoke.categories[0]) );
}
function dislike(thisID) {
    //TODO
}







//main functions
function favor(id) {

    let divs = document.getElementsByClassName('favorites');
    for (let i = divs.length - 1; i >= 0; i--)
        divs[i].remove();

    let favorites = [];
    let __cookiesNameAndValue;
    let updateCookies;
    if (document.cookie !== '' || document.cookie !== "undefined") {
        let __cookies = document.cookie.split('; ');
        for (let index = 0; index < __cookies.length; index++) {
            __cookiesNameAndValue = __cookies[index].split('=');
            if (__cookiesNameAndValue[0] === 'IDS') {
                favorites = __cookiesNameAndValue[1].split(',');
                break;
            }
        }
    }
    let addToFav = '';
    if (id !== undefined) {
        if (document.cookie.indexOf(id) !== -1) {
            addToFav = "";
            favorites.unshift(id);
        } else
            addToFav = id + ',';
    }

    updateCookies = 'IDS=' + addToFav + ((__cookiesNameAndValue[1]!==undefined)?__cookiesNameAndValue[1]:'') + '; path=/; max-age=10';


    //deleteAllCookies();
    document.cookie = updateCookies;
    divs = [];
    /*
    //CALLBACK
    let addImage = (src, size, callback)=>{
        let img = document.createElement('img');
        img.src = src;
        img.style.width = size;
        img.onload = () => callback(img);
    };
    let addDiv = (_id, callback) => {
        let div = document.createElement('div');
        div.id =  _id + "_fav";
        div.className = "favorites";
        div.onload = () => callback(div);
    };
    */
    if (favorites !== undefined )
        for (let i = 0; i < favorites.length; i++)
            if (favorites[i] !== '' && favorites[i] !== undefined) {
                //fav_container.load();
                //divs.push(div);
            }
    //for (let key in divs)
    //fav_container.append(divs[key]);
    /*
        let div = document.createElement('div');
        div.id =  id + "_fav";
        div.className = "favorites";

        let img1 = document.createElement('img');
        img1.src = "commentGrey.png";
        img1.style.width = "40px";

        let img2 = document.createElement('img');
        img2.src = "heartFullWhite.png";
        img2.style.width = "20px";

        let p = document.createElement('p');
        p.innerText = "No one truly knows who's Chuck Norris' real father. No one is biologically strong enough for this. He must've conceived himself.";
        div.append(img1, img2, p);
        fav_container.append(div);

    */
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

            break;
    }
    //removeDivs("fav-outer-jokes-div" );
}

//functions that works with interface
function showAside(){
    if (window.innerWidth < 1239)
        if (__aside.style.display === 'none' || __aside.style.display === "") {
            __main.style.position = 'fixed';
            __aside.style.display = 'inline-block';
            __wall.style.display = 'inline';
            MSI2020.style.position = 'fixed';
        } else {
            __main.style.position = 'absolute';
            __wall.style.display = 'none';
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
    chosenCategory = 'animal';
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

//spec functions, not mine...
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

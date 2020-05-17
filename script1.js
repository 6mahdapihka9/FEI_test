const __main = document.getElementById('__main');
const __aside = document.getElementById('__aside');
const __wall = document.getElementById('__wall');
const MSI2020 = document.getElementById('MSI2020');
const fav_container = document.getElementById('fav-container');
const jokes_container = document.getElementById('jokes-container');
let variant = 'varRandom';

if (window.innerWidth > 1239)
    __main.style.width = "" + (+window.innerWidth - 520) + "px";

function showFavorite(){
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
    let allOuterCircles = document.getElementsByClassName('circle-outer');
    for (let i = 0; i < allOuterCircles.length; i++)
        allOuterCircles[i].style.border = "2px solid #ABABAB";
    let variantsMenu = document.getElementById('variantsMenu');
    variantsMenu.hidden = true;
    let allInnerCircles = document.getElementsByClassName('circle-inner');
    for (let i = 0; i < allInnerCircles.length; i++)
        allInnerCircles[i].style.backgroundColor = "#FFF";

    let textArea = document.getElementsByTagName('textarea')[0];
    textArea.hidden = true;
    switch (text) {
        case 'Random':
            variant = 'varRandom';
            document.getElementById('circle-outer-random').style.border = "2px solid black";
            document.getElementById('circle-inner-random').style.backgroundColor ="black";
            break;
        case 'FromCategories':
            document.getElementById('circle-outer-categories').style.border = "2px solid black";
            document.getElementById('circle-inner-categories').style.backgroundColor ="black";
            variantsMenu.hidden = false;
            break;
        case 'Search':
            document.getElementById('circle-outer-search').style.border = "2px solid black";
            document.getElementById('circle-inner-search').style.backgroundColor ="black";
            textArea.hidden = false;
            break;
    }
}

function chooseVar(text) {
    let varAnimal = document.getElementById('varAnimal');
    let varCareer = document.getElementById('varCareer');
    let varCelebrity = document.getElementById('varCelebrity');
    let varDev = document.getElementById('varDev');

    varAnimal.style.border =
        varCareer.style.border =
            varCelebrity.style.border =
                varDev.style.border = '2px solid #F8F8F8';

    varAnimal.style.color =
        varCareer.style.color =
            varCelebrity.style.color =
                varDev.style.color = '#ABABAB';

    document.getElementById(''+text).style.border = '2px solid #000';
    document.getElementById(''+text).style.color = '#000';
    variant = text;
}

document.images.onclick = ()=>{
    console.log("dsccsd");
    favor(this.id);
};
/*
document.getElementsByClassName('outer-jokes-div').onclick = () =>{
    console.log("dsccsd"+this.children[0].id);
};

 */

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
    let addToFav;
    if (document.cookie.indexOf( id ) !== -1) {
        addToFav = "";
        favorites.unshift(id);
    } else
        addToFav = id + ',';

    updateCookies = 'IDS=' + addToFav + ((__cookiesNameAndValue[1]!==undefined)?__cookiesNameAndValue[1]:'') + '; path=/; max-age=10';


    deleteAllCookies();
    document.cookie = updateCookies;
    divs = [];
    if (favorites !== undefined )
        for (let i = 0; i < favorites.length; i++)
            if (favorites[i] !== '' && favorites[i] !== undefined) {
                let div;
                div = document.createElement('div');
                div.id = favorites[i] + "_fav";
                div.className = "favorites";
                let commentImg = document.createElement('img');
                commentImg.src = "commentGrey.png";
                commentImg.style.width = "40px";

                let heartImg = document.createElement('img');
                heartImg.src = "heartFullWhite.png";
                heartImg.style.width = "20px";

                let p = document.createElement('p');
                p.innerText = "No one truly knows who's Chuck Norris' real father. No one is biologically strong enough for this. He must've conceived himself.";

                div.append(commentImg, heartImg, p);

                console.log(document.readyState);

                //fav_container.append(div);
                divs.push(div);
            }
    for (let key in divs)
        fav_container.append(divs[key]);
}


function getJoke() {

}
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
    var cookies = document.cookie.split(";");
    var name;
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
favor();

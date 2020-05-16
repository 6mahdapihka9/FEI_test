let __main = document.getElementById('__main');
let __aside = document.getElementById('__aside');
let __wall = document.getElementById('__wall');
let MSI2020 = document.getElementById('MSI2020');
let varient;
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
}

function showFound() {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if(!element.classList.contains("found")) {
            $(element).addClass("hide");
        } else {
            $(element).removeClass("hide");
        }
    });
}

function showAll() {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if(element.classList.contains("hide")) {
            $(element).removeClass("hide");
        }
    });
}

function showUnknown() {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if(element.classList.contains("found")) {
            $(element).addClass("hide");
        } else {
            $(element).removeClass("hide");
        }
    });
}

$(document).ready(function () {


    $("#found").click(showFound);
    $("#all").click(showAll);
    $("#unknown").click(showUnknown);

});
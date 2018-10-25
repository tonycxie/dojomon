function showFound() {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if (!element.classList.contains("found")) {
            $(element).addClass("hide");
        } else {
            $(element).removeClass("hide");
        }
    });
}

function showAll() {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if (element.classList.contains("hide")) {
            $(element).removeClass("hide");
        }
    });
}

function showUnknown() {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if (element.classList.contains("found")) {
            $(element).addClass("hide");
        } else {
            $(element).removeClass("hide");
        }
    });
}

function showTier1() {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if (!element.classList.contains("tier1")) {
            $(element).addClass("hide");
        } else {
            $(element).removeClass("hide");
        }
    });
}


function showTier(num) {
    let pokemon = document.querySelectorAll(".sprite")
    pokemon.forEach(element => {
        if (!element.classList.contains("tier" + num)) {
            $(element).addClass("hide");
        } else {
            $(element).removeClass("hide");
        }
    });
}

function showSprites() {
    $(".player-party").toggle()
    $(".edit-sprites").toggle()
}

function addAllSprites() {
    for (let i = 1; i <= 12; i++) {
        sprite = document.createElement("img");
        sprite.classList += "character-sprite"
        sprite.src = "/static/dashboard/images/character_sprites/sprite" + i + ".png"
        $(sprite).click(editTrainerSprite);
        $(".sprites-wrapper").append(sprite);
    }
}

function editTrainerSprite() {
    src = $(this).attr("src");
    $(".trainer-sprite").attr("src", src);
}

function addEventHandler() {
    sprites = document.querySelectorAll(".sprite");
    sprites.forEach(sprite => {
        $(sprite).submit(function (e) {
            if ($(this).hasClass("found")) {
                e.preventDefault();
                $.ajax({
                    data: $(this).serialize(), // get the form data
                    type: $(this).attr('method'), // GET or POST
                    url: $(this).attr('action'),
                    success: function (response) {
                        displayPokemonInfo(response)
                    } 
                });
                return false;
            }
        });
    });
}

function displayPokemonInfo(response) {
    let types = JSON.parse(response["type"])
    let moves = JSON.parse(response["moves"]);
    let pokemon = JSON.parse(response["pokemon"]);
    // console.log(moves);
    // console.log(types)
    // console.log(pokemon[0])
    let pokeName = pokemon[0].fields.name;
    $(".info-name").text(pokeName.charAt(0).toUpperCase() + pokeName.slice(1));
    $(".health").text("Health: " + pokemon[0].fields.health)
    $(".speed").text("Speed: " + pokemon[0].fields.speed)
    $(".img-wrapper > img").attr("src", pokemon[0].fields.front_sprite);
    // $(".img-wrapper > img").attr("id", pokemon[0].pk);
    $(".type").text("Type: " + types[0].fields.name)
    $(".number").text("no. " + pokemon[0].pk)
    // console.log(pokemon[0]);
    $(".description").text(pokemon[0].fields.desc)

}

$(document).ready(function () {
    addEventHandler();
    addAllSprites();
    // make sure on click for trainer-sprite is disabled until save is clicked
    $("#sprite-form").submit(function (e) {
        e.preventDefault();
        showSprites();
        src = $(".trainer-sprite").attr("src");
        $("#characters-sprite").attr("value", src);
        $.ajax({
            url: $(this).attr("action"),
            method: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                console.log(response);
            }
        });
    });
    $(".edit-sprites").hide();
    $(".trainer-sprite").click(showSprites);
    $("#found").click(showFound);
    $("#all").click(showAll);
    $("#unknown").click(showUnknown);
    $("#tier1").click(function () {
        showTier(1);
    });
    $("#tier2").click(function () {
        showTier(2);
    });
    $("#tier3").click(function () {
        showTier(3);
    });
    $("#tier4").click(function () {
        showTier(4);
    });
    $("#tier5").click(function () {
        showTier(5);
    });

    $("#collapse-btn").click(function () {
        $('#sidebar').toggleClass('active');

    });

});
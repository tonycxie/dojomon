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

function showSprites() {
    $(".player-party").toggle()
    $(".edit-sprites").toggle()
}

function addAllSprites() {
    for(let i = 1; i <= 12; i++) {
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

$(document).ready(function () {

    addAllSprites();
    // make sure on click for trainer-sprite is disabled until save is clicked
    $("#sprite-form").submit(function(e) {
        e.preventDefault();
        showSprites();
        src = $(".trainer-sprite").attr("src");
        $("#characters-sprite").attr("value", src);
        $.ajax({
            url: $(this).attr("action"),
            method: 'POST',
            data: $(this).serialize(),
            success: function(response){
               console.log(response);
            }
         });
    });
    $(".edit-sprites").hide();
    $(".trainer-sprite").click(showSprites);
    $("#found").click(showFound);
    $("#all").click(showAll);
    $("#unknown").click(showUnknown);

    $("#collapse-btn").click(function () { 
        $('#sidebar').toggleClass('active');
        
    });

});
const types = [
    "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire",  "flying", 
    "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", 
    "steel", "water"
];

const moveEffectiveness = {
    "normal": {
        "normal": 1, "fire": 1, "water": 1, "electric": 1, "grass": 1, "ice": 1, 
        "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, 
        "bug": 1, "rock": 0.5, "ghost": 0, "dragon": 1, "dark": 1, "steel": 0.5, 
        "fairy": 1
    },    
    "fire": {
        "normal": 1, "fire": 0.5, "water": 0.5, "electric": 1, "grass": 2, "ice": 2, 
        "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, 
        "bug": 2, "rock": 0.5, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 2, 
        "fairy": 1
    },    
    "water": {
        "normal": 1, "fire": 2, "water": 0.5, "electric": 1, "grass": 0.5, "ice": 1, 
        "fighting": 1, "poison": 1, "ground": 2, "flying": 1, "psychic": 1, 
        "bug": 1, "rock": 2, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 1, 
        "fairy": 1
    },    
    "electric": {
        "normal": 1, "fire": 1, "water": 2, "electric": 0.5, "grass": 0.5, "ice": 1, 
        "fighting": 1, "poison": 1, "ground": 0, "flying": 2, "psychic": 1, 
        "bug": 1, "rock": 1, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 1, 
        "fairy": 1
    },    
    "grass": {
        "normal": 1, "fire": 0.5, "water": 2, "electric": 1, "grass": 0.5, "ice": 1, 
        "fighting": 1, "poison": 0.5, "ground": 2, "flying": 0.5, "psychic": 1, 
        "bug": 0.5, "rock": 2, "ghost": 1, "dragon": 0.5, "dark": 1, "steel": 0.5, 
        "fairy": 1
    },    
    "ice": {
        "normal": 1, "fire": 0.5, "water": 0.5, "electric": 1, "grass": 2, "ice": 0.5, 
        "fighting": 1, "poison": 1, "ground": 2, "flying": 2, "psychic": 1, 
        "bug": 1, "rock": 1, "ghost": 1, "dragon": 2, "dark": 1, "steel": 0.5, 
        "fairy": 1
    },    
    "fighting": {
        "normal": 2, "fire": 1, "water": 1, "electric": 1, "grass": 1, "ice": 2, 
        "fighting": 1, "poison": 0.5, "ground": 1, "flying": 0.5, "psychic": 0.5, 
        "bug": 0.5, "rock": 2, "ghost": 0, "dragon": 1, "dark": 2, "steel": 2, 
        "fairy": 0.5
    },    
    "poison": {
        "normal": 1, "fire": 1, "water": 1, "electric": 1, "grass": 2, "ice": 1, 
        "fighting": 1, "poison": 0.5, "ground": 0.5, "flying": 1, "psychic": 1, 
        "bug": 1, "rock": 0.5, "ghost": 0.5, "dragon": 1, "dark": 1, "steel": 0, 
        "fairy": 2
    },    
    "ground": {
        "normal": 1, "fire": 2, "water": 1, "electric": 2, "grass": 0.5, "ice": 1, 
        "fighting": 1, "poison": 2, "ground": 1, "flying": 0, "psychic": 1, 
        "bug": 0.5, "rock": 2, "ghost": 1, "dragon": 1, "dark": 1, "steel": 2, 
        "fairy": 1
    },    
    "flying": {
        "normal": 1, "fire": 1, "water": 1, "electric": 0.5, "grass": 2, "ice": 1, 
        "fighting": 2, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, 
        "bug": 2, "rock": 0.5, "ghost": 1, "dragon": 1, "dark": 1, "steel": 0.5, 
        "fairy": 1
    },    
    "psychic": {
        "normal": 1, "fire": 1, "water": 1, "electric": 1, "grass": 1, "ice": 1, 
        "fighting": 2, "poison": 2, "ground": 1, "flying": 1, "psychic": 0.5, 
        "bug": 1, "rock": 1, "ghost": 1, "dragon": 1, "dark": 0, "steel": 0.5, 
        "fairy": 1
    },    
    "bug": {
        "normal": 1, "fire": 0.5, "water": 1, "electric": 1, "grass": 2, "ice": 1, 
        "fighting": 0.5, "poison": 0.5, "ground": 1, "flying": 0.5, "psychic": 2, 
        "bug": 1, "rock": 1, "ghost": 0.5, "dragon": 1, "dark": 2, "steel": 0.5, 
        "fairy": 0.5
    },    
    "rock": {
        "normal": 1, "fire": 2, "water": 1, "electric": 1, "grass": 1, "ice": 2, 
        "fighting": 0.5, "poison": 1, "ground": 0.5, "flying": 2, "psychic": 1, 
        "bug": 2, "rock": 1, "ghost": 1, "dragon": 1, "dark": 1, "steel": 0.5, 
        "fairy": 1
    },    
    "ghost": {
        "normal": 0, "fire": 1, "water": 1, "electric": 1, "grass": 1, "ice": 1, 
        "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 2, 
        "bug": 1, "rock": 1, "ghost": 2, "dragon": 1, "dark": 0.5, "steel": 1, 
        "fairy": 1
    },    
    "dragon": {
        "normal": 1, "fire": 1, "water": 1, "electric": 1, "grass": 1, "ice": 1, 
        "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, 
        "bug": 1, "rock": 1, "ghost": 1, "dragon": 2, "dark": 1, "steel": 0.5, 
        "fairy": 0
    },    
    "dark": {
        "normal": 1, "fire": 1, "water": 1, "electric": 1, "grass": 1, "ice": 1, 
        "fighting": 0.5, "poison": 1, "ground": 1, "flying": 1, "psychic": 2, 
        "bug": 1, "rock": 1, "ghost": 2, "dragon": 1, "dark": 0.5, "steel": 1, 
        "fairy": 0.5
    },    
    "steel": {
        "normal": 1, "fire": 0.5, "water": 0.5, "electric": 0.5, "grass": 1, "ice": 2, 
        "fighting": 1, "poison": 1, "ground": 1, "flying": 1, "psychic": 1, 
        "bug": 1, "rock": 2, "ghost": 1, "dragon": 1, "dark": 1, "steel": 0.5, 
        "fairy": 2
    },    
    "fairy": {
        "normal": 1, "fire": 0.5, "water": 1, "electric": 1, "grass": 1, "ice": 1, 
        "fighting": 2, "poison": 0.5, "ground": 1, "flying": 1, "psychic": 1, 
        "bug": 1, "rock": 1, "ghost": 1, "dragon": 2, "dark": 2, "steel": 0.5, 
        "fairy": 1
    }    
};

var meFirst = false;

function displayMoves() {
    $("#moves_form").submit(function(e) {
        e.preventDefault();
        $.ajax( {
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: function(serverResponse) {
                // $(".textbox").hide();
                let content = "<div class='row'>";
                for (let i = 0; i < serverResponse.length; i++) {
                    content += "<div class='col move'>";
                    content += "<h3>" + serverResponse[i]["fields"]["name"] + "</h3>";
                    content += "<p>" + types[serverResponse[i]["fields"]["moves_type"] - 1] + 
                        ", Power:" + serverResponse[i]["fields"]["power"] + "</p>";
                    content += "<p>" + serverResponse[i]["fields"]["pp"] + "/" + 
                        serverResponse[i]["fields"]["pp"] + "</p>";
                    content += "<input type='hidden' name='type' class='type' value='" + 
                        types[serverResponse[i]["fields"]["moves_type"] - 1] + "'>";
                    content += "<input type='hidden' name='power' class='power' value='" + 
                        serverResponse[i]['fields']['power'] + "'>";
                    content += "</div>";
                    if (i == 1) {
                        content += "</div><div class='row'>";
                    }
                }
                content += "</div>";
                $(".display").html(content);
                myMove();
            }
        })
    });
}

// does damage to enemy based on the move you made and types involved
function myMove() {
    $(".move").click(function() {
        // if your pokemon is faster, it will go first
        if ($("#my-speed").val() >= $("#enemy-speed").val()) {
            meFirst = true;
        // if the enemy pokemon is faster, it will go first and then you will go
        } else {
            meFirst = false;
            enemyMove();
        }
        let attackType = $(this).find(".type").val();
        let power = $(this).find(".power").val();
        let enemyHP = $("#enemy-current-hp").html();
        let enemyTypes = $(".enemy-info .enemy-types");
        let powerMult = power;
        for (let i = 0; i < enemyTypes.length; i++) {
            powerMult *= moveEffectiveness[attackType][enemyTypes[i].defaultValue];
        }
        let newEnemyHP = enemyHP - powerMult;
        if (newEnemyHP < 0) {
            newEnemyHP = 0;
        }
        let startHP = $("#enemy-start-hp").html();
        let enemyHPBar = newEnemyHP / startHP * 100;
        $(".enemy-healthpoints").css("width", enemyHPBar + "%");
        $("#enemy-current-hp").html(newEnemyHP);
        if (meFirst) {
            $(".display").html(
                "<h3>" + $("#my-name").html() + " used " + $(this).find("h3").html() + "</h3>"
            )
        } else {
            $(".display").append(
                "<h3>" + $("#my-name").html() + " used " + $(this).find("h3").html() + "</h3>"
            )      
        }
        if (powerMult > power) {
            $(".display").append("<h3>It was super effective!</h3>");
        } else if (powerMult == 0) {
            $(".display").append("<h3>It had no effect :(</h3>");
        } else if (powerMult < power) {
            $(".display").append("<h3>It was not very effective...</h3>");
        }
        // enemy pokemon will attack after you if you are faster
        if (meFirst) {
            enemyMove();
        }
    });
}

function enemyMove() {
    let enemyMoves = $(".enemy-moves input");
    let myHP = $("#my-current-hp").html();
    let randInt = Math.floor(Math.random() * Math.floor(4));
    let randMove = enemyMoves[randInt];
    let typeIndex = parseInt(randMove.className);
    let moveType = types[typeIndex - 1];
    let movePower = parseInt(randMove.value);
    let moveName = randMove.name;
    var powerMult = movePower;
    let myTypes = $(".my-info .my-types");
    for (let i = 0; i < myTypes.length; i++) {
        powerMult *= moveEffectiveness[moveType][myTypes[i].defaultValue];
    }
    let myNewHP = myHP - powerMult;
    if (myNewHP < 0) {
        myNewHP = 0;
    }
    let startHP = $("#my-start-hp").html();
    let myHPBar = myNewHP / startHP * 100;
    $(".my-healthpoints").css("width", myHPBar + "%");
    $("#my-current-hp").html(myNewHP);
    if (!meFirst) {
        $(".display").html(
            "<h3>" + $("#enemy-name").html() + " used " + moveName + "</h3>"
        )
    } else {
        $(".display").append(
            "<h3>" + $("#enemy-name").html() + " used " + moveName + "</h3>"
        )
    }
    if (powerMult > movePower) {
        $(".display").append("<h3>It was super effective!</h3>");
    } else if (powerMult == 0) {
        $(".display").append("<h3>It had no effect :(</h3>");
    } else if (powerMult < movePower) {
        $(".display").append("<h3>It was not very effective...</h3>");
    }
}

$(document).ready(function() {
    displayMoves();
});
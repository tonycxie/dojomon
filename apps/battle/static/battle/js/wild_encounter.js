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
var myCurrentHP = 0;
var enemyCurrentHP = 0;

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

// flashing animation after pokemon is hit
function flash(time, interval, img) {
    let timer = window.setInterval(function() {
        $(img).css("opacity", "0.1");
        window.setTimeout(function() {
            $(img).css("opacity", "1");
        }, 100);
    }, interval);
    window.setTimeout(function() {clearInterval(timer);}, time);
}

// does damage to enemy based on the move you made and types involved
function myMove() {
    $(".move").click(function() {
        // if your pokemon is faster, it will go first
        let mySpeed = $("#my-speed").val();
        let enemySpeed = $("#enemy-speed").val();
        if (mySpeed > enemySpeed) {
            meFirst = true;
        // if the enemy pokemon is faster, it will go first and then you will go
        } else {
            meFirst = false;
            enemyMove();
            if (myCurrentHP <= 0) {
                return;
            }
        }
        let timeout = 0;
        // adjusts when animations appear based on which pokemon goes first
        if (meFirst) {  
            timeout = 1000;
        } else {
            timeout = 3000;
        }
        myCurrentHP = $("#my-current-hp").html();

        if ($("#enemy-current-hp").html() == $("#enemy-start-hp").html()) {
            enemyCurrentHP = $("#enemy-current-hp").html();
        }
        if ($("#my-current-hp").html() == $("#my-start-hp").html()) {
            myCurrentHP = $("#my-current-hp").html();
        }

        let myName = $("#my-name").html();
        let orderNumber = $("#order-number").val();
        let move = $(this).find("h3").html();
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
        // console.log("current " + myCurrentHP);
        if (myCurrentHP <= 0) {
            console.log("you lose");
            return;
        }
        if (meFirst) {
            // menu disappears if you go first
            $(".options").toggle(); 
            $(".display").html(
                "<h3>" + $("#my-name").html() + " used " + move + "</h3>"
            )
        } else {
            window.setTimeout(function () {
                // if my health is 0, do not display next move
                if (myCurrentHP <= 0) {
                    return;
                }
                $(".display").append(
                    "<h3>" + $("#my-name").html() + " used " + move + "</h3>"
                )   
            }, timeout);
            timeout += 1000;   
        }
        window.setTimeout(function() {
            // if my health is 0, display losing message and end function
            if (myCurrentHP <= 0 && !meFirst) {
                orderNumber = parseInt(orderNumber) + 1;
                $(".display").html(
                    "<h3>" + myName + " fainted!</h3>" +   
                    "<form action='/battle/switch_pokemon' method='post' id='switch_form'>" + 
                        "<input type='hidden' name='next-order' id='next-order' value='" + 
                        orderNumber + "'>" +
                        "<button type='submit' id='switch'>Next Pokemon</button>"                
                );
                nextPokemon(orderNumber);
                return;
            }
            flash(600, 300, $(".front-sprite"));
            $("#enemy-current-hp").html(newEnemyHP);
            $(".enemy-healthpoints").css("width", enemyHPBar + "%");
            if (enemyHPBar < 20) {
                $(".enemy-healthpoints").css("background", "red") 
            } else if (enemyHPBar < 50) {
                $(".enemy-healthpoints").css("background", "orange") 
            }
            if (powerMult > power) {
                $(".display").append("<h3>It was super effective!</h3>");
            } else if (powerMult == 0) {
                $(".display").append("<h3>It had no effect :(</h3>");
            } else if (powerMult < power) {
                $(".display").append("<h3>It was not very effective...</h3>");
            }
            enemyCurrentHP = newEnemyHP;
            // if enemy health is 0, display winning message and end function
            if (enemyCurrentHP <= 0) {
                $(".display").html(
                    "<h3 class='win'>You win! :D</h3>" + 
                    "<a href='/battle/add_pokemon/" + $("#enemy-number").val() + "'>Return to Dashboard</a>"
                );
                return;
            }
            // menu reappears if enemy goes first
            if (!meFirst) {
                window.setTimeout(function() {
                    $(".options").toggle()
                }, 1000);
            }
        }, timeout);
        // enemy pokemon will attack after you if you are faster
        if (meFirst && enemyCurrentHP > 0) {
            enemyMove();
        }
    });
}

// enemy chooses a move at random and attacks
function enemyMove() {
    let timeout = 0;
    // adjusts when animations appear based on which pokemon goes first
    if (meFirst) {
        timeout = 3000;
    } else {
        timeout = 1000;
    }
    let enemyMoves = $(".enemy-moves input");

    if ($("#my-current-hp").html() == $("#my-start-hp").html()) {
        myCurrentHP = $("#my-current-hp").html();
    }
    if ($("#enemy-current-hp").html() == $("#enemy-start-hp").html()) {
        enemyCurrentHP = $("#enemy-current-hp").html();
    }

    let myHP = $("#my-current-hp").html();
    let myName = $("#my-name").html();
    let orderNumber = $("#order-number").val();
    let randInt = Math.floor(Math.random() * Math.floor(enemyMoves.length));
    let randMove = enemyMoves[randInt];
    let typeIndex = parseInt(randMove.className);
    let moveType = types[typeIndex - 1];
    let movePower = parseInt(randMove.value);
    let moveName = randMove.name;
    let powerMult = movePower;
    let myTypes = $(".my-info .my-types");
    for (let i = 0; i < myTypes.length; i++) {
        powerMult *= moveEffectiveness[moveType][myTypes[i].defaultValue];
    }
    let myNewHP = myHP - powerMult;
    myCurrentHP = myNewHP;
    if (myNewHP < 0) {
        myNewHP = 0;
    }
    let startHP = $("#my-start-hp").html();
    let myHPBar = myNewHP / startHP * 100;
    if (!meFirst) {
        // menu disappears if enemy goes first
        $(".options").toggle();
        $(".display").html(
            "<h3>" + $("#enemy-name").html() + " used " + moveName + "</h3>"
        )
    } else {
        window.setTimeout(function() {
            // if enemy health is 0, do not display next move
            if (enemyCurrentHP <= 0) {
                return;
            } 
            $(".display").append(
                "<h3>" + $("#enemy-name").html() + " used " + moveName + "</h3>"
            )
        }, timeout);
        timeout += 1000;
    }
    window.setTimeout(function() {
        console.log("enemy hp is " + enemyCurrentHP)
        // if enemy health is 0, display winning message and end function
        if (enemyCurrentHP <= 0) {
            console.log("winner!")
            $(".display").html(
                "<h3 class='win'>You win! :D</h3>" + 
                "<a href='/battle/add_pokemon/" + $("#enemy-number").val() + "'>Return to Dashboard</a>"
            );
            return;
        }
        flash(600, 300, $(".back-sprite"));
        $("#my-current-hp").html(myNewHP);
        $(".my-healthpoints").css("width", myHPBar + "%");
        if (myHPBar < 20) {
            $(".my-healthpoints").css("background", "red") 
        } else if (myHPBar < 50) {
            $(".my-healthpoints").css("background", "orange") 
        }
        if (powerMult > movePower) {
            $(".display").append("<h3>It was super effective!</h3>");
        } else if (powerMult == 0) {
            $(".display").append("<h3>It had no effect :(</h3>");
        } else if (powerMult < movePower) {
            $(".display").append("<h3>It was not very effective...</h3>");
        }
        myCurrentHP = myNewHP;
        // if my health is 0, display losing message and end function
        if (myCurrentHP <= 0) {
            orderNumber = parseInt(orderNumber) + 1;            
            $(".display").html(
                "<h3>" + myName + " fainted!</h3>" +   
                "<form action='/battle/switch_pokemon' method='post' id='switch_form'>" + 
                    "<input type='hidden' name='next-order' id='next-order' value='" + 
                    orderNumber + "'>" +
                    "<button type='submit' id='switch'>Next Pokemon</button>" 
            );
            nextPokemon(orderNumber);
            return;
        }
        // menu reappears if you go first
        if (meFirst) {
            window.setTimeout(function() {
                $(".options").toggle()
            }, 1000);
        }
    }, timeout);
}

function nextPokemon(orderNumber) {
    $("#switch_form").submit(function(e) {
        e.preventDefault();
        console.log("Sending request to " + $(this).attr("action"))
        console.log("Sending response " + $(this).serialize())
        $.ajax( {
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: function(response) {
                displayNextPokemon(response, orderNumber);
            }
        });
    });
}

function displayNextPokemon(response, orderNumber) {
    let pokemon = JSON.parse(response["next_pokemon"]);
    let types = JSON.parse(response["types"]);
    console.log(pokemon)
    console.log(types)
    let info = pokemon[0]["fields"];
    // response["types"] will be an array with one or two indices
    $("#my-number").attr("value", pokemon[0]["pk"]);
    $("#order-number").attr("value", orderNumber);
    let myTypes = "";
    for (let i = 0; i < types.length; i++) {
        myTypes += "<input type='hidden' class='my-types' value='" + 
                   types[i]["fields"]["name"] + "'>"; 
    }
    $("#current-types").html(myTypes);
    $("#my-speed").attr("value", info["speed"]);
    $("#my-name").html(info["name"].toUpperCase());
    $(".my-healthpoints").css("width", "100%");
    $(".my-healthpoints").css("background", "#2fbb00")
    $("#my-current-hp").html(info["health"])
    $("#my-start-hp").html(info["health"])
    $(".back-sprite").attr("src", info["back_sprite"])
    $("#pokemon").attr("value", info["name"])
    $(".display").html(
        "<h3 class='textbox'>What will " + info["name"].toUpperCase() + " do?</h3>"
    );
    $(".options").toggle();
}

$(document).ready(function() {
    displayMoves();
});
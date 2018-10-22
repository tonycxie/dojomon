$(document).ready(function() {
    $("#moves_form").click(function(e) {
        e.preventDefault();
        $.ajax( {
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: function(serverResponse) {
                console.log(serverResponse);
                $(".textbox").hide();
                let types = [
                    "bug", 
                    "dark", 
                    "dragon", 
                    "electric", 
                    "fairy", 
                    "fighting", 
                    "fire", 
                    "flying",
                    "ghost",
                    "grass",
                    "ground",
                    "ice",
                    "normal",
                    "poison",
                    "psychic",
                    "rock",
                    "steel",
                    "water"
                ];
                let content = "<div class='row'>";
                for (let i = 0; i < serverResponse.length; i++) {
                    content += "<div class='col move'>";
                    content += "<h3>" + serverResponse[i]["fields"]["name"] + "</h3>";
                    content += "<p>" + types[serverResponse[i]["fields"]["moves_type"]] + 
                        ", Power:" + serverResponse[i]["fields"]["power"] + "</p>";
                    content += "<p>" + serverResponse[i]["fields"]["pp"] + "/" + 
                        serverResponse[i]["fields"]["pp"];
                    content += "</div>";
                    if (i == 1) {
                        content += "</div><div class='row'>";
                    }
                }
                content += "</div>";
                $(".display").html(content);
            }
        })
    });
});

{/* 
<div class="row">
<div class="col move">
    <h3>scratch</h3>
    <p>Type Power</p>
    <p>10/10</p>
</div>
<div class="col move">
    <h3>ember</h3>
    <p>Type Power</p>
    <p>10/10</p>
</div>
</div>
<div class="row">
<div class="col move">
    <h3>fire-fang</h3>
    <p>Type Power</p>
    <p>10/10</p>
</div>
<div class="col move">
    <h3>flame-charge</h3>
    <p>Type Power</p>
    <p>10/10</p>
</div>
</div> 
*/}
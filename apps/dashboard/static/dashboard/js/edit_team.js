function addToTeam() {
    $("#add-pokemon").submit(function(e) {
        e.preventDefault();
        $.ajax( {
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: function(response) {
                console.log(response);
                if (response) {
                    $("#player-party").append(
                        // <div class="pokemon-wrapper row">
                        //     <div class="pokemon-img col-3">
                        //         <img src="{{sprite.front_sprite}}">
                        //     </div>
                        //     <p class="name col-7">{{sprite.name}}</p>
                        //     <form action="/dashboard/remove_team" method="post" class="col-2 remove-pokemon">
                        //         <input type="hidden" name="remove-id" class="remove-id" value="{{ sprite.id }}">
                        //         <button class="btn" type="submit"><i class="fa fa-minus" aria-hidden="true"></i>
                        //         </button>
                        //     </form>
                        // </div>
                        "<div class='pokemon-wrapper row'>" + 
                            "<div class='pokemon-img col-3'>" + 
                                "<img src='" + response[0]["fields"]["front_sprite"] + "'>" + 
                            "</div>" + 
                            "<p class='name col-7'>" + response[0]["fields"]["name"] + "</p>" + 
                            "<form action='/dashboard/remove_team' method='post' class='col-2 remove-pokemon'>" +
                                "<input type='hidden' name='remove-id' id='remove-id' value='" + response[0]["pk"] + "'>" +
                                "<button class='btn' type='submit'><i class='fa fa-minus' area-hidden='true'></i></button>" + 
                            "</form>" +     
                        "</div>"
                    );
                }
            }
        });
    });
}

function removeFromTeam() {
    $(".remove-pokemon").submit(function(e) {
        e.preventDefault();
        $.ajax( {
            url: $(this).attr("action"),
            method: "post",
            data: $(this).serialize(),
            success: function(response) {
                console.log(response);
                // doesn't do this dynamically
                $(this).html("");
                $(this).parent().remove();
            }
        });
    });
}

$(document).ready(function() {
    $(".sprite-img").click(function() {
        let id = parseInt( $(this).attr("src").match(/\d+/), 10 );
        $("#add").html(
            "<form action='/dashboard/add_to_team' method='post' id='add-pokemon'>" +
                "<input type='hidden' name='add-id' id='add-id' value='" + id + "'>" + 
                "<button type='submit'>+</button>" +
            "</form>"
        );
        addToTeam();
        removeFromTeam();
    });
});
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
                        "<div class='pokemon-wrapper'>" + 
                            "<div class='pokemon-img'>" + 
                                "<img src='" + response[0]["fields"]["front_sprite"] + "'>" + 
                            "</div>" + 
                            "<p class='name'>" + response[0]["fields"]["name"] + "</p>" + 
                        "</div>"
                    );
                }
            }
        });
    });
}

$(document).ready(function() {
    $(".sprite-img").click(function() {
        let id = parseInt( $(this).attr("src").match(/\d+/), 10 );
        $("#add").html(
            "<form action='/dashboard/add_to_team' method='post' id='add-pokemon'>" +
                "<input type='hidden' name='id' id='id' value='" + id + "'>" + 
                "<button type='submit'>+</button>" +
            "</form>"
        );
        addToTeam();
    });
});
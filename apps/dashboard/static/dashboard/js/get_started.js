$(document).ready(function() {
    $(".pokeballs").hover(
        function() {
            $(this).attr("src", "/static/dashboard/images/" + $(this).attr("id") + ".png")
        },
        function() {
            $(this).attr("src", "/static/dashboard/images/pokeball.png")
        }
    );
    $(".pokeballs").click(function() {
        $(".starters").hide();
        let pokemon = $(this).attr('id');
        $(".select").html("<img src='/static/dashboard/images/" + pokemon 
            + ".png' class='pokeballs' id='" + pokemon + "'>");
        $(".select").append("<h2>Do you want " + pokemon.charAt(0).toUpperCase() 
            + pokemon.slice(1) + " to be your starter?</h2>");
        // if yes, add charmander to team and render new page
        $(".select").append("<a id='yes' class='btn btn-success'  href='/dashboard/add_team/" + pokemon + "'>Yes</a>");
        // if no, go back to select page
        $(".select").append("<button class='btn btn-danger' id='no'>No</button>");
        $("#no").click(function() {
            $(".starters").show();
            $(".select").html("");
        });
    }); 
})
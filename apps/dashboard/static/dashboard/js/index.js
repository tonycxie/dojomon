function startTime() {
    let date = new Date();
    let hour = date.getHours();
    if(hour > 12) {
        hour -= 12;
    }
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    minutes = checkTime(minutes);
    seconds = checkTime(seconds)
    let t = hour + ":" + minutes + ":" + seconds;

    let today = date.toDateString();
    $("#time").text(t);
    $("#date").text(today);

    let time = setTimeout(startTime, 500);

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i}
        ;  // add zero in front of numbers < 10
        return i;
    }
}

$(document).ready(function () {
    $("#collapse-btn").click(function () { 
        $('#sidebar').toggleClass('active');
    });
    console.log("logged")
    startTime();
});
var seconds = 0

//inicio del temporizador en 1 segundo
var timer = setInterval(upTimer, 1000);

function upTimer() {

    ++seconds;

    var hour = Math.floor(seconds / 3600);

    var minute = Math.floor((seconds - hour * 3600) / 60);

    var updSecond = seconds - (hour * 3600 + minute * 60);

    document.getElementById("contador_tiempo").innerHTML = hour + ":" + minute + ":" + updSecond;
}

var seconds = 0

//inicio del temporizador en 1 segundo
var timer = setInterval(upTimer, 1000);

function upTimer() {

    ++seconds;

    var hour = "0" + Math.floor(seconds / 3600);

    var minute = "0" + Math.floor((seconds - hour * 3600) / 60);

    var updSecond = "0" + seconds - (hour * 3600 + minute * 60);

    document.getElementById("contador_tiempo").innerHTML = hour + ":" + minute + ":" + updSecond;
}

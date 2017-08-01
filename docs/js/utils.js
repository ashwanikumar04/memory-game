var isDebug = true;

function log(data) {
    if (isDebug) {
        console.log(data);
    }
}

function formatDate(time) {
    var decisec = Math.floor(time / 100) + '';
    var second = Math.floor(time / 1000);
    var minute = Math.floor(time / 60000);
    decisec = decisec.charAt(decisec.length - 1);
    second = second - 60 * minute + '';
    return ((minute < 10) ? "0" + minute : minute) + ':' + ((second < 10) ? "0" + second : second) + ':' + ((decisec < 10) ? "0" + decisec : decisec);
}
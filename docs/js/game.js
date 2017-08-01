$(document).ready(function () {

});
var currentTimer;

function startGame() {
    $('#splash').addClass('hide');
    $('#game').removeClass('hide');
    $('#cards').empty();
    notify("");
    var displayCards = makeDisplayCard();
    _(displayCards).forEach(function (card) {
        card.displayHtml().appendTo("#cards");
    })
    refresh();
    if (currentTimer) {
        currentTimer.reset();
    }
    currentTimer = new StopWatch()
    currentTimer.placeHolder = "stopWatch";
    currentTimer.start();
}
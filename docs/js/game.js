var currentTimer;

$(document).ready(function () {

});

/**
 * This method starts resets the game state and starts the games
 */
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
    $.modal.close();
    if (currentTimer) {
        currentTimer.reset();
    }
    currentTimer = new StopWatch()
    currentTimer.placeHolder = "stopWatch";
    currentTimer.start();
}
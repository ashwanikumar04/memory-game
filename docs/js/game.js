var currentTimer;

$(document).ready(function () {

});

var events = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
/**
 * This method starts resets the game state and starts the games
 */
function startGame() {
    $('#splash').addClass('animated fadeOutLeft');
    $('#splash').one(events, function () {
        $(this).addClass('hide');
        $('#game').removeClass('hide');
        $('#game').addClass('animated fadeInRight');
        restartGame();

    });

}

function restartGame() {
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
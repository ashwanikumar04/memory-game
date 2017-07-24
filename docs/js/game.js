$(document).ready(function () {
    startGame();
});

function startGame() {
    $('#cards').empty();
    notify("");
    var displayCards = makeDisplayCard();
    _(displayCards).forEach(function (card) {
        card.displayHtml().appendTo("#cards");
    })
    refresh();
}
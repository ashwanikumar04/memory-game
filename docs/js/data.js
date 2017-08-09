var firstCard = null;
var secondCard = null;
var numberOfMoves = 0;
var completedIds = [];

/**
 * Function to create card object
 * @param {*} id Id of the card
 * @param {*} front front content
 * @param {*} back back content
 */
function Card(id, front, back) {
    this.id = id;
    this.front = front;
    this.back = back;
}

/**
 * Helper method to get the card id from DOM id
 * @param {*} currentId Dom Id
 */
function getCardId(currentId) {
    var splits = currentId.split("_");
    var id = splits[splits.length - 1];
    return id;
}

/**
 * Helper method to flip the card
 * @param {*} id Card id
 * @param {*} isFront Flag to check if to flip front or back
 */
function flip(id, isFront) {
    if (isFront) {
        $('#' + 'front_inner_' + id).removeClass('hide');
        $('#' + 'back_inner_' + id).addClass('hide');
    } else {
        $('#' + 'front_inner_' + id).addClass('hide');
        $('#' + 'back_inner_' + id).removeClass('hide');
    }
}

/**
 * Method to update the game play status
 * @param {*} message Message to be shown
 */
function notify(message) {
    $('#status').text(message);
}

/**
 * Resets for a new game play
 */

function refresh() {
    firstCard = null;
    secondCard = null;
    completedIds = [];
    numberOfMoves = 0;
    showMovesAndRating();
}

/**
 * Helpers method to reset cards
 */
function reset() {
    firstCard = null;
    secondCard = null;
}

/**
 * Resets the cards
 */
function resetState() {
    flip(firstCard, true);
    flip(secondCard, true);
    reset();
}

/**
 * Helper method to update the moves and rating
 */
function showMovesAndRating() {
    $('.numberOfMoves').text(numberOfMoves);
    var stars = 0;
    var textColor = "#00ff00";
    if (numberOfMoves <= 10) {
        stars = 3;
    } else if (numberOfMoves > 10 && numberOfMoves <= 14) {
        stars = 2;
        textColor = "#ffbe00"
    } else {
        stars = 1;
        textColor = "#ff0000";
    }
    var starsDisplay = [];
    for (var index = 1; index <= stars; index++) {
        starsDisplay.push('<span class="pointer text-center" style="color:' + textColor + ';"><i class="fa fa-star"></i></span>')
    }
    for (var index = stars; index < 3; index++) {
        starsDisplay.push('<span class="pointer text-center"><i class="fa fa-star"></i></span>')
    }
    $('.rating').html(starsDisplay.join(' '));
}

/**
 * Animates the cards
 * @param {*} animation Animation 
 */
function animateCards(animation) {
    var firstCardId = firstCard;
    var secondCardId = secondCard;
    $('#' + firstCardId).addClass(animation);
    $('#' + firstCardId).one(events, function () {
        $('#' + firstCardId).removeClass(animation);
    });

    $('#' + secondCardId).addClass(animation);
    $('#' + secondCardId).one(events, function () {
        $('#' + secondCardId).removeClass(animation);
    });
}

/**
 * Validates a move by the player
 * @param {*} obj Card dom object
 */
function validate(obj) {
    var id = $(obj).attr("id");
    log(id);
    notify("");
    if ($(obj).hasClass('show')) {
        return;
    }
    if (firstCard == null) {
        if (_.indexOf(completedIds, getCardId(id)) === -1) {
            firstCard = id;
            $('#' + firstCard).addClass('show');
            flip(id, false);
        } else {
            notify("This is already discovered.");
        }
    } else {
        numberOfMoves++;
        showMovesAndRating();
        secondCard = id;
        if (firstCard === secondCard) {
            secondCard = null;
            notify("Please select a different card.")
            return;
        }
        var oldId = getCardId(firstCard);
        var currentId = getCardId(secondCard);
        flip(secondCard, false);
        if (oldId === currentId) {
            completedIds.push(currentId);
            $('#' + firstCard).addClass('show');
            $('#' + secondCard).addClass('show');
            animateCards('animated rubberBand');
            reset();
        } else {
            animateCards('animated wobble');
            $('#' + firstCard).removeClass('show');
            setTimeout(function () {
                resetState();
            }, 500);
        }
        if (completedIds.length === 8) {
            notify("Game completed. Start a new one.");
            if (currentTimer) {
                currentTimer.stop();
            }
            $("#gameFinish").modal({
                escapeClose: true,
                clickClose: true,
                showClose: false
            });
        }
    }
}

/**
 * This method generates a card object with helper methods for display and flip
 * @param {*} id  Id for the card
 * @param {*} type Type (front/back)
 * @param {*} back Content for back side
 */
function DisplayCard(id, type, back) {
    this.id = id;
    this.front = "fa-question";
    this.back = back.indexOf("fa-") >= 0 ? '<i class="fa ' + back + ' fa-5x"></i>' : back;
    var currentCard = this;
    this.displayHtml = function () {
        return $('<div/>', {
            'id': 'card_' + type + "_" + currentCard.id,
            'class': '',
            'style': 'cursor:pointer;font-weight:bold;',
            'html': '<div class="col-sm-3 text-center">' +
                ' <div class="card" id="' + 'inner_card_' + type + "_" + currentCard.id + '">' +
                '<div class="front panel panel-primary well" id="' + 'front_inner_card_' + type + "_" + currentCard.id + '">' +
                '<div class="panel-body text-center">' +
                '<i class="fa ' + currentCard.front + ' fa-5x"></i>' +
                '</div>' +
                '</div>' +
                '<div class="back panel panel-primary well hide" id="' + 'back_inner_card_' + type + "_" + currentCard.id + '">' +
                '<div class="panel-body ">' +
                currentCard.back +
                '</div>' +
                '</div>' +
                '</div></div>',
            'click': function () {
                validate($(this)[0]);
            },
            'mouseenter': function () {},
            'mouseleave': function () {}
        });
    }
}

/**
 * List of cards
 */
function cards() {
    var cardsArray = [];
    cardsArray.push(new Card(1, "fa-bicycle", {
        text: "Bicycle"
    }))

    cardsArray.push(new Card(2, "fa-bus", {
        text: "Bus"
    }))

    cardsArray.push(new Card(3, "fa-car", {
        text: "Car"
    }))

    cardsArray.push(new Card(4, "fa-motorcycle", {
        text: "Motorcycle"
    }))

    cardsArray.push(new Card(5, "fa-ship", {
        text: "Ship"
    }))

    cardsArray.push(new Card(6, "fa-train", {
        text: "Train"
    }))

    cardsArray.push(new Card(7, "fa-plane", {
        text: "Plane"
    }))

    cardsArray.push(new Card(8, "fa-truck", {
        text: "Truck"
    }))

    return cardsArray;

}

/**
 * Helper method to shuffle the cards
 */
function makeDisplayCard() {
    var currentCards = cards();
    var displayCards = [];
    _(currentCards).forEach(function (card) {
        displayCards.push(new DisplayCard(card.id, 'front', card.front));
        displayCards.push(new DisplayCard(card.id, 'back', card.back.text));
    })
    return _.shuffle(displayCards);
}
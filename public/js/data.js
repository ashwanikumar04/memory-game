function card(id, front, back) {
    this.id = id;
    this.front = front;
    this.back = back;
}
var firstCard = null;
var secondCard = null;

function getCardId(currentId) {
    var splits = currentId.split("_");
    var id = splits[splits.length - 1];
    return id;
}

function flip(id, isFront) {
    if (isFront) {
        $('#' + 'front_inner_' + id).removeClass('hide');
        $('#' + 'back_inner_' + id).addClass('hide');
    } else {
        $('#' + 'front_inner_' + id).delay(0).addClass('hide');
        $('#' + 'back_inner_' + id).delay(0).removeClass('hide');
    }
}

function notify(message) {
    $('#status').text(message);
}

function refresh() {
    firstCard = null;
    secondCard = null;
    completedIds = [];
}
var completedIds = [];

function resetState() {
    flip(firstCard, true);
    flip(secondCard, true);
    reset();
}

function reset() {
    firstCard = null;
    secondCard = null;
}

function validate(obj) {
    var id = $(obj).attr("id");
    notify("");
    if (firstCard == null) {
        console.log(completedIds);
        console.log(getCardId(id));
        if (_.indexOf(completedIds, getCardId(id)) === -1) {
            firstCard = id;
            flip(id, false);
        } else {
            notify("This is already discovered.");
        }
    } else {
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
            reset();
        } else {
            setTimeout(function () {
                resetState();
            }, 300);
        }
        if (completedIds.length === 8) {
            notify("Game completed. Start a new one.");
        }
    }
}

function displayCard(id, type, back) {
    this.id = id;
    this.front = "fa-question";
    this.back = back.indexOf("fa-") >= 0 ? '<i class="fa ' + back + ' fa-5x"></i>' : back;
    var currentCard = this;
    this.displayHtml = function () {
        return $('<div/>', {
            'id': 'card_' + type + "_" + currentCard.id,
            'class': 'myClass',
            'style': 'cursor:pointer;font-weight:bold;',
            'html': '<div class="col-sm-3">' +
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
            'mouseenter': function () {
                $(this).css('color', 'red');
            },
            'mouseleave': function () {
                $(this).css('color', 'black');
            }
        });
    }
}


function cards() {
    var cardsArray = [];
    cardsArray.push(new card(1, "fa-bicycle", {
        text: "Bicycle"
    }))

    cardsArray.push(new card(2, "fa-bus", {
        text: "Bus"
    }))

    cardsArray.push(new card(3, "fa-car", {
        text: "Car"
    }))

    cardsArray.push(new card(4, "fa-motorcycle", {
        text: "Motorcycle"
    }))

    cardsArray.push(new card(5, "fa-ship", {
        text: "Ship"
    }))

    cardsArray.push(new card(6, "fa-train", {
        text: "Train"
    }))

    cardsArray.push(new card(7, "fa-plane", {
        text: "Plane"
    }))

    cardsArray.push(new card(8, "fa-truck", {
        text: "Truck"
    }))

    return cardsArray;

}

function makeDisplayCard() {
    var currentCards = cards();
    var displayCards = [];
    console.log(currentCards);

    _(currentCards).forEach(function (card) {
        displayCards.push(new displayCard(card.id, 'front', card.front));
        displayCards.push(new displayCard(card.id, 'back', card.back.text));
    })

    console.log(displayCards);
    return _.shuffle(displayCards);
}
# memory-game
A simple game to help you improve your memory


<!-- TOC -->

- [memory-game](#memory-game)
    - [Steps to run](#steps-to-run)
    - [Dependecies](#dependecies)
    - [Rules](#rules)

<!-- /TOC -->

![Memory game](/screenshots/game.png?raw=true "Memory game")

## Steps to run

```
npm install
```

```
node app.js
```

The game is available [here](http://git.ashwanik.in/memory-game/)

## Dependecies

- [jQuery](https://jquery.com/)
- [jQuery Modal](http://jquerymodal.com/)
- [Bootstrap](http://getbootstrap.com/)
- [FontAwesome Icons](http://fontawesome.io/icons/)
- [Lodash](http://lodash.com/)


## Rules

- Games contains 8 pairs which are shown as 16 cards.
- Match the cards in shortest time.
- Rating
    * If number of moves to complete the game are less than or equal to 10, you get **3** stars
    * If number of moves to complete the game are greater than 10 and less than or equal to 14, you get **2** stars
    * If number of moves to complete the game are more than 14, you get **1** star
   
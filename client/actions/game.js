import * as actionTypes from '../actionTypes/game.js';

function shuffle(array) {
  var counter = array.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

function createCardValues(array) {
  const result = [];
  for(let i=0; i<array.length; i++){
    let card = {
      id: i,
      url: array[i],
      visible: false
    };
    result.push(card);
  }
  return result;
}

export function startGame () {
  return async dispatch => {
    const startTime = new Date();
    try {
      dispatch({
        type: actionTypes.START_GAME,
        showBoard: true,
        showTimer: true,
        pairsLeft: 10,
        gameCompleted: false,
        startTime: startTime,
        elapsed: 0
      });
    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.START_GAME_ERROR,
        ERROR: e
      });
    }
  };
}

export function createCards () {
  return async dispatch => {
    const cardArt = [
      '131.gif',
      '197.gif',
      '314.gif',
      '186.gif',
      '258.gif',
      '290.gif',
      '291.gif',
      '249.gif',
      '286.gif',
      '274.gif'
    ];

    cardArt.map(file => require(`../../dev/${file}`));

    const shuffledCardArt = shuffle(cardArt.concat(cardArt));
    const cardValues = createCardValues(shuffledCardArt);
    try {
      dispatch({
        type: actionTypes.CREATE_CARDS,
        cardValues: cardValues
      });
    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.CREATE_CARDS_ERROR,
        ERROR: e
      });
    }
  };
}

export function revealCard (id, values) {
  return async dispatch => {
    values[id].visible = true;
    try {
      dispatch({
        type: actionTypes.REVEAL_CARD,
        cardValues: values
      });
    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.REVEAL_CARD_ERROR,
        ERROR: e
      });
    }
  };
}

export function setCardToMatch (card) {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.SET_CARD_TO_MATCH,
        cardToMatch: card
      });
    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.SET_CARD_TO_MATCH_ERROR,
        ERROR: e
      });
    }
  };
}

export function setElapsed (elapsed) {
  return async dispatch => {
    try {
      dispatch({
        type: actionTypes.SET_ELAPSED,
        elapsed: elapsed
      });
    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.SET_ELAPSED,
        ERROR: e
      });
    }
  };
}

export function hidePair (id1, id2, values) {
  return async dispatch => {
    values[id1].visible = false;
    values[id2].visible = false;
    try {
      dispatch({
        type: actionTypes.HIDE_PAIR,
        cardValues: values,
        cardToMatch: false
      });
    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.HIDE_PAIR_ERROR,
        ERROR: e
      });
    }
  };
}

export function scorePair (pairsLeft) {
  return async dispatch => {
    pairsLeft--;
    if(pairsLeft === 0){
      var gameCompleted = true;
      dispatch({
        type: actionTypes.END_GAME,
        showTimer: false
      });
    } else {
      var gameCompleted = false;
    }
    try {
      dispatch({
        type: actionTypes.SCORE_PAIR,
        cardToMatch: false,
        pairsLeft: pairsLeft,
        gameCompleted: gameCompleted,
        showBoard: false,
        answeredCorrectly: true
      });
      setTimeout(() => {
        dispatch({
          type: actionTypes.STOP_SOUND,
          answeredCorrectly: false
        });
      }, 1000);
    } catch(e) {
      const notifications = e.error;
      dispatch({
        type: actionTypes.SCORE_PAIR_ERROR,
        ERROR: e
      });
    }
  };
}


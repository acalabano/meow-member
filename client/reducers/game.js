import * as actionTypes from '../actionTypes/game';
import merge from 'lodash.merge';

const initialState = {
  UI: {
    showBoard: false,
    showTimer: false,
    answeredCorrectly: false,
  },
  data: {
    cardValues: [],
    cardToMatch: false,
    pairsLeft: 10,
    gameCompleted: false,
    startTime: false,
    endTime: false,
    elapsed: 0,

  }
};

const startGame = (state, action) => {
  return merge({}, state, {
    UI: {
      showBoard: action.showBoard,
      showTimer: action.showTimer
    },
    data: {
      startTime: action.startTime,
      gameCompleted: false
    }
  });
};

const createCards = (state, action) => {
  return merge({}, state, {
    data: {
      cardValues: action.cardValues
    }
  });
};

const revealCard = (state, action) => {
  return merge({}, state, {
    data: {
      cardValues: action.cardValues,
      cardToMatch: action.cardToMatch
    }
  });
};

const setCardToMatch = (state, action) => {
  return merge({}, state, {
    data: {
      cardToMatch: action.cardToMatch
    }
  });
};

const setElapsed = (state, action) => {
  return merge({}, state, {
    data: {
      elapsed: action.elapsed
    }
  });
};

const hidePair = (state, action) => {
  return merge({}, state, {
    data: {
      cardValues: action.cardValues,
      cardToMatch: action.cardToMatch
    }
  });
};

const scorePair = (state, action) => {
  return merge({}, state, {
    data: {
      cardValues: action.cardValues,
      cardToMatch: action.cardToMatch,
      pairsLeft: action.pairsLeft,
      gameCompleted: action.gameCompleted
    },
    UI: {
      answeredCorrectly: action.answeredCorrectly
    }
  });
};

const endGame = (state, action) => {
  return merge({}, state, {
    UI: {
      showTimer: action.showTimer,
      showBoard: action.showBoard
    }
  });
};

const stopSound = (state, action) => {
  return merge({}, state, {
    UI: {
      answeredCorrectly: action.answeredCorrectly
    }
  });
};

export default function gameboard (state = initialState, action) {
  return ({
    [actionTypes.START_GAME]: startGame,
    [actionTypes.CREATE_CARDS]: createCards,
    [actionTypes.HIDE_PAIR]: hidePair,
    [actionTypes.SET_CARD_TO_MATCH]: setCardToMatch,
    [actionTypes.SET_ELAPSED]: setElapsed,
    [actionTypes.SCORE_PAIR]: scorePair,
    [actionTypes.END_GAME]: endGame,
    [actionTypes.STOP_SOUND]: stopSound
  }[action.type] || ((s) => s))(state, action);
}
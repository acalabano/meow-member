import { combineReducers } from 'redux';
import gameboard from './game';
import notifications from './notifications';

const reducers = combineReducers({
  gameboard,
  notifications
});

export default reducers;

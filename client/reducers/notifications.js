import * as actionTypes from '../actionTypes/notifications';
import merge from 'lodash.merge';

const initialState = {
  messagesArray: [],
  show: false
};

const addNotifications = (state, action) => {
  return merge({}, state, {
    messagesArray: action.notifications,
    show: action.show
  });
};
const clearNotifications = (state, action) => {
  return merge({}, state, {
    messagesArray: action.notifications,
    show: action.show
  });
};

export default function notifications (state = initialState, action) {
  return ({
    [actionTypes.ADD_NOTIFICATIONS]: addNotifications,
    [actionTypes.CLEAR_NOTIFICATIONS]: clearNotifications

  }[action.type] || ((s) => s))(state, action);
}
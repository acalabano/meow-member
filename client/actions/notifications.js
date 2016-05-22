import * as actionTypes from '../actionTypes/notifications';

export function addNotifications (notifications) {
  return async dispatch => {
    dispatch({
      type: actionTypes.ADD_NOTIFICATIONS,
      notifications: notifications,
      show: true
    });
    const clearNotifications = notifications.splice(0, notifications.length);
    setTimeout(() => {
      dispatch({
        type: actionTypes.CLEAR_NOTIFICATIONS,
        notifications: clearNotifications,
        show: false
      });;
    }, 500);
  };
}

export function clearNotifications (notifications) {
  notifications.messagesArray.splice(0, notifications.messagesArray.length);
  return async dispatch => {
    dispatch({
      type: actionTypes.CLEAR_NOTIFICATIONS,
      notifications: notifications,
      show: false
    });
  };
}
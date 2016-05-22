import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { clearNotifications } from '../../actions/notifications';

import './notifications.scss';

  class Notifications extends Component {
    constructor (props) {
      super(props);
    }

    handleRemove () {
      console.log('werp');
      this.props.clearNotifications(this.props.notifications);
    }

    render () {
      const items = this.props.notifications.messagesArray.map(function(item, i) {
          return (
            <div className='item' key={i} >
              <div>
                {item}
              </div>
            </div>
          );
        }.bind(this));

        return (
          <div id='notifications-container'>
            <ReactCSSTransitionGroup
              transitionName='notifications'
              transitionEnterTimeout={200}
              transitionLeaveTimeout={400}
            >
            {(this.props.notifications.show
              ? <div className='message' onClick={this.handleRemove.bind(this)}>
                  {items}
                </div>
              : <div></div>
            )}
            </ReactCSSTransitionGroup>
          </div>
        );
    }

  }

  export default connect(
    (state) => ({ notifications: state.notifications }),
    { clearNotifications }
  )(Notifications);


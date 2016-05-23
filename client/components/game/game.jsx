import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Nav from '../nav/nav';
import Notifications from '../notifications/notifications';
import Answer from '../game/answer';
import Profile from '../game/profile';

import './game.scss';

class Game extends Component {
  
  render () {
    const {
      gameboard
    } = this.props;

    return (
      <div id='game-container'>
        <Nav />
        <Notifications />
        <div className='page'>
          <Profile examId={this.props.examId}/>
            <div className='row001'>
              <Answer />
            </div>
        </div>
      </div>
    );
  }

}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  { }
)(Game);

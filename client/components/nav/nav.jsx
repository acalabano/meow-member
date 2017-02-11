import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './nav.scss';

class Nav extends Component {
  render () {
    const {
      sessions
    } = this.props;

    return (
      <div id='nav'>
        <div className='nav-title'>
          <Link className='link' to='/' >M E O W - M E M B E R</Link>
        </div>
        <div className='top-scores'>
          <div className='title'>Top Scores:</div>
          <div className='content'>
            <div className='rank field'>
              1.) 
            </div>
            <div className='name field'>
              Player001 
            </div>
            <div className='time field'>
              00:97:52
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  { }
)(Nav);

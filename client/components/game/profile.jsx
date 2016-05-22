import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Timer from './timer';

import './game.scss';

class Profile extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    return (
      <div id='profile-view'>
        <div className='user-info'>
          <div>
            <span className='header'>Player Name:</span> Emissary.io
          </div>
          <div>
            <span className='header'>Lifetime Best:</span> 01:08:23
          </div>
        </div>
        {(this.props.gameboard.UI.showTimer
          ? <div className='game-status'>
              <div className='timer'>
                <Timer />
              </div>
            </div>
          : <div></div>
        )}
        {(this.props.gameboard.UI.showTimer
          ? <div className='progress-area'>
              {10 - this.props.gameboard.data.pairsLeft} of 10 pairs found!
            </div>
          : <div></div>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  {  }
)(Profile);

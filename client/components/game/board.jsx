import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { 
  revealCard, 
  hidePair, 
  setCardToMatch, 
  checkMatch, 
  scorePair,
  endGame 
} from '../../actions/game';

import { addNotifications } from '../../actions/notifications';

import './game.scss';

class Board extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div id='board'>
        {this.props.gameboard.data.cardValues.map(card => (
          <div className='gamepiece-frame' key={`${card.id}`}>
          {(card.visible
            ? <div 
              className='gamepiece'
              >
                <img src={`${card.url}`} alt=""/>
              </div>
            : <div 
              className='gamepiece-hidden'
              onClick={() => this.revealCard(card)}
              >
                Click to Reveal
              </div>
          )}
          </div>
        ))}
      </div>
    );
  }
  
  revealCard (card) {
    this.props.revealCard(card.id, this.props.gameboard.data.cardValues);
    this.forceUpdate();
    if(this.props.gameboard.data.cardToMatch){
      this.checkMatch(card);
    } else {
      this.props.setCardToMatch(card);
    }
  }

  checkMatch (card) {
    if(card.url === this.props.gameboard.data.cardToMatch.url){
      setTimeout(function () {
        this.props.scorePair(1);
        this.props.addNotifications(['YEW DIDZ DIT !!']);
        if(this.props.gameboard.data.pairsLeft > 1){
          this.forceUpdate();
        }
      }.bind(this) , 500)
    } else {
      setTimeout(function () {
        this.props.hidePair(card.id, this.props.gameboard.data.cardToMatch.id, this.props.gameboard.data.cardValues);
        this.props.addNotifications(['MEOW-STAKE !!']);
        this.forceUpdate();
      }.bind(this) , 500)
    }
  }
  
}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  { addNotifications, revealCard, hidePair, setCardToMatch, checkMatch, scorePair, endGame }
)(Board);
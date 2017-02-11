import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { 
  revealCard, 
  hidePair, 
  setCardToMatch, 
  checkMatch, 
  scorePair
} from '../../actions/game';

import { addNotifications } from '../../actions/notifications';

import './game.scss';

class Board extends Component {
  constructor (props) {
    super (props);
    this.state = {
      finishedThinking: true
    }
  }

  render () {
    return (
      <div>
        {(this.props.gameboard.UI.showBoard 
          ? <div id='board'>
              {this.props.gameboard.data.cardValues.map(card => (
                <div className='gamepiece-frame' key={`${card.id}`}>
                {(card.visible
                  ? <div 
                    className='gamepiece'
                    style={{backgroundImage: 'url(`${imageWin}`)'}}
                    >
                      <img src={`${card.url}`} alt=""/>
                    </div>
                  : <div 
                    className='gamepiece-hidden'
                    onClick={this.state.finishedThinking ? () => this.revealCard(card) : null}
                    >
                      Click to Reveal
                    </div>
                )}
                </div>
              ))}
            </div>
          : <div></div>
        )}
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
    // disable onClick to prevent errors from fast-clicking
    this.setState({finishedThinking: false});

    if(card.url === this.props.gameboard.data.cardToMatch.url){
      setTimeout(function () {
        this.props.scorePair(this.props.gameboard.data.pairsLeft);
        this.props.addNotifications(['YEW DIDZ DIT !!']);

        // enable onClick after Timeout
        this.setState({finishedThinking: true});

        if(this.props.gameboard.data.pairsLeft > 1){
          this.forceUpdate();
        }
      }.bind(this) , 300)
    } else {
      setTimeout(function () {
        this.props.hidePair(card.id, this.props.gameboard.data.cardToMatch.id, this.props.gameboard.data.cardValues);
        this.props.addNotifications(['MEOW-STAKE !!']);

        // enable onClick after Timeout
        this.setState({finishedThinking: true});

        this.forceUpdate();
      }.bind(this) , 300)
    }
  }
  
}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  { addNotifications, revealCard, hidePair, setCardToMatch, checkMatch, scorePair }
)(Board);
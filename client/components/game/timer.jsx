import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { setElapsed } from '../../actions/game';

import './game.scss';

class Timer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      timer: undefined,
      elapsed: 0
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.state.timer);
    this.setState({timer: undefined});
  }

  componentDidMount() {
    if(this.props.gameboard.data.startTime){
      var timer = setInterval(this.tick.bind(this), 33);
      this.setState({
        timer: timer,
        start: this.props.gameboard.data.startTime
      });
    }
  }

  render () {
    return (
      <div>
        {this.getTimeSpan(this.state.elapsed)}
      </div>
    );
  }
  
  getTimeSpan (elapsed) {
    var m = String(Math.floor(elapsed/1000/60)+100).substring(1);
    var s = String(Math.floor((elapsed%(1000*60))/1000)+100).substring(1);
    var ms = String(elapsed % 1000 + 1000).substring(1,3);
    return m+":"+s+"."+ms;
  }

  tick () {
    var elapsed = Date.now() - this.state.start;
    this.setState({elapsed: elapsed});
    this.props.setElapsed(this.state.elapsed);
  }

}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  { setElapsed }
)(Timer);

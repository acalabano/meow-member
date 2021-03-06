import Audio from 'react-howler';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SoundModule extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    // for DEV
    // const meowWin = require('../../../dev/meow1.m4a');

    // for PROD... need to use env vars
    const meowWin = require('../../../server/assets/meow1.m4a');
    return (
      <div>
        <Audio
          src={meowWin}
          playing={true}
        />
      </div>
    )
  }

}

export default connect(
  (state) => ({ notifications: state.notifications }),
  {  }
)(SoundModule);
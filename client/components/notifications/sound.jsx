import Audio from 'react-howler';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SoundModule extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <Audio
          src={'http://localhost:3000/meow1.m4a'}
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
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import config from '../../../server/config';

import './nav.scss';

class Nav extends Component {
	render () {
		const {
		  sessions
		} = this.props;

		return (
				<div id='nav'>
					<div className='nav-title'>
						<Link className='link' to='/' >{config.appName}</Link>
					</div>
				</div>
			);
	}
}

export default connect(
  (state) => ({ gameboard: state.gameboard }),
  { }
)(Nav);

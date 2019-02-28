import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6

const K_SIZE = 0.5;

const greatPlaceStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  borderRadius: '50%',
  backgroundColor: 'red',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 18,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle
};

export default class MyGreatPlaceWithHover extends Component {
  static propTypes = {
    // GoogleMap pass $hover props to hovered components
    // to detect hover it uses internal mechanism, explained in x_distance_hover example
    $hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  render() {
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;
    const text = this.props.$hover ? this.props.text : '';

    return <div style={style}>{text}</div>;
  }
}

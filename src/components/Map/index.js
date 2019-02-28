import React, { Component } from 'react';

import GoogleMapReact from 'google-map-react';
import Marker from './Marker.js';

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 48.864716,
      lng: 2.349014
    },
    zoom: 0
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.markers.map((marker, index) => (
            <Marker
              key={index}
              lat={marker.geometry.location.lat}
              lng={marker.geometry.location.lng}
              text={marker.formatted_address}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

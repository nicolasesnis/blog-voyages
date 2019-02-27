import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const markerStyle = {
  width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'blue'
};
const AnyReactComponent = () => <div style={markerStyle} />;

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
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} />
          <AnyReactComponent lat={32.12} lng={90.7844} />
          <AnyReactComponent lat={48.864716} lng={2.349014} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

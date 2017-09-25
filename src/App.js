import React, { Component } from 'react';
import InteractiveMap from 'react-map-gl';

var Layer = ReactMapboxGl.Layer;

class App extends Component {
  state = {
    settings: {
      dragPan: true,
      dragRotate: true,
      scrollZoom: true,
      touchZoomRotate: true,
      doubleClickZoom: true,
      minZoom: 0,
      maxZoom: 500,
      minPitch: 0,
      maxPitch: 85,
      mapStyle: 'mapbox://styles/kousiktn/cj7z8dqbd6qde2sp3yjlf58bt',
      mapboxApiAccessToken: process.env.REACT_APP_MapboxAccessToken,
    },
    viewport: {
      latitude: 49.2713350,
      longitude: -123.1491370,
      zoom: 10,
      bearing: 0,
      pitch: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    },
  }

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  render() {
    const {settings, viewport} = this.state;
    return (
      <InteractiveMap
        {...settings}
        {...viewport}
        onViewportChange={this._updateViewport}
      />
    );
  }
}

export default App;

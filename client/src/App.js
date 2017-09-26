import React, { Component } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import axios from 'axios';
import BusMarker from './BusMarker';

class App extends Component {
  _refreshBusLocations = () => {
    axios.get('/api/find-buses').then(res => {
      this.setState({busLocations: res.data});
    });
  }

  constructor(props) {
    super(props);
    this.refreshTime = 3000; // milliseconds
    this.state = {
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
        zoom: 12.5,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      busLocations: [],
    };
    this.startTimer();
  }

  _updateViewport = (viewport) => {
    this.setState({viewport: viewport});
  }

  _getBounds = () => {
    const rawBounds = this.map.getMap().getBounds();
    const bounds = {
      lat: {
        h: rawBounds._ne.lat,
        l: rawBounds._sw.lat
      },
      lon: {
        h: rawBounds._ne.lng,
        l: rawBounds._sw.lng
      }
    };
    return bounds;
  };

  _isWithinBounds = latLon => {
    const curBounds = this._getBounds();
    const curLat = parseFloat(latLon[0]);
    const curLon = parseFloat(latLon[1]);
    return (
      curLat >= curBounds.lat.l &&
      curLat <= curBounds.lat.h &&
      curLon >= curBounds.lon.l &&
      curLon <= curBounds.lon.h
    );
  };

  startTimer () {
    clearInterval(this.timer);
    this.timer = setInterval(this._refreshBusLocations.bind(this), this.refreshTime);
  }

  render() {
    const {settings, viewport, busLocations} = this.state;

    var busMarkers = busLocations.filter(this._isWithinBounds).map((location, index) => {
        return (
              <Marker latitude={parseFloat(location[0])} longitude={parseFloat(location[1])} key={index}>
                <BusMarker size={15} direction={location[2]}/>
              </Marker>
        )
      });

    return (
      <ReactMapGL
        {...settings}
        {...viewport}
        onViewportChange={this._updateViewport}
        ref={map => (this.map = map)}
      >
        {busMarkers}
      </ReactMapGL>
    );
  }
}

export default App;

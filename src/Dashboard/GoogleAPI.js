import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const { google, location } = this.props;
    return (
      <Map
        google={google}
        zoom={10}
        containerStyle={{
          maxWidth: "720px",
          height: "720px",
        }}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
        center={location}
      >
        <Marker position={location} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBYGXxLOtdMwQOMweVeL6qhDWieQBV6C_k",
})(MapContainer);

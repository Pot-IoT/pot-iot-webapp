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
          position: "relative",
          maxWidth: "720px",
          height: "720px",
        }}
        initialCenter={JSON.parse(location)}
        center={JSON.parse(location)}
      >
        <Marker position={JSON.parse(location)} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBYGXxLOtdMwQOMweVeL6qhDWieQBV6C_k",
})(MapContainer);

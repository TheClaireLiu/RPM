"use client";
import * as React from "react";
import Mapbox from "react-map-gl";

export default function Map() {
  const [viewState, setViewState] = React.useState({
    longitude: -79.3359424,
    latitude: 43.8444273,
    zoom: 15
  });
  return (
    <Mapbox
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

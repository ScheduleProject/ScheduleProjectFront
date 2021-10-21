import React from 'react';
import MapView, { Marker } from 'react-native-maps';

function mapBox({ lat, long, name}) {
  return (
    <MapView
      initialRegion={{
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
    <Marker coordinate = {{latitude: lat,longitude: long}}
         title={name}/>
    </MapView>
  );
}

export default mapBox;
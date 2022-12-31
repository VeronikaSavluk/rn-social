import React from "react";
import {View} from 'react-native';
import MapView, { Marker } from "react-native-maps";

import {styles} from '../../styles';

const MapScreen = () => {
	return (
		<View style={styles.container}>
			<MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel = {15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        <Marker
          title="I'm here"
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          description='Hello'
        />
      </MapView>
		</View>
	)
};

export default MapScreen;
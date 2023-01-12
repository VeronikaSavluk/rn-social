import React from "react";
import {View} from 'react-native';
import MapView, { Marker } from "react-native-maps";

import {styles} from '../../styles';

const MapScreen = ({route}) => {
	const title = route.params.title;
  const locationTitle = route.params.locationTitle;
  const {
    latitude,
    longitude
  } = route.params.location;
  
  return (
		<View style={styles.screenContainer}>
			<MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          title={locationTitle}
          coordinate={{ latitude: latitude, longitude: longitude }}
          description={title}
        />
      </MapView>
		</View>
	)
};

export default MapScreen;
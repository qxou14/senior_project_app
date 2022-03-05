import * as React from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions, Pressable, Text } from 'react-native';
import { useEffect, useState, Component } from "react";
import * as Location from 'expo-location';
import * as Permissions from "expo-permissions"
import { auth, db } from "../firebase";

const LOCATION_TASK_NAME = "background-location-task";

class PMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
    };
  }

  _getLocationAsync = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      enableHighAccuracy: true,
      distanceInterval: 5,
      timeInterval: 50000
    });
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 5,
        timeInterval: 50000
      },
      newLocation => {
        let { coords } = newLocation;
        //console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.00,
          longitudeDelta: 0.007
        };
        this.setState({ region: region });
      },
      error => console.log(error)
    );
    return this.location;
  };

  async componentWillMount() {
    // Asking for device location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Location services needed" });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style = {styles.maps}
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}>
          
          </MapView>
          
          <View
            style = {{
                position: 'absolute',
                top: '80%',
            }}
          >
            <Pressable
                style={styles.button}
                onPress={() => console.log("Navigate Home pressed")}
            >
                <Text style={styles.buttonText}>Navigate Home</Text>
            </Pressable>
          </View>
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E6EAE4",
        alignItems: 'center',
      },

    maps: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    button: {
      alignItems: "center",
      backgroundColor: "#5DB075",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
      marginBottom: 20,
    },

    buttonText: {
      fontSize: 30,
      fontWeight: "bold",
      letterSpacing: 0.25,
      color: "white",
    },
});

export default PMaps;

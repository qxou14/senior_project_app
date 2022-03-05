import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { StyleSheet, View, Dimensions, Pressable, Text} from 'react-native';
import { useEffect, useState, Component } from "react";
import * as Location from 'expo-location';
import * as Permissions from "expo-permissions"
import { auth, db } from "../firebase";

const LOCATION_TASK_NAME = "background-location-task";
const LATITUDE = 40.8200;
const LONGITUDE = -73.94937;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = .007;

class CMaps extends Component {
  constructor(props) {
    super(props);
    this.docs = db.collection('Locations');
    this.state = {
      region: null,
      pCoord: null,
      patientCoord: {latitude: 0, longitude: 0},
      testRegion: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
      },
      error: '',
    };
  }

  onRegionChangeComplete(region) {
    this.setState({ region });
  }

  animateToRegion(region) {
    this.map.animateToRegion(region, 2000);  
  }

  retrieveData() {
    const ref = db.collection('Locations').where("key","==","mohfuj234@gmail.com");

    ref.onSnapshot((query) => {
        const objs = [];
        
        query.forEach((doc) => {
          objs.push({
            key: doc.id,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            email: doc.data().email,
          });
        });

        let patientCoords = {latitude: objs[0].latitude, longitude: objs[0].longitude}
        let patientRegion = {latitude: objs[0].latitude, longitude: objs[0].longitude, latitudeDelta: .009, longitudeDelta: .007}
        //console.log(patientCoords)
        this.setState({patientCoord : patientCoords}, function() {
            console.log(this.state.patientCoord)
        })

        this.setState({patientRegion : patientRegion}, function() {
            console.log(this.state.patientRegion)
        })
        //console.log(this.state.patientCoord)
    })  
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
          latitudeDelta: 0.009,
          longitudeDelta: 0.007
        };
        this.setState({ region: region });
      },
      error => console.log(error)
    );
    return this.location;
  };

  
  _setCoordinates = async () => {
    
    this.retrieveData()
    console.log(this.state.patientCoord)
    let pCoord = {
        latitude: 42.009,
        longitude: -73.9497,
    }
    //console.log(pCoord)  
    console.log(this.state.patientCoord)
    this.setState({pCoord: pCoord})
  }

  async componentWillMount() {
    // Asking for device location permission
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    //const [pCoord, setPcoord] = useState([]);

    if (status === "granted") {
        this.retrieveData();
        this._getLocationAsync();
        //this._setCoordinates();
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
          onRegionChangeComplete =  {region => this.onRegionChangeComplete({ region }) }
          ref={map => { this.map = map; } }>
          
          <Marker
            coordinate = { this.state.patientCoord }
            title = { 'Patients Location' }
          />

          </MapView>
          
          <View
            style = {{
                position: 'absolute',
                top: '75%',
            }}
          >
            <Pressable
                style={styles.button}
                onPress={() => this.animateToRegion(this.state.patientRegion)}
            >
                <Text style={styles.buttonText}>Locate Patient</Text>
            </Pressable>
            
            <Pressable
                style={styles.button}
                onPress={() => this.retrieveData()}
            >
                <Text style={styles.buttonText}>Testing Data</Text>
            </Pressable>
          </View>

            
      </View>
    );
  }
}

/*
export default function PMaps() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    return (
        <View style = {styles.container}>
            <MapView style = {styles.maps}
                     initialRegion = {{
                         latitude: location.coords.latitude,
                         longitude: location.coords.longitude,
                         latitudeDelta: 0.0922,
                         longitudeDelta: 0.0421,
                     }} />
        </View>
    );
}
*/

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

export default CMaps;
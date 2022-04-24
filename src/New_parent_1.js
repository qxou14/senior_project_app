import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
import { auth } from "../firebase";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, 
         Montserrat_400Regular,
         Montserrat_500Medium,
         Montserrat_600SemiBold,
         Montserrat_700Bold,
       } from '@expo-google-fonts/montserrat';

Feather.loadFont();
MaterialCommunityIcons.loadFont();
FontAwesome.loadFont();

const dimensions = Dimensions.get("screen");

export default function Patient_content({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home");
        console.log("User signing out");
      })
      .catch((error) => alert(error.message));
  };

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>

      <LinearGradient
          // Background Linear Gradient
          colors={["#f5fcfe", "#D7FFEB"]}
          style={styles.background}
          start = {[0.0, 0.1]}
        />

      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.left}>
            <Feather
              name="settings"
              size={56}
              onPress={() => navigation.navigate("Profile_patient")}
            />
            <Text style={styles.leftword}>Profile</Text>
          </View>

          <MaterialCommunityIcons
            name="arrow-right"
            size={56}
            onPress={() => navigation.navigate("Patient_Content2")}
          />

          <View style={styles.right}>
            <MaterialCommunityIcons
              name="logout"
              size={56}
              onPress={handleSignOut}
            />
            <Text style={styles.leftword}>Log Out</Text>
          </View>
        </View>
      </SafeAreaView>

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonSchedule}
          onPress={() => navigation.navigate("Todo")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="list-alt" size={100} />
          </View>
          <Text style={styles.buttonText}>Schedule</Text>
        </Pressable>
      </View>

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonGames}
          onPress={() => navigation.navigate("patient_question")}
        >
          <View style={styles.iconStyle}>
            <MaterialCommunityIcons name="brain" color="red" size={120} />
          </View>
          <Text style={styles.buttonText}> Games</Text>
        </Pressable>
      </View>

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonMaps}
          onPress={() => navigation.navigate("PatientMaps")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="map" size={100} />
          </View>
          <Text style={styles.buttonText}>Maps</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    marginBottom: 40,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  firstLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 35,
  },

  iconStyle: {
    marginRight: 30,
  },

  buttonSchedule: {
    alignItems: "center",
    backgroundColor: "#68D8E7",
    height: dimensions.height * 0.18,
    width: dimensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "black",
    elevation: 10,
  },
  buttonGames: {
    alignItems: "center",
    backgroundColor: "#69FFD2",
    height: dimensions.height * 0.18,
    width: dimensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "black",
    elevation: 10,
  },

  buttonMaps: {
    alignItems: "center",
    backgroundColor: "#CCFFCC",
    height: dimensions.height * 0.18,
    width: dimensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 0.5,
    backgroundColor: "#FFFF9B",
    backgroundColor: "#A5DAFE",
    elevation: 10,
  },

  buttonText: {
    marginTop: 5,
    fontSize: 38,
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },

  left: {
    alignItems: "center",
  },
  right: {
    alignItems: "center",
  },

  leftword: {
    marginTop: 5,
    fontSize: 20,
    color: "black",
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
  },
});

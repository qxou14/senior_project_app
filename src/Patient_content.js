import { StyleSheet, View, Button, Alert, Pressable, Text } from "react-native";
import { auth } from "../firebase";
import Input_button from "./Input_button";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { storageBucket } from "../keys";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonItem from "./compnents/ButtonItem";
import { useFonts } from "expo-font";

Feather.loadFont();
MaterialCommunityIcons.loadFont();
FontAwesome.loadFont();

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

  const [loaded] = useFonts({
    Sans: require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
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
          <FontAwesome name="list-alt" size={50} />

          <Text style={styles.buttonText}>Schedule</Text>
        </Pressable>

        <Pressable
          style={styles.buttonAlbums}
          onPress={() => console.log("album")}
        >
          <FontAwesome name="file-picture-o" size={50} />
          <Text style={styles.buttonText}>Albums</Text>
        </Pressable>
      </View>

      <View style={styles.SecondLayer}>
        <Pressable
          style={styles.buttonEmergency}
          onPress={() => navigation.navigate("patient_question")}
        >
          <MaterialCommunityIcons name="brain" color="red" size={50} />
          <Text style={styles.buttonText}>Game </Text>
        </Pressable>

        <Pressable
          style={styles.buttonReminders}
          onPress={() => console.log("From Register")}
        >
          <FontAwesome name="calendar" size={50} />
          <Text style={styles.buttonText}>Reminders</Text>
        </Pressable>
      </View>

      <View style={styles.ThirdLayer}>
        <Pressable
          style={styles.buttonMaps}
          onPress={() => navigation.navigate("PatientMaps")}
        >
          <FontAwesome name="map" size={50} />

          <Text style={styles.buttonText}>Maps</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 40,
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
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontFamily: "Sans",
  },

  firstLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginTop: 45,
    marginLeft: 15,
    marginRight: 15,
  },

  SecondLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginLeft: 15,
    marginRight: 15,
  },

  ThirdLayer: {
    alignItems: "center",

    marginLeft: 15,
    marginRight: 15,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 35,
  },

  buttonSchedule: {
    alignItems: "center",
    backgroundColor: "#68D8E7",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonAlbums: {
    alignItems: "center",
    backgroundColor: "#FFFF9B",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonGames: {
    alignItems: "center",
    backgroundColor: "#69FFD2",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonReminders: {
    alignItems: "center",
    backgroundColor: "#ACA4FF",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonMaps: {
    alignItems: "center",
    backgroundColor: "#A5DAFE",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonEmergency: {
    alignItems: "center",
    backgroundColor: "#68D8E7",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonText: {
    marginTop: 5,
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
    fontFamily: "Sans",
  },
});

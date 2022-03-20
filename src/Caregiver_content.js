import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import { auth } from "../firebase";
import Input_button from "./Input_button";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

Feather.loadFont();
MaterialCommunityIcons.loadFont();

export default function Caregiver_content({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home");
        console.log("User signing out");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <Feather
            name="settings"
            size={56}
            onPress={() => console.log("From Register")}
          />
          <MaterialCommunityIcons
            name="logout"
            size={56}
            onPress={handleSignOut}
          />
        </View>
      </SafeAreaView>

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonAlbum}
          onPress={() => navigation.navigate("C_Album")}
        >
          <FontAwesome name="file-picture-o" size={50} />
          <Text style={styles.buttonText}>Album</Text>
        </Pressable>

        <Pressable
          style={styles.buttonMaps}
          onPress={() => navigation.navigate("CaregiverMaps")}
        >
          <FontAwesome name="map" size={50} />
          <Text style={styles.buttonText}>Maps</Text>
        </Pressable>
      </View>

      <View style={styles.SecondLayer}>
        <Pressable
          style={styles.buttonFeedback}
          onPress={() => console.log("From Register")}
        >
          <FontAwesome name="comment" size={50} />
          <Text style={styles.buttonText}>Feedback</Text>
        </Pressable>

        <Pressable
          style={styles.buttonSchedule}
          onPress={() => navigation.navigate("Todo_Giver")}
        >
          <FontAwesome name="list-alt" size={50} />
          <Text style={styles.buttonText}>Scheduler</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("question")}>
          <FontAwesome name="list-alt" size={50} />
          <Text style={styles.buttonText}>question</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EAE4",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    alignItems: "center",
    paddingHorizontal: 40,
  },

  firstLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginTop: 180,
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

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonAlbum: {
    alignItems: "center",
    backgroundColor: "#FFFF9B",
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

  buttonFeedback: {
    alignItems: "center",
    backgroundColor: "#FFDE6D",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonSchedule: {
    alignItems: "center",
    backgroundColor: "#CCFFCC",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonText: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
  },
});

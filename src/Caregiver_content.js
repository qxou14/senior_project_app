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
          style={styles.button}
          onPress={() => navigation.navigate("Add_photo")}
        >
          <Text style={styles.buttonText}>Album</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => console.log("From Register")}
        >
          <Text style={styles.buttonText}>Map</Text>
        </Pressable>
      </View>

      <View style={styles.SecondLayer}>
        <Pressable
          style={styles.button}
          onPress={() => console.log("From Register")}
        >
          <Text style={styles.buttonText}>Feedback</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Todo_Giver")}
        >
          <Text style={styles.buttonText}>Daily Schedule</Text>
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
    paddingTop: 20,
    alignItems: "center",
  },

  firstLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginTop: 180,
    marginLeft: 3,
    marginRight: 3,
  },

  SecondLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginLeft: 3,
    marginRight: 3,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 50,
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

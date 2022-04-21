import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  Dimensions,
} from "react-native";
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

const disensions = Dimensions.get("screen");

export default function Patient_content2({ navigation }) {
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

          <MaterialCommunityIcons
            name="arrow-left"
            size={56}
            onPress={() => navigation.navigate("Patient_Content")}
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

      {/* <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonReminders}
          onPress={() => console.log("From Register")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="calendar" size={100} />
          </View>
          <Text style={styles.buttonText}>Reminders</Text>
        </Pressable>
      </View> */}

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonAlbums}
          onPress={() => console.log("album")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="file-picture-o" size={100} />
          </View>
          <Text style={styles.buttonText}>Albums</Text>
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

  buttonAlbums: {
    alignItems: "center",
    backgroundColor: "#CCFFCC",
    height: disensions.height * 0.18,
    width: disensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "#FFFF9B",
  },
  buttonReminders: {
    alignItems: "center",
    height: disensions.height * 0.18,
    width: disensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "#ACA4FF",
  },

  buttonText: {
    marginTop: 5,
    fontSize: 35,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
    fontFamily: "Sans",
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
});

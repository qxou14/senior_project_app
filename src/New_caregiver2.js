import { StyleSheet, View, Pressable, Text, Dimensions } from "react-native";
import { auth } from "../firebase";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

Feather.loadFont();
MaterialCommunityIcons.loadFont();
FontAwesome.loadFont();

const disensions = Dimensions.get("screen");

export default function Caregiver_content2({ navigation }) {
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
            <Feather name="settings" size={56} />
            <Text style={styles.leftword}>Profile</Text>
          </View>

          <MaterialCommunityIcons
            name="arrow-left"
            size={56}
            onPress={() => navigation.navigate("Care_Content")}
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
          onPress={() => navigation.navigate("intro")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="list-alt" size={100} />
          </View>
          <Text style={styles.buttonText}>FAQs</Text>
        </Pressable>
      </View> */}

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonAlbums}
          onPress={() => navigation.navigate("Feedback")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="comment" size={100} />
          </View>
          <Text style={styles.buttonText}>Feedback</Text>
        </Pressable>
      </View>

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonReport}
          onPress={() => navigation.navigate("Score")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="book" size={100} />
          </View>
          <Text style={styles.buttonText}>Report</Text>
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
    marginRight: 40,
  },

  buttonGames: {
    alignItems: "center",
    backgroundColor: "#69FFD2",
    height: disensions.height * 0.18,
    width: disensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
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

  buttonEmergency: {
    alignItems: "center",
    height: disensions.height * 0.18,
    width: disensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "#68D8E7",
  },

  buttonText: {
    marginTop: 5,
    fontSize: 30,
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

  buttonReport: {
    alignItems: "center",
    backgroundColor: "#CCFFCC",
    height: disensions.height * 0.18,
    width: disensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "#FFFF9B",
    backgroundColor: "#A5DAFE",
  },
});

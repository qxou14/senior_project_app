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
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

Feather.loadFont();
MaterialCommunityIcons.loadFont();
FontAwesome.loadFont();

const dimensions = Dimensions.get("screen");

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

  const ready = () => {
    db.collection("set_question")
      .doc(auth.currentUser.email)
      .set({
        username: auth.currentUser.email,
        ready: false,
      })
      .then(() => {
        console.log("questions loaded  !");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  //go to question depends on whether it is ready or not
  // if not ready, question template
  // if ready, go to the question page
  const goto_question = () => {
    let select_choice = false;
    let done = "";

    let ref = db.collection("set_question").doc(auth.currentUser.email);
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Doc data: ", doc.data().ready);
          select_choice = doc.data().ready;
          done = "good";
        } else {
          console.log("no such document");
        }
      })
      .catch((error) => {
        console.log("error getting doc : ", error);
        select_choice = false;
      });

    //select which screen we are going to.

    console.log("Look here ", select_choice);
    if (select_choice) {
      navigation.navigate("question_ans");
    } else {
      navigation.navigate("question");
    }
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
        colors={["#D1E9D1", "#D1E9D1"]}
        style={styles.background}
        start={[0.0, 0.1]}
      />
      <SafeAreaView>
        <View style={styles.headerWrapper}>
          <View style={styles.left}>
            <Feather
              name="settings"
              size={56}
              onPress={() => navigation.navigate("Profile_care")}
            />
            <Text style={styles.leftword}>Profile</Text>
          </View>

          <MaterialCommunityIcons
            name="arrow-right"
            size={56}
            onPress={() => navigation.navigate("Care_Content2")}
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
          onPress={() => navigation.navigate("Scheduler")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="list-alt" size={100} />
          </View>
          <Text style={styles.buttonText}>Scheduler</Text>
        </Pressable>
      </View>

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonAlbum}
          onPress={() => navigation.navigate("C_Album")}
        >
          <View style={styles.iconStyle}>
            <FontAwesome name="file-picture-o" size={100} />
          </View>
          <Text style={styles.buttonText}>Album</Text>
        </Pressable>
      </View>

      <View style={styles.firstLayer}>
        <Pressable
          style={styles.buttonMaps}
          onPress={() => navigation.navigate("CaregiverMaps")}
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
    position: "absolute",
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

  buttonAlbum: {
    alignItems: "center",
    backgroundColor: "#FFFF9B",
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
    backgroundColor: "#A5DAFE",
    height: dimensions.height * 0.18,
    width: dimensions.width * 0.9,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: "black",
    elevation: 10,
  },

  buttonText: {
    marginTop: 5,
    fontSize: 35,
    fontFamily: "Montserrat_600SemiBold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
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

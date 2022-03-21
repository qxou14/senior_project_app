import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../firebase";
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
      </View>

      <View style={styles.ThirdLayer}>
        <Pressable
          style={styles.buttonquestion}
          onPress={() => navigation.navigate("intro")}
        >
          <FontAwesome name="list-alt" size={50} />
          <Text style={styles.buttonText}>question</Text>
        </Pressable>

        <Pressable onPress={ready}>
          <Text style={styles.buttonText}>ready</Text>
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
    marginTop: 140,
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

  buttonquestion: {
    alignItems: "center",
    backgroundColor: "#CCFFCC",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },
});

import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")}></Image>

      <Text style={styles.title}>NeuroGen</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Patient SignIn")}
      >
        <Text style={styles.buttonText}>Patient Sign-in</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("CareGiver SignIn")}
      >
        <Text style={styles.buttonText}>Caregiver Sign-in</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },

  logo: {
    width: 200,
    height: 200,
  },

  title: {
    color: "#0081A7",
    fontSize: 40,
    fontWeight: "600",
    paddingBottom: 60,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 100,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

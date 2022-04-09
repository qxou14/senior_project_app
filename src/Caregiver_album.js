import {
  StyleSheet,
  View,
  Pressable,
  Text,
} from "react-native";

export default function C_Album({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>IN ALBUM</Text>
      </View>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Add_photo")}
      >
        <Text style={styles.buttonText}>add photo</Text>
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
  topWrapper: {},

  title: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 30,
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

import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { auth } from "../firebase";
import { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Register() {
  //user entered info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");

  //this is for show password
  const [icon, setIcon] = useState("eye");
  const [hidePass, setHidePass] = useState(true);
  const [iconC, setIconC] = useState("eye");
  const [hidePassC, setHidePassC] = useState(true);

  const handleRegister = () => {
    //check password match
    if (c_password !== password) {
      alert("Password don't match each other, enter the password again");
      return;
    }
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleHidePassword = () => {
    if (icon === "eye") {
      setIcon("eye-off");
      setHidePass(false);
    } else {
      setIcon("eye");
      setHidePass(true);
    }
  };

  //this is for comfirming password. Same as above function
  const handleHidePasswordC = () => {
    if (iconC === "eye") {
      setIconC("eye-off");
      setHidePassC(false);
    } else {
      setIconC("eye");
      setHidePassC(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter email"
          placeholderTextColor="green"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter password"
          placeholderTextColor="green"
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={hidePass}
        />
        <Pressable>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color="black"
            onPress={handleHidePassword}
          />
        </Pressable>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm password"
          placeholderTextColor="green"
          onChangeText={(password1) => setC_Password(password1)}
          secureTextEntry={hidePassC}
        />
        <Pressable>
          <MaterialCommunityIcons
            name={iconC}
            size={24}
            color="black"
            onPress={handleHidePasswordC}
          />
        </Pressable>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Sign up now!</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
    alignItems: "center",
    justifyContent: "center",
  },

  bottomContainer: {
    position: "absolute",
    top: 450,
  },

  inputView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 30,
    width: "80%",
    height: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  TextInput: {
    fontWeight: "bold",
    height: 50,
    flex: 1,
    padding: 10,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 100,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

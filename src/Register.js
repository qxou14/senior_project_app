import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";
import Input_button from "./Input_button";

export default function Register() {
  return (
    <View style={styles.container}>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter caregiver username"
          placeholderTextColor="green"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter caregiver password"
          placeholderTextColor="green"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirmed caregiver password"
          placeholderTextColor="green"
        />
      </View>
      

      <View style={styles.bottomContainer}>

          <Pressable style = {styles.button} 
                    onPress={() => console.log("From Register")}>
            <Text style = {styles.buttonText}>Sign up now !</Text>
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

  bottomContainer:{
    position : 'absolute',
    top : 450 , 
  },

  inputView: {  
    backgroundColor: "#F6F6F6",
    
    borderRadius: 30,
    width: "80%",
    height: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
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
    color: "white"
  },
});

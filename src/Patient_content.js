import { StyleSheet, View, Button, Alert, Pressable, Text } from "react-native";
import { auth } from "../firebase";
import Input_button from "./Input_button";
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { storageBucket } from "../keys";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonItem from "./compnents/ButtonItem";


Feather.loadFont();
MaterialCommunityIcons.loadFont()

export default function Patient_content({ navigation }) {
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
            <Feather name="settings" size={56} onPress={() => console.log("From Register")} />
            <MaterialCommunityIcons name="logout" size={56} onPress={handleSignOut} />
        </View>
      </SafeAreaView>

      <View style= {styles.firstLayer}> 
        
      <Pressable
        style={styles.button}
        onPress={() => console.log("From Register")}
      >
        <Text style={styles.buttonText}>Exercises</Text>
      </Pressable>


      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Todo")}
      >
        <Text style={styles.buttonText}>Daily Schedule</Text>
      </Pressable>

      </View>


      <View style= {styles.firstLayer}> 
        
        <ButtonItem/>
        
        </View>

    

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EAE4",
  },
  headerWrapper:{
    flexDirection : 'row',
    justifyContent :"space-between",
    paddingTop : 20 , 
    alignItems : "center" , 
    
  },
  firstLayer:{
  
    flexWrap :'wrap',
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  
  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height : 125 ,
    width : '46%', 
      justifyContent :"center",
    borderRadius: 50,
    marginTop: 20,
  },

  buttonText: {
     
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
});

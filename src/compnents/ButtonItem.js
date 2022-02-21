import React from 'react';
import {Text,View,StyleSheet,Pressable} from 'react-native';


export default function  ButtonItem() {

    return(
        <View styles={styles.container}>
        <Pressable
        style={styles.button}
        onPress={() => console.log("From Register")}
      >
        <Text style={styles.buttonText}>Exercises</Text>
      </Pressable>
      </View>
    )
}


const styles = StyleSheet.create({
    
   
    
    button: {
      alignItems: "center",
      backgroundColor: "#5DB075",
      height : 125 ,
      width : 175, 
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
  



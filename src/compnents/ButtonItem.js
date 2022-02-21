import React from 'react';
import {Text,View,StyleSheet,Pressable} from 'react-native';

// This is another approach for the button Ui. I didn't use this one. 

export default function  ButtonItem(props) {

    return(
        <View styles={styles.container}>
        <Pressable
        style={styles.button}
        onPress={() => console.log("From Register")}
        
      >
        <Text style={styles.buttonText}>{props.Text}</Text>
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
  



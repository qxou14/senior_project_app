import { auth, db } from "../firebase";
import { StyleSheet, View, Text, FlatList, Pressable, Dimensions,ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



Foundation.loadFont();
MaterialIcons.loadFont();
const disensions = Dimensions.get('screen');

export default function Todo({ navigation }) {
  const [Item, setItem] = useState([]);

  useEffect(() => {
    const ref = db.collection("Todo");
    ref.onSnapshot((query) => {
      const objs = [];

      query.forEach((doc) => {
        objs.push({
          key: doc.id,
          Action: doc.data().Action,
          Time: doc.data().Time,
          check: doc.data().check,
        });
      });
      setItem(objs);
    });
  }, []);

  const check_box = (id, original, action, time) => {
    // console.log("box is clicked");
    // console.log(id);
    // console.log(original);
    // console.log(!original);
    // console.log("------");
    db.collection("Todo").doc(id).set({
      Action: action,
      Time: time,
      check: !original,
    });
  };

  return (


      <View style={styles.container}>
        {
          

          <View style={styles.topContainer}> 


          <Foundation name= "calendar" size = {56} style={styles.calendar} />

          <View style={styles.dataWrapper}>

            <MaterialIcons name="keyboard-arrow-left" size = {46}/>
            <Text style= {styles.dateStyle}>March 3 2022</Text>
            <MaterialIcons name="keyboard-arrow-right" size = {46}/>

          </View>

          <ScrollView style = {styles.todoList}>

          <FlatList
              data={Item}

              renderItem={({ item }) => (
                <Text style={styles.item} key={item.id}>

                  <Pressable
                    onPress={() => {
                      check_box(item.key, item.check, item.Action, item.Time);
                    }}
                  >
                    <Checkbox disabled value={item.check} />
                  </Pressable>

                  {item.Action}
                  {item.key}
                </Text>
              )}
            />
              
          </ScrollView>

        </View>
        

        }
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EAE4",
    alignItems: "center",
    padding: 0,
  },

  topContainer:{
    
    height : disensions.height / 4 ,
    width : disensions.width,
    alignContent: 'center',
    justifyContent : 'center',
  },

  dataWrapper:{
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'center',
    
  },  

  dateStyle : {
    fontWeight :"bold",
    fontSize : 30 , 

  },
  calendar: {
    textAlign : 'center',
  },
  todoList:{
  }



 
});

import { auth, db } from "../firebase";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import React, { useEffect, useState } from "react";

export default function Todo_Giver({ navigation }) {
  const [Item, setItem] = useState([]);

  useEffect(() => {
    const ref = db.collection("Todo");
    ref.onSnapshot((query) => {
      const objs = [];

      query.forEach((doc) => {
        objs.push({
          key: doc.id,
          Action: doc.data().Action,
          Date: doc.data().Date,
          Time: doc.data().Time,
        });
      });
      setItem(objs);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => console.log("From todo")}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>

      <FlatList
        data={Item}
        renderItem={({ item }) => (
          <Text style={styles.item} key={item.id}>
            {item.Action}
          </Text>
        )}
      />
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
    fontWeight: "bold",
    paddingBottom: 60,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 10,
    paddingHorizontal: 20,
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

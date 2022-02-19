import { auth, db } from "../firebase";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  Image,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";

export default function Todo({ navigation }) {
  const [Item, setItem] = useState([]);

  useEffect(() => {
    const get_data = () => {
      const data = db
        .collection("Todo")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            Item.push({
              id: doc.id,
              Action: doc.data().Action,
              Date: doc.data().Date,
              Time: doc.data().Time,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    };

    get_data();
  }, []);

  console.log(Item.length, "outside useeffect");
  // console.log(Item);
  const read_items = Item.map((item) => (
    <Text key={item.id}>{item.Action}</Text>
  ));

  return (
    <View style={styles.container}>
      {/* <Text>{Item[1].Action}</Text>
      {read_items} */}

      {/* <FlatList
        data={Item}
        renderItem={({ item }) => (
          <Text style={styles.item} key={item.id}>
            {item.Action}
          </Text>
        )}
      /> */}
      {read_items}
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

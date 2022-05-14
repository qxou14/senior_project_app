import {
  StyleSheet,
  View,
  Pressable,
  Text,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { LinearGradient } from "expo-linear-gradient";

const dimensions = Dimensions.get("screen");

export default function Patient_album({ navigation }) {
  const [Item, setItem] = useState([]);

  useEffect(() => {
    const ref = db
      .collection("album")
      .where("user", "==", auth.currentUser.email);
    ref.onSnapshot((query) => {
      const objs = [];

      query.forEach((doc) => {
        objs.push({
          key: doc.id,
          url: doc.data().Url,
          description: doc.data().Description,
        });
      });
      setItem(objs);
    });
  }, []);

  const ListItem = ({ album }) => {
    return (
      <View>
        <Image
          source={{ url: album.url }}
          style={{ width: "100%", height: 300, marginBottom: 40 }}
        />
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>{album.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#f5fcfe", "#b1e5f6"]}
        style={styles.background}
        start={[0.1, 0.2]}
      />
      <View style={styles.topWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}> Album </Text>
        </View>
      </View>

      <View style={styles.card}>
        <FlatList
          data={Item}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => <ListItem album={item} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  topWrapper: {
    width: dimensions.width,
    height: dimensions.height / 6,
  },

  card: {
    width: "100%",
    borderRadius: 15,
    paddingBottom: 20,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    padding: 20,
    borderRadius: 100,
  },

  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },

  titleWrapper: {
    alignItems: "center",
    marginTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginHorizontal: 30,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    justifyContent: "center",
    fontFamily: "Montserrat_500Medium",
  },

  descriptionText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  descriptionWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});

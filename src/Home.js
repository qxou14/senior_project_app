import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  ImageBackground,
} from "react-native";
import AppLoading from 'expo-app-loading';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, 
         Montserrat_400Regular,
         Montserrat_500Medium,
         Montserrat_600SemiBold,
         Montserrat_700Bold,
       } from '@expo-google-fonts/montserrat';

export default function Home({ navigation }) {

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (

    <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={["#f5fcfe", "#CDFCCD"]}
          style={styles.background}
          start = {[0.0, 0.05]}
        />
        <Image style={styles.logo} source={require("../assets/logo.png")}></Image>

        <Text style={styles.title}>NeuroGen</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Patient SignIn")}
        >
          <Text style={styles.buttonText}>Patient Sign-in</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("CareGiver SignIn")}
        >
          <Text style={styles.buttonText}>Caregiver Sign-in</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 200,
    height: 200,
  },

  title: {
    color: "#0081A7",
    fontSize: 40,
    paddingBottom: 60,
    fontFamily: 'Montserrat_500Medium',
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 25,
    fontFamily: 'Montserrat_600SemiBold',
    letterSpacing: 0.25,
    color: "white",
  },
});

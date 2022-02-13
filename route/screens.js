import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "../src/SignIn";
import Register from "../src/Register";
import Home from "../src/Home";
import SignInGiver from "../src/SignInGiver";
import Patient_content from "../src/Patient_content";
import Caregiver_content from "../src/Caregiver_content";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Patient SignIn" component={SignIn} />
        <Stack.Screen name="CareGiver SignIn" component={SignInGiver} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Patient Content" component={Patient_content} />
        <Stack.Screen name="Caregiver Content" component={Caregiver_content} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "../src/SignIn";
import Register from "../src/Register";
import Home from "../src/Home";
import SignInGiver from "../src/SignInGiver";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Patient SignIn" component={SignIn} />
        <Stack.Screen name="CareGiver SignIn" component={SignInGiver} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

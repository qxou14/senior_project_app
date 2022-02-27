import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "../src/SignIn";
import Register from "../src/Register";
import Home from "../src/Home";
import SignInGiver from "../src/SignInGiver";
import Patient_content from "../src/Patient_content";
import Caregiver_content from "../src/Caregiver_content";
import Todo from "../src/Todo";
import Todo_Giver from "../src/Todo_Giver";
import C_Album from "../src/Caregiver_album";
import Add_photo from "../src/Add_photo";
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Patient SignIn" component={SignIn} />
        <Stack.Screen name="CareGiver SignIn" component={SignInGiver} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Patient Content"
          component={Patient_content}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Caregiver Content"
          component={Caregiver_content}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Todo_Giver" component={Todo_Giver} />
        <Stack.Screen name="C_Album" component={C_Album} />
        <Stack.Screen name="Add_photo" component={Add_photo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

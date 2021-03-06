import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SignIn from "../src/SignIn";
import Register from "../src/Register";
import Home from "../src/Home";
import SignInGiver from "../src/SignInGiver";
import Todo from "../src/Todo";
import Todo_Giver from "../src/Todo_Giver";
import C_Album from "../src/Caregiver_album";
import Add_photo from "../src/Add_photo";
import Profile_patient from "../src/Profile_patient";
import Profile_care from "../src/caregiver_profile";
import PatientMaps from "../src/PatientMaps";
import CaregiverMaps from "../src/CaregiverMaps";
import C_question from "../src/caregiver_game_question";
import C_question_ans from "../src/caregiver_game_question_ans";
import Question_intro from "../src/caregiver_intro_question";
import New_page from "../src/New_parent_1";
import New_page2 from "../src/New_parent_2";
import New_caregiver from "../src/New_caregiver";
import New_caregiver2 from "../src/New_caregiver2";
import Patient_question from "../src/patient_question";
import View_Score from "../src/Caregiver_view_score";
import Feedback from "../src/Feedback";
import Paitient_album from "../src/Patient_album";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Patient SignIn" component={SignIn} />
        <Stack.Screen name="CareGiver SignIn" component={SignInGiver} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Todo" component={Todo} />
        <Stack.Screen name="Scheduler" component={Todo_Giver} />
        <Stack.Screen name="C_Album" component={C_Album} />
        <Stack.Screen name="Paitient_album" component={Paitient_album} />

        <Stack.Screen name="Add_photo" component={Add_photo} />
        <Stack.Screen name="Profile_patient" component={Profile_patient} />
        <Stack.Screen name="Profile_care" component={Profile_care} />

        <Stack.Screen name="PatientMaps" component={PatientMaps} />
        <Stack.Screen name="CaregiverMaps" component={CaregiverMaps} />

        <Stack.Screen name="question" component={C_question} />
        <Stack.Screen name="question_ans" component={C_question_ans} />

        <Stack.Screen name="intro" component={Question_intro} />

        <Stack.Screen name="patient_question" component={Patient_question} />

        <Stack.Screen name="Score" component={View_Score} />

        <Stack.Screen name="Feedback" component={Feedback} />

        <Stack.Screen
          name="Patient_Content"
          component={New_page}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Patient_Content2"
          component={New_page2}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Care_Content"
          component={New_caregiver}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Care_Content2"
          component={New_caregiver2}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

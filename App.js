import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/login";
import { PermissionsAndroid } from "react-native";
import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home";
import SignUp from "./components/login/SignUp";
import { MenuProvider } from "react-native-popup-menu";
import { primary } from "./utils/constant";
import Chat from "./components/chat";

const App = () => {
  const Stack = createNativeStackNavigator();

  // const permissions = async () => {
  //   const granted = await PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //   );
  //   if (!granted)
  //     await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
  //     );
  // };

  // useEffect(() => {
  //   permissions();
  // }, []);

  return (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar
          style="light"
          translucent={false}
          backgroundColor={primary}
          color="#fff"
        />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
        {/* <Login /> */}
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;

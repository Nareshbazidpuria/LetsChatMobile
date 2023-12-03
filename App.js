import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/login";
import { PermissionsAndroid } from "react-native";
import { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home";
import SignUp from "./components/login/SignUp";
import { MenuProvider } from "react-native-popup-menu";
import { primary } from "./utils/constant";
import Chat from "./components/chat";
import Profile from "./components/profile";

export let navigateRef;

const App = () => {
  const Stack = createNativeStackNavigator();
  navigateRef = useRef();

  const permissions = {
    notification: async () => {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (!granted)
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
    },
    camera: async () => {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (!granted)
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
    },
    readES: async () => {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      if (!granted)
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
    },
    writeES: async () => {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (!granted)
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
    },
  };
  const takePermissions = async () => {
    await permissions.notification();
    await permissions.camera();
    await permissions.readES();
    await permissions.writeES();
  };

  useEffect(() => {
    takePermissions();
  }, []);

  return (
    <MenuProvider>
      <NavigationContainer ref={navigateRef}>
        <StatusBar
          style="light"
          translucent={false}
          backgroundColor={primary}
        />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
        {/* <Login /> */}
      </NavigationContainer>
    </MenuProvider>
  );
};

export default App;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Friends from "../friends";
import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/constant";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import IonIcon from "@expo/vector-icons/Ionicons";
import Requests from "../request";
import People from "../people";

const Home = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const authenticate = async () => {
    const user = await AsyncStorage.getItem("user");
    if (!user) navigation.navigate("Login");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.navigate("Login");
  };

  useEffect(() => {
    authenticate();
  });

  return (
    <>
      <View
        style={tw`px-5 py-3 bg-[${primary}] flex flex-row items-center justify-between`}
      >
        <Text style={tw`text-white text-2xl font-bold`}>Let's Chat</Text>
        <Menu>
          <MenuTrigger
            children={
              <IonIcon name="ellipsis-horizontal" size={20} color="#fff" />
            }
          />
          <MenuOptions optionsContainerStyle={tw`w-24`} style={tw`px-2 py-3`}>
            <MenuOption text="Profile" />
            <MenuOption text="Settings" />
            <MenuOption onSelect={logout} text="Logout" />
          </MenuOptions>
        </Menu>
      </View>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarActiveTintColor: "#fff",
          tabBarStyle: {
            backgroundColor: primary,
            borderBottomColor: "red",
          },
          tabBarIndicatorStyle: { backgroundColor: "#fff" },
        })}
      >
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Requests" component={Requests} />
        <Tab.Screen name="People" component={People} />
      </Tab.Navigator>
    </>
  );
};

export default Home;

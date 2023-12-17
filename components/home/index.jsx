import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Friends from "../friends";
import { Text, TextInput, View } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/common";

const Home = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const seachInp = useRef();
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.searchText);

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
  }, []);

  useEffect(() => {
    if (searchText?.open && seachInp?.current) seachInp.current.focus();
  }, [searchText?.open, seachInp]);

  return (
    <>
      <View
        style={tw`px-5 py-${
          searchText?.open ? 1 : 2
        } bg-[${primary}] flex flex-row items-center justify-between`}
      >
        {searchText?.open ? (
          <View
            style={tw`w-full bg-white rounded-full flex flex-row items-center py-1 px-3 justify-between`}
          >
            <TextInput
              ref={seachInp}
              style={tw`w-[90%]`}
              value={searchText?.text}
              onChangeText={(e) =>
                dispatch(setSearchText({ ...searchText, text: e }))
              }
            />
            <IonIcon
              name="close"
              color="gray"
              size={16}
              onPress={() => dispatch(setSearchText({ text: "", open: false }))}
            />
          </View>
        ) : (
          <>
            <Text style={tw`text-white text-2xl font-bold`}>Let's Chat</Text>
            <View style={tw`flex flex-row items-center gap-3`}>
              <IonIcon
                name="search"
                size={18}
                color="#ffffff"
                onPress={() =>
                  dispatch(setSearchText({ ...searchText, open: true }))
                }
              />
              <Menu>
                <MenuTrigger
                  children={
                    <IonIcon
                      name="ellipsis-horizontal"
                      size={20}
                      color="#fff"
                    />
                  }
                />
                <MenuOptions
                  optionsContainerStyle={tw`w-24`}
                  style={tw`px-2 py-3`}
                >
                  <MenuOption text="Profile" />
                  <MenuOption text="Settings" />
                  <MenuOption onSelect={logout} text="Logout" />
                </MenuOptions>
              </Menu>
            </View>
          </>
        )}
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

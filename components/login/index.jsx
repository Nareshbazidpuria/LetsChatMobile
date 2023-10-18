import { Image, Pressable, TextInput, ToastAndroid } from "react-native";
import { View, Text } from "react-native";
import tw from "twrnc";
import { bg, primary } from "../../utils/contant";
import { TouchableHighlight } from "react-native";
import logo from "../../assets/icon.png";
import { Icon } from "@rneui/themed";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

const Login = () => {
  const [payload, setPayload] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);

  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);

  const touchBiometrics = async () => {
    try {
      const res = await LocalAuthentication.authenticateAsync({
        promptMessage: "Please touch sensor to login",
      });
      if (res?.success) {
        const loginPayload = await AsyncStorage.getItem("loginPayload");
        if (!loginPayload)
          message("Authentication failed ! please enter credentials manually");
        else login(JSON.parse(loginPayload));
      }
    } catch (error) {}
  };

  const login = async (payload) => {
    setLoading(true);
    if (
      payload.userName === "naresh_bazidpuria" &&
      payload.password === "Admin@123"
    ) {
      setTimeout(() => {
        message("Logged in successfully");
        setLoading(false);
      }, 300);
      await AsyncStorage.setItem("loginPayload", JSON.stringify(payload));
    } else message("Invalid credentials");
  };

  const onChange = (key, value) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  return (
    <>
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <View style={tw`flex-1 px-10`}>
          <View style={tw`flex items-center justify-center h-32 mt-20`}>
            <Image source={logo} style={tw`h-32 w-32`} />
          </View>
          <Text
            style={tw`text-4xl text-center font-extrabold mt-2 text-[${primary}]`}
          >
            Let's Chat
          </Text>
          <Text style={tw`text-base text-center font-bold text-gray-400`}>
            Login to your account
          </Text>
          <View style={tw`justify-center gap-5 mt-16`}>
            <View
              style={tw`flex flex-row items-center gap-2 p-2 rounded-md bg-[${bg}]`}
            >
              <Icon name="person" size={20} color={primary} />
              <TextInput
                placeholder="Username"
                placeholderTextColor="gray"
                style={tw`text-[${primary}] font-bold p-0 w-[85%]`}
                onChangeText={(e) => onChange("userName", e)}
                value={payload?.userName}
              />
            </View>
            <View
              style={tw`flex flex-row items-center gap-2 p-2 rounded-md bg-[${bg}]`}
            >
              <Icon name="lock" size={20} color={primary} />
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="gray"
                style={tw`text-[${primary}] font-bold p-0 w-[85%]`}
                onChangeText={(e) => onChange("password", e)}
                value={payload?.password}
              />
            </View>
            <Text style={tw`text-right font-extrabold text-[${primary}]`}>
              Forgot password ?
            </Text>
            <Pressable onPress={() => login(payload)} style={tw`text-lg`}>
              <Text
                style={tw`text-lg text-center text-white py-2 rounded-full font-extrabold bg-[${primary}]`}
              >
                Login
              </Text>
            </Pressable>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={tw`text-base text-gray-400 my-3`}>
                Don't have an account ?{" "}
              </Text>
              <TouchableHighlight>
                <Text style={tw`text-[${primary}] text-base font-extrabold`}>
                  Register
                </Text>
              </TouchableHighlight>
            </View>
            <View style={tw`flex items-center`}>
              <Icon
                name="fingerprint"
                color={primary}
                size={60}
                style={tw`my-8 w-16 rounded-full`}
                onPress={touchBiometrics}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default Login;

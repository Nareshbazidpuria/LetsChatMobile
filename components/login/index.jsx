import {
  Pressable,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  View,
  Text,
  Keyboard,
} from "react-native";
import tw from "twrnc";
import { bg, primary } from "../../utils/constant";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import IonIcon from "@expo/vector-icons/Ionicons";
import LogoLable from "../common/LogoLable";
import { loginApi } from "../../api/apis";
import * as Notifications from "expo-notifications";
import { registerPush } from "../../utils/common";

const Login = ({ navigation }) => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const [loading, setLoading] = useState(false);
  const [keyboardOpened, setKeyboardOpened] = useState(false);
  const [payload, setPayload] = useState({
    userName: "naresh_bazidpuria",
    password: "",
    expoToken: "",
  });

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

  const login = async (data) => {
    try {
      setLoading(true);
      const apiPayload = data || { ...payload };
      const res = await loginApi(apiPayload);
      if (res?.status === 200) {
        message(res.data?.message);
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(res?.data?.data?.accessToken)
        );
        await AsyncStorage.setItem("loginPayload", JSON.stringify(apiPayload));
        await AsyncStorage.setItem("user", JSON.stringify(apiPayload));
        navigation.navigate("Home");
      }
    } catch (error) {
      message(error?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (key, value) => {
    setPayload({
      ...payload,
      [key]: value,
    });
  };

  useEffect(() => {
    registerPush().then((token) =>
      setPayload({ ...payload, expoToken: token?.data })
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setKeyboardOpened(true)
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardOpened(false)
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <>
      {loading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <View style={tw`flex-1 p-5 justify-evenly`}>
          {!keyboardOpened && <LogoLable label="Login to your account" />}
          <View style={tw`justify-center gap-5`}>
            <View
              style={tw`flex flex-row items-center gap-2 p-2 rounded-md bg-[${bg}]`}
            >
              <IonIcon name="at" size={16} color={primary} />
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
              <IonIcon name="lock-closed" size={16} color={primary} />
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
                style={tw`text-lg text-center text-white py-2 rounded-md font-extrabold bg-[${primary}]`}
              >
                Login
              </Text>
            </Pressable>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={tw`text-base text-gray-400 my-3`}>
                Don't have an account ?{" "}
              </Text>
              <Text
                style={tw`text-[${primary}] text-base font-extrabold`}
                onPress={() => navigation.push("SignUp")}
              >
                Register
              </Text>
            </View>
            <View style={tw`flex items-center my-4`}>
              <IonIcon
                name="finger-print"
                color={primary}
                size={60}
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

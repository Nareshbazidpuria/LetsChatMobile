import { Keyboard, Pressable, TextInput, ToastAndroid } from "react-native";
import { View, Text } from "react-native";
import tw from "twrnc";
import { bg, primary } from "../../utils/constant";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import LogoLable from "../common/LogoLable";
import { signUpApi } from "../../api/apis";

const SignUp = ({ navigation }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [loading, setLoading] = useState(false);
  const [keyboardOpened, setKeyboardOpened] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    cPass: "",
  });

  const signUp = async () => {
    try {
      setLoading(true);
      const apiPayload = { ...payload };
      delete apiPayload.cPass;
      const res = await signUpApi(apiPayload);
      if (res?.status === 201) {
        message(res.data?.message);
        navigation.navigate("Login");
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
        <View style={tw`flex-1 justify-center items-center gap-5`}>
          <ActivityIndicator size={50} color={primary} />
          <Text style={tw`text-lg`}>Signing up...</Text>
        </View>
      ) : (
        <View style={tw`flex-1 p-5 justify-evenly`}>
          {!keyboardOpened && <LogoLable label="Create your new account" />}
          <View style={tw`justify-center gap-5`}>
            <View
              style={tw`flex flex-row items-center gap-2 p-2 rounded-md bg-[${bg}]`}
            >
              <IonIcon name="person" size={16} color={primary} />
              <TextInput
                placeholder="Name"
                placeholderTextColor="gray"
                style={tw`text-[${primary}] font-bold p-0 w-[85%]`}
                onChangeText={(e) => onChange("name", e)}
                value={payload?.name}
              />
            </View>
            <View
              style={tw`flex flex-row items-center gap-2 p-2 rounded-md bg-[${bg}]`}
            >
              <IonIcon name="mail" size={16} color={primary} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                style={tw`text-[${primary}] font-bold p-0 w-[85%]`}
                onChangeText={(e) => onChange("email", e)}
                value={payload?.email}
              />
            </View>
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
            <View
              style={tw`flex flex-row items-center gap-2 p-2 rounded-md bg-[${bg}]`}
            >
              <IonIcon name="lock-closed" size={16} color={primary} />
              <TextInput
                secureTextEntry={true}
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                style={tw`text-[${primary}] font-bold p-0 w-[85%]`}
                onChangeText={(e) => onChange("cPass", e)}
                value={payload?.cPass}
              />
            </View>
            <Pressable onPress={signUp} style={tw`text-lg`}>
              <Text
                style={tw`text-lg text-center text-white py-2 rounded-md font-extrabold bg-[${primary}]`}
              >
                Sign Up
              </Text>
            </Pressable>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Text style={tw`text-base text-gray-400 my-3`}>
                Already have an account ?{" "}
              </Text>
              <Text
                style={tw`text-[${primary}] text-base font-extrabold`}
                onPress={() => navigation.push("Login")}
              >
                Login
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default SignUp;

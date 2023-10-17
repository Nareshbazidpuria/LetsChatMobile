import { Button, Pressable, TextInput } from "react-native";
import { View, Text } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/contant";
import { TouchableHighlight } from "react-native";

const Login = () => {
  return (
    <View style={tw`flex-1 px-10`}>
      <Text
        style={{
          ...tw`text-2xl text-center text-bold`,
          height: 300,
          verticalAlign: "middle",
        }}
      >
        Login
      </Text>
      <View style={tw`justify-center gap-10`}>
        <View>
          <Text style={tw`text-lg`}>Username</Text>
          <TextInput style={tw`text-xl border-b p-0`} />
        </View>
        <View>
          <Text style={tw`text-lg`}>Password</Text>
          <TextInput secureTextEntry={true} style={tw`text-xl border-b p-0`} />
        </View>
        {/* <Button title="Login" style={tw`rounded`} /> */}
        <Pressable onPress={() => alert("Login success")} style={tw`text-lg`}>
          <Text
            style={{
              ...tw`text-lg text-center text-white py-2 rounded-full`,
              backgroundColor: primary,
            }}
          >
            Login
          </Text>
        </Pressable>
        <View style={tw`flex flex-row items-center`}>
          <Text style={tw`text-base`}>Don't have an account ? </Text>
          <TouchableHighlight>
            <Text
              style={{
                color: primary,
              }}
            >
              Register
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default Login;

import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
// import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import Bicon from "./Bicon";

const PeopTab = ({ navigation, logo, msg }) => (
  <View
    style={tw`bg-white flex flex-row items-center justify-between gap-1 py-1 px-2`}
  >
    <View style={tw`flex flex-row items-center gap-1`}>
      <Image source={logo} style={tw`h-16 w-16`} />
      <Pressable>
        {/* <Pressable onPress={() => navigation.navigate("chat")}> */}
        <Text style={tw`text-lg font-bold`}>
          {msg?.user?.length > 16
            ? msg?.user?.slice(0, 16) + " ..."
            : msg?.user}
        </Text>
        <Text style={tw`text-gray-400`}>
          {msg?.userName?.length > 24
            ? msg?.userName?.slice(0, 24) + " ..."
            : msg?.userName}
        </Text>
      </Pressable>
    </View>
    <Pressable style={tw`mr-2`}>
      {msg?.reqSent ? (
        <Bicon name="close" title="Cancel" bg="#fff" />
      ) : (
        <Bicon name="add" title="Add" />
      )}
    </Pressable>
  </View>
);

export default PeopTab;

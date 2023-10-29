import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";

const FrndTab = ({ navigation, logo, msg }) => (
  <Pressable
    onPress={() => navigation.navigate("Chat", { logo, msg })}
    style={tw`bg-white flex flex-row items-center justify-between gap-1 py-1 px-2`}
  >
    <View style={tw`flex flex-row items-center gap-1`}>
      <Image source={logo} style={tw`h-16 w-16`} />
      <View>
        <Text style={tw`text-base font-bold`}>{msg?.user}</Text>
        <View style={tw`flex flex-row items-center gap-1`}>
          <IonIcon name="checkmark-circle-outline" color="gray" />
          <Text style={tw`text-xs text-gray-400`}>{msg?.text}</Text>
        </View>
      </View>
    </View>
    <View>
      <Text style={tw`text-gray-400 mr-2`}>{msg?.time}</Text>
    </View>
  </Pressable>
);

export default FrndTab;

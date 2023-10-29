import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/constant";

const ReqTab = ({ logo, msg }) => {
  return (
    <View
      style={tw`bg-white flex flex-row items-center justify-between gap-1 py-1 px-2`}
    >
      <View style={tw`flex flex-row items-center gap-1`}>
        <Image source={logo} style={tw`h-16 w-16`} />
        <View>
          <Text style={tw`text-base font-bold`}>
            {msg?.user?.length > 16
              ? msg?.user?.slice(0, 16) + " ..."
              : msg?.user}
          </Text>
          <Text style={tw`text-xs text-gray-400`}>
            {msg?.userName?.length > 24
              ? msg?.userName?.slice(0, 24) + " ..."
              : msg?.userName}
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-row gap-2 mr-2`}>
        <Pressable
          style={tw`flex items-center p-2 bg-[${primary}] rounded w-10 justify-center`}
        >
          <IonIcon name="checkmark" color="#fff" size={15} />
        </Pressable>
        <Pressable
          style={tw`flex items-center p-2 rounded w-10 justify-center border border-gray-300`}
        >
          <IonIcon name="close" size={15} />
        </Pressable>
      </View>
    </View>
  );
};

export default ReqTab;

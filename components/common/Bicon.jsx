import { Pressable, Text } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/constant";

const Bicon = ({ title, name, bg = primary, onPress = () => {} }) => (
  <Pressable
    style={tw`flex flex-row items-center gap-1 p-2 bg-[${bg}] rounded w-22 justify-center ${
      bg !== primary ? "border border-gray-300" : ""
    }`}
    onPress={onPress}
  >
    <Text style={tw`${bg === primary ? "text-white" : ""}`}>{title}</Text>
    <IonIcon
      name={name}
      size={15}
      color={`${bg === primary ? "#fff" : "black"}`}
    />
  </Pressable>
);

export default Bicon;

import { Pressable, Text } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/constant";

const BiconSm = ({ title, name, bg = primary, onPress = () => {} }) => (
  <Pressable
    style={tw`flex flex-row items-center gap-1 rounded px-3 py-0.5 bg-[${bg}] justify-center border ${
      bg !== primary ? "border-gray-300" : `border-[${primary}]`
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

export default BiconSm;

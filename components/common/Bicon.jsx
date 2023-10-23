import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { primary } from "../../utils/constant";

const Bicon = ({ title, name, bg = primary }) => (
  <View
    style={tw`flex flex-row items-center gap-1 p-2 bg-[${bg}] rounded w-20 justify-center ${
      bg !== primary ? "border border-gray-300" : ""
    }`}
  >
    <Text style={tw`${bg === primary ? "text-white" : ""}`}>{title}</Text>
    <IonIcon
      name={name}
      size={15}
      color={`${bg === primary ? "#fff" : "gray"}`}
    />
  </View>
);

export default Bicon;

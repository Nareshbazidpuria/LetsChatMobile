import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/constant";

const Tag = ({ value, label }) => (
  <View style={tw`bg-[${primary}] py-1 w-[25%] rounded-md`}>
    <Text style={tw`text-white text-center`}>{value}</Text>
    <Text style={tw`text-white text-center`}>{label}</Text>
  </View>
);

export default Tag;

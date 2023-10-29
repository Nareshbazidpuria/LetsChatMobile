import { Image, Text, View } from "react-native";
import { primary } from "../../utils/constant";
import tw from "twrnc";
import logo from "../../assets/icon.png";

const LogoLable = ({ label }) => (
  <View>
    <View style={tw`flex items-center justify-center`}>
      <Image source={logo} style={tw`h-28 w-28`} />
    </View>
    <Text style={tw`text-4xl text-center font-extrabold text-[${primary}]`}>
      Let's Chat
    </Text>
    <Text style={tw`text-base text-center font-bold text-gray-400`}>
      {label}
    </Text>
  </View>
);

export default LogoLable;

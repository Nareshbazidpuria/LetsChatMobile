import { Text, View } from "react-native";
import Cover from "../common/Cover";
import tw from "twrnc";

const Profile = ({ route }) => {
  const { logo, msg } = route.params;
  return (
    <View style={tw`flex-1 bg-white`}>
      <Cover logo={logo} />
      <View style={tw`flex items-center`}>
        <Text style={tw`text-xl font-bold`}>{msg?.user}</Text>
      </View>
    </View>
  );
};

export default Profile;

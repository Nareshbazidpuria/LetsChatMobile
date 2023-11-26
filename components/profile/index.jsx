import { Text, View } from "react-native";
import Cover from "../common/Cover";
import tw from "twrnc";
import { primary } from "../../utils/constant";
import Tag from "../common/Tag";

const Profile = ({ route }) => {
  const { msg } = route.params;
  return (
    <View style={tw`flex-1 bg-white`}>
      <Text style={tw`bg-[${primary}] text-white font-bold text-2xl p-4`}>
        Profile
      </Text>
      <Cover logo={msg?.image} />
      <View style={tw`flex items-center`}>
        <Text style={tw`text-xl font-bold`}>{msg?.user}</Text>
        <Text style={tw`text-lg text-gray-400`}>{msg?.userName}</Text>
        <Text style={tw`text-gray-400`}>{msg?.email}</Text>
      </View>
      <View style={tw`flex flex-row justify-evenly my-5`}>
        <Tag label="Friends" value="12K" />
        <Tag label="Following" value="12K" />
        <Tag label="Followers" value="12K" />
      </View>
    </View>
  );
};

export default Profile;

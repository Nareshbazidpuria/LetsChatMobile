import { Text, View } from "react-native";
import Cover from "../common/Cover";
import tw from "twrnc";
import { primary } from "../../utils/constant";
import Tag from "../common/Tag";
import { getProfileApi, getUserInfoApi } from "../../api/apis";
import { useEffect, useState } from "react";
import { baseURL } from "../../api/axios";

const Profile = ({ route }) => {
  const { user, self } = route.params;
  const [profile, setProfile] = useState({});

  const getProfile = async () => {
    let res = user._id ? await getUserInfoApi(user._id) : await getProfileApi();
    if (res?.status === 200) {
      res = res.data.data;
      if (res.profilePic)
        res.profilePic = {
          uri: baseURL.split("mob")[0] + res.profilePic,
        };
      setProfile(res);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Text style={tw`bg-[${primary}] text-white font-bold text-2xl p-4`}>
        {self ? "Profile" : profile.name}
      </Text>
      <Cover user={profile} self={self} cb={getProfile} />
      <View style={tw`flex items-center`}>
        <Text style={tw`text-xl font-bold`}>{profile.name}</Text>
        <Text style={tw`text-lg text-gray-400`}>{profile.userName}</Text>
        <Text style={tw`text-gray-400`}>{profile.email}</Text>
      </View>
      <View style={tw`flex flex-row justify-evenly my-5`}>
        <Tag label="Friends" value={profile?.friends || 0} />
        <Tag label="Following" value={profile?.following || 0} />
        <Tag label="Followers" value={profile?.followers || 0} />
      </View>
    </View>
  );
};

export default Profile;

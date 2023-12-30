import { Image, Pressable, ToastAndroid } from "react-native";
import { Text, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/constant";
import profile from "../../assets/profile.png";
import { useEffect, useState } from "react";
import { confirmRequestApi, rejectReqApi } from "../../api/apis";

const ReqTab = ({ user, cb }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.SHORT);
  const [usr, setUser] = useState(user);
  const { name, userName, profilePic, requestId } = usr;

  const handleRequest = async (requestId, accept) => {
    try {
      let res = accept
        ? await confirmRequestApi(requestId)
        : await rejectReqApi(requestId);
      if (res?.status === 200) {
        cb();
        message(res?.data?.message);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
    }
  };

  useEffect(() => {
    setUser(user);
  }, [user]);

  return requestId ? (
    <View
      style={tw`bg-white flex flex-row items-center justify-between gap-1 py-1 px-2`}
    >
      <View style={tw`flex flex-row items-center gap-2`}>
        <Image
          source={profilePic || profile}
          style={tw`h-14 w-14 rounded-full`}
        />
        <View>
          <Text style={tw`text-lg font-bold`}>
            {name?.length > 16 ? name?.slice(0, 16) + " ..." : name}
          </Text>
          <Text style={tw`text-xs text-gray-400`}>
            {userName?.length > 24 ? userName?.slice(0, 24) + " ..." : userName}
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-row gap-1 mr-2`}>
        <Pressable
          style={tw`flex items-center px-3 py-1 bg-[${primary}] rounded justify-center border border-[${primary}]`}
          onPress={() => handleRequest(requestId, 1)}
        >
          <Text style={tw`text-white`}>Accept</Text>
        </Pressable>
        <Pressable
          style={tw`flex items-center px-3 py-1 rounded justify-center border border-gray-300`}
          onPress={() => handleRequest(requestId)}
        >
          <Text>Reject</Text>
        </Pressable>
      </View>
    </View>
  ) : (
    <></>
  );
};

export default ReqTab;

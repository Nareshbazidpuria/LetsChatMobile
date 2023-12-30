import { Image, Pressable, Text, ToastAndroid, View } from "react-native";
import tw from "twrnc";
import profile from "../../assets/profile.png";
import BiconSm from "./BiconSm";
import { rejectReqApi, sendRequestApi } from "../../api/apis";
import { useEffect, useState } from "react";

const PeopTab = ({ user }) => {
  const message = (msg) => ToastAndroid.show(msg, ToastAndroid.SHORT);
  const [usr, setUser] = useState(user);
  const { name, userName, reqSent, profilePic, _id, requestId } = usr;

  const sendRequest = async (to) => {
    try {
      let res = await sendRequestApi({ to });
      if (res?.status === 201) {
        setUser({ ...user, reqSent: res?.data?.data });
        message(res?.data?.message);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
    }
  };

  const rejectRequest = async (requestId, params) => {
    try {
      let res = await rejectReqApi(requestId, params);
      if (res?.status === 200) {
        params?.type ? setUser({ ...user, reqSent: null }) : setUser({});
        message(res?.data?.message);
      }
    } catch (error) {
      if (error?.data?.message) message(error.data.message);
    }
  };

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <View
      style={tw`bg-white flex flex-row items-center justify-between gap-1 py-1 px-2`}
    >
      <View style={tw`flex flex-row items-center gap-2`}>
        <Image
          source={profilePic || profile}
          style={tw`h-14 w-14 rounded-full`}
        />
        <Pressable>
          <Text style={tw`text-lg font-bold`}>
            {name?.length > 16 ? name?.slice(0, 16) + " ..." : name}
          </Text>
          <Text style={tw`text-xs text-gray-400`}>
            {userName?.length > 24 ? userName?.slice(0, 24) + " ..." : userName}
          </Text>
        </Pressable>
      </View>
      <Pressable style={tw`mr-2`}>
        {reqSent ? (
          <BiconSm
            title="Cancel"
            bg="#fff"
            onPress={() =>
              rejectRequest(requestId || reqSent?._id, {
                type: "cancel",
              })
            }
          />
        ) : (
          <BiconSm title="Add" onPress={() => sendRequest(_id)} />
        )}
      </Pressable>
    </View>
  );
};
export default PeopTab;

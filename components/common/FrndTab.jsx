import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { useState } from "react";
import { primary } from "../../utils/constant";
import moment from "moment";
import profile from "../../assets/profile.png";

const FrndTab = ({ navigation, user, selected, setSelected }) => {
  const [lastMsg, setLastMsg] = useState(user?.room?.lastMessage);
  const onPress = () => {
    navigation.navigate("Chat", { user });
  };

  const onLongPress = () => {
    if (selected.includes(user?._id))
      setSelected(selected.filter((e) => e !== user?._id));
    else setSelected([...selected, user?._id]);
  };

  return (
    <Pressable
      onPress={selected.length ? onLongPress : onPress}
      onLongPress={onLongPress}
      style={tw`${
        selected.includes(user?._id) ? "bg-gray-100" : "bg-white"
      } flex flex-row items-center justify-between gap-1 py-1 px-2`}
    >
      <View style={tw`flex flex-row items-center gap-3`}>
        <Image
          source={user?.profilePic || profile}
          style={tw`h-14 w-14 rounded-full`}
        />
        <View>
          <Text style={tw`text-lg font-bold`}>{user?.name}</Text>
          <View style={tw`flex flex-row items-center gap-1`}>
            {lastMsg && (
              <IonIcon name="checkmark-circle-outline" color="gray" />
            )}
            <Text style={tw`text-xs text-gray-400 ${!lastMsg ? "italic" : ""}`}>
              {lastMsg?.message || "Start Conversation"}
            </Text>
          </View>
        </View>
      </View>
      <View>
        {selected.includes(user?._id) ? (
          <IonIcon
            name="checkmark-circle"
            color={primary}
            size={28}
            style={tw`mr-3`}
          />
        ) : (
          lastMsg && (
            <Text style={tw`text-gray-400 mr-2`}>
              {moment(user?.room?.lastMessage?.createdAt) <
              moment(new Date()).startOf("day")
                ? moment(user?.room?.lastMessage?.createdAt).format("D MMM")
                : moment(user?.room?.lastMessage?.createdAt).format("hh:mm A")}
            </Text>
          )
        )}
      </View>
    </Pressable>
  );
};

export default FrndTab;

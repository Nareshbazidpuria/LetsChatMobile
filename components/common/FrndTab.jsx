import { Image, Pressable } from "react-native";
import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { useState } from "react";
import { primary } from "../../utils/constant";

const FrndTab = ({ navigation, logo, msg, selected, setSelected }) => {
  const onPress = () => {
    navigation.navigate("Chat", { logo, msg });
  };

  const onLongPress = () => {
    if (selected.includes(msg.user))
      setSelected(selected.filter((e) => e !== msg.user));
    else setSelected([...selected, msg.user]);
  };

  return (
    <Pressable
      onPress={selected.length ? onLongPress : onPress}
      onLongPress={onLongPress}
      style={tw`${
        selected.includes(msg.user) ? "bg-gray-100" : "bg-white"
      } flex flex-row items-center justify-between gap-1 py-1 px-2`}
    >
      <View style={tw`flex flex-row items-center gap-1`}>
        <Image source={{ uri: logo }} style={tw`h-16 w-16 rounded-full`} />

        <View>
          <Text style={tw`text-base font-bold`}>{msg?.user}</Text>
          <View style={tw`flex flex-row items-center gap-1`}>
            <IonIcon name="checkmark-circle-outline" color="gray" />
            <Text style={tw`text-xs text-gray-400`}>{msg?.text}</Text>
          </View>
        </View>
      </View>
      <View>
        {selected.includes(msg.user) ? (
          <IonIcon
            name="checkmark-circle"
            color={primary}
            size={28}
            style={tw`mr-3`}
          />
        ) : (
          <Text style={tw`text-gray-400 mr-2`}>{msg?.time}</Text>
        )}
      </View>
    </Pressable>
  );
};

export default FrndTab;

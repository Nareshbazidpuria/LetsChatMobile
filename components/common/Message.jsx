import { Dimensions, Image, Pressable, Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { msgType } from "../../utils/constant";

const Message = ({ msg, onPress }) => {
  const {
    delevered = true,
    _id,
    roomId,
    sentBy,
    message,
    contentType,
    read,
    createdAt,
    type,
    user,
    height,
    width,
  } = msg;

  const [uniqueId, setUniqueId] = useState("");
  // const colors = ["#06a600", "#8aa600", "#dbb300", "#7000a8", "#a80022"];

  useEffect(() => {
    if (user) {
      let generatedId = "";
      (sentBy || "").split("").forEach((char) => {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122 && generatedId.length < 5)
          generatedId += char;
      });
      setUniqueId(generatedId);
    }
  }, [user]);

  return (
    <Pressable
      style={tw`p-2 rounded-xl bg-[#d4f9ff] self-${
        type === msgType.in ? "start rounded-bl-none" : "end rounded-br-none"
      } max-w-4/5 my-1 mx-3 overflow-hidden`}
      onPress={onPress}
    >
      {user && type === msgType.in && (
        <Text
          style={{
            ...tw`font-bold text-gray-400`,
            fontSize: 10,
            // color: colors[parseInt(Math.random() * 4 + 1)],
          }}
        >
          User-{uniqueId}
        </Text>
      )}
      {msg?.src?.uri ? (
        <Image
          source={{ uri: msg.src.uri }}
          width={(Dimensions.get("window").width * 4) / 5 - 20}
          height={
            (((Dimensions.get("window").width * 4) / 5 - 20) *
              (msg.src.height || height)) /
              (msg.src.width || width) <
            450
              ? (((Dimensions.get("window").width * 4) / 5 - 20) *
                  (msg.src.height || height)) /
                (msg.src.width || width)
              : 450
          }
        />
      ) : (
        <Text style={tw`mr-3`}>{message}</Text>
      )}
      <View style={tw`flex flex-row gap-1 justify-end items-center`}>
        <Text style={tw`text-xs text-gray-400`}>
          {moment(createdAt).format("h:mm A")}
        </Text>
        {type === msgType.out ? (
          <IonIcon
            name={`checkmark-${
              read
                ? "done-circle"
                : delevered
                ? "done-circle-outline"
                : "circle-outline"
            }`}
            color="gray"
            size={15}
          />
        ) : (
          <></>
        )}
      </View>
    </Pressable>
  );
};

export default Message;

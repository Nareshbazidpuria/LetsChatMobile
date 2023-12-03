import { Dimensions, Image, Pressable, Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import moment from "moment/moment";
import { useEffect, useState } from "react";

const Message = ({ msg, onPress }) => {
  const { type, delevered, seen, user } = msg;
  const [uniqueId, setUniqueId] = useState("");
  const colors = ["#06a600", "#8aa600", "#dbb300", "#7000a8", "#a80022"];

  useEffect(() => {
    if (user) {
      let generatedId = "";
      user.split("").forEach((char) => {
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
        type === "in" ? "start rounded-bl-none" : "end rounded-br-none"
      } max-w-4/5 my-1 mx-3 overflow-hidden`}
      onPress={onPress}
    >
      {user && (
        <Text
          style={{
            ...tw`text-xs font-bold`,
            color:
              type === "in"
                ? colors[parseInt(Math.random() * 4 + 1)]
                : "#00a66c",
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
            (((Dimensions.get("window").width * 4) / 5 - 20) * msg.src.height) /
              msg.src.width <
            450
              ? (((Dimensions.get("window").width * 4) / 5 - 20) *
                  msg.src.height) /
                msg.src.width
              : 450
          }
        />
      ) : (
        <Text style={tw`mr-3`}>
          {msg?.text || "Hi there, I am using Let's Chat."}
        </Text>
      )}
      <View style={tw`flex flex-row gap-1 justify-end items-center`}>
        <Text style={tw`text-xs text-gray-400`}>
          {msg?.time ? moment(msg?.time).format("h:mm A") : "7:30 AM"}
        </Text>
        {type !== "in" ? (
          <IonIcon
            name={`checkmark-${
              seen
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

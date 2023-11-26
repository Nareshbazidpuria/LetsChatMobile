import { Dimensions, Image, Pressable, Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import moment from "moment/moment";

const Message = ({ msg, onPress }) => {
  const { type, delevered, seen } = msg;

  return (
    <Pressable
      style={tw`p-2 rounded-xl bg-[#d4f9ff] self-${
        type === "in" ? "start rounded-bl-none" : "end rounded-br-none"
      } max-w-4/5 my-1 mx-3 overflow-hidden`}
      onPress={onPress}
    >
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

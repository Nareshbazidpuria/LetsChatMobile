import { FlatList, Image, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import { primary } from "../../utils/constant";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import Message from "../common/Message";

const Chat = ({ route }) => {
  const { logo, msg } = route.params;
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e);
  };
  return (
    <>
      <View
        style={tw`p-3 bg-[${primary}] flex flex-row items-center justify-between`}
      >
        <View style={tw`flex flex-row gap-3 items-center`}>
          <Image
            source={logo}
            style={tw`h-10 w-10 border border-white rounded-full`}
          />
          <Text style={tw`text-white text-lg font-bold`}>{msg?.user}</Text>
        </View>
        {!msg?.ann && (
          <View style={tw`flex flex-row gap-6 items-center`}>
            <IonIcon name="call" color="#fff" size={20} />
            <IonIcon name="videocam" color="#fff" size={20} />
            <IonIcon name="ellipsis-vertical" color="#fff" size={20} />
          </View>
        )}
      </View>
      <FlatList
        data={[
          { delevered: true, seen: true },
          { type: "in" },
          { type: "in" },
          { delevered: true, seen: true },
          { delevered: true, seen: true },
          { delevered: true, seen: true },
          { type: "in" },
          { type: "in" },
          { delevered: true, seen: true },
          { type: "in" },
          { delevered: true, seen: true },
          { type: "in" },
          { type: "in" },
          { type: "in" },
          { type: "in" },
          { delevered: true, seen: true },
          { delevered: true, seen: true },
          { type: "in" },
          { type: "in" },
          { delevered: true, seen: true },
          { type: "in" },
          { delevered: true, seen: true },
          { delevered: true, seen: false },
          { delevered: false, seen: false },
          { delevered: false, seen: false },
        ]}
        renderItem={({ item }) => <Message msg={item} />}
      />
      <View>
        <View
          style={tw`px-2 border border-gray-300 rounded-full m-1 bg-white flex flex-row items-center`}
        >
          <IonIcon style={tw`w-[6%]`} name="happy" size={25} color="gray" />
          <TextInput
            onChangeText={onChange}
            value={message}
            style={tw`text-base px-3 py-2 w-[${
              msg?.ann || message.length ? 87 : 79
            }%]`}
            placeholder="Message"
          />
          {!msg?.ann && !message.length && (
            <>
              <IonIcon
                style={tw`w-[8%]`}
                name="attach"
                size={25}
                color="gray"
              />
              <IonIcon
                style={tw`w-[8%]`}
                name="camera"
                size={25}
                color="gray"
              />
            </>
          )}
          {message.length ? (
            <IonIcon style={tw`w-[8%]`} name="send" size={25} color={primary} />
          ) : (
            <></>
          )}
        </View>
      </View>
    </>
  );
};

export default Chat;

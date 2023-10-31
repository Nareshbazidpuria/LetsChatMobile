import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import { primary } from "../../utils/constant";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import Message from "../common/Message";
import { useEffect } from "react";

const Chat = ({ navigation, route }) => {
  const { logo, msg } = route.params;
  const [message, setMessage] = useState("");
  const [img, setImg] = useState({});
  const [chats, setChats] = useState([
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
  ]);
  const msgs = useRef();
  const onChange = (e) => {
    setMessage(e);
  };
  const chooseImg = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });

      console.log(result);
      if (!result?.canceled) {
        setImg(result?.assets[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const scrollChat = () => {
    if (msgs?.current) {
      msgs?.current?.scrollToEnd();
    }
  };

  useEffect(() => {
    scrollChat();
  }, [msgs?.current, chats]);

  useEffect(() => {
    setTimeout(() => {
      scrollChat();
    }, 50);
  }, []);

  return (
    <>
      <View
        style={tw`p-3 bg-[${primary}] flex flex-row items-center justify-between`}
      >
        <Pressable onPress={() => navigation?.navigate("Profile", { msg,logo })}>
          <View style={tw`flex flex-row gap-3 items-center`}>
            <Image
              source={logo}
              style={tw`h-10 w-10 border border-white rounded-full`}
            />
            <Text style={tw`text-white text-lg font-bold`}>{msg?.user}</Text>
          </View>
        </Pressable>
        {!msg?.ann && (
          <View style={tw`flex flex-row gap-6 items-center`}>
            <IonIcon name="call" color="#fff" size={20} />
            <IonIcon name="videocam" color="#fff" size={20} />
            <IonIcon name="ellipsis-vertical" color="#fff" size={20} />
          </View>
        )}
      </View>
      <FlatList
        ref={msgs}
        data={chats}
        renderItem={({ item }) => <Message msg={item} />}
      />
      <View>
        <View
          style={tw`px-2 border border-gray-300 rounded-full m-1 bg-white flex flex-row items-center`}
        >
          <IonIcon style={tw`w-[8%]`} name="happy" size={25} color="gray" />
          <TextInput
            onChangeText={onChange}
            value={message}
            style={tw`text-base px-3 py-2 w-[${
              msg?.ann || message.length ? 83 : 75
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
                onPress={chooseImg}
              />
            </>
          )}
          {message.length ? (
            <IonIcon
              style={tw`w-[8%]`}
              name="send"
              size={25}
              color={primary}
              onPress={() => {
                setChats([
                  ...chats,
                  { delevered: false, seen: false, text: message },
                ]);
                setMessage("");
                // msgs?.current?.scrollToOffset({ animated: true, offset: 0 });
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      {img?.uri ? (
        <View
          style={tw`absolute bg-gray-800 w-full h-full py-3 flex justify-between items-center`}
        >
          <Text style={tw`text-white font-bold text-lg`}>
            Sending to {msg?.user}
          </Text>
          <Image
            source={{
              uri: img?.uri,
            }}
            width={Dimensions.get("window").width - 20}
            height={
              Dimensions.get("window").height - 150 <
              ((Dimensions.get("window").width - 20) * img?.height) / img?.width
                ? Dimensions.get("window").height - 150
                : ((Dimensions.get("window").width - 20) * img?.height) /
                  img?.width
            }
          />
          <View style={tw`flex flex-row justify-around w-full`}>
            <Text
              style={tw`text-white px-5 py-2 text-base`}
              onPress={() => setImg({})}
            >
              Cancel
            </Text>
            <Text
              style={tw`text-white px-5 py-2 text-base`}
              onPress={() => {
                setChats([
                  ...chats,
                  { delevered: false, seen: false, src: img },
                ]);
                setImg({});
              }}
            >
              Send
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default Chat;

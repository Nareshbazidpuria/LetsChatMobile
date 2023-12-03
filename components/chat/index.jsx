import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import { primary } from "../../utils/constant";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import Message from "../common/Message";
import { useEffect } from "react";
import ImgPreview from "../common/ImgPreview";
import {
  requestPermissionsAsync,
  saveToLibraryAsync,
} from "expo-media-library";

const Chat = ({ navigation, route }) => {
  const { logo, msg } = route.params;
  const msgs = useRef();
  const toast = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [message, setMessage] = useState("");
  const [img, setImg] = useState({});
  const [preview, setPreview] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
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

  const sendMsg = () => {
    setChats([
      ...chats,
      {
        delevered: false,
        seen: false,
        text: message,
        time: new Date(),
        user: msg?.user,
      },
    ]);
    setMessage("");
  };

  const sendFile = () => {
    setChats([...chats, { delevered: false, seen: false, src: img }]);
    setImg({});
  };

  const saveFile = async () => {
    try {
      const { status } = await requestPermissionsAsync();
      if (status === "granted") {
        await saveToLibraryAsync(preview?.uri);
        toast("File save successfully");
      }
    } catch (error) {
      toast("Unable to save");
    }
  };

  const onMsgPress = (item) => {
    if (item?.src?.uri) setPreview(item.src);
  };

  const onChange = (e) => {
    setMessage(e);
  };

  const chooseImg = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
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

  const onScroll = (e) =>
    e.nativeEvent.contentOffset.y +
      e.nativeEvent.layoutMeasurement.height +
      100 <
    e.nativeEvent.contentSize.height
      ? setScrollEnd(true)
      : setScrollEnd(false);

  useEffect(() => {
    scrollChat();
  }, [msgs?.current, chats]);

  useEffect(() => {
    setTimeout(() => {
      scrollChat();
    }, 70);
  }, []);

  return (
    <>
      <View
        style={tw`p-3 bg-[${primary}] flex flex-row items-center justify-between`}
      >
        <Pressable
          onPress={() => navigation?.navigate("Profile", { msg, logo })}
        >
          <View style={tw`flex flex-row gap-3 items-center`}>
            <Image
              source={msg?.ann ? logo : { uri: msg?.image }}
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
        onScroll={onScroll}
        ref={msgs}
        data={chats}
        renderItem={({ item }) => (
          <Message
            msg={{ ...item, user: msg?.ann ? msg?.user : false }}
            onPress={() => onMsgPress(item)}
          />
        )}
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
              onPress={sendMsg}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      {img?.uri && (
        <ImgPreview
          title={"Sending to " + msg?.user}
          img={img}
          onOk={sendFile}
          onCancel={() => setImg({})}
        />
      )}
      {scrollEnd && (
        <Pressable
          style={tw`absolute bottom-16 right-4 bg-white rounded-full h-11 p-1 shadow`}
          onPress={scrollChat}
        >
          <IonIcon name="chevron-down" color="gray" size={36} />
        </Pressable>
      )}
      {preview && (
        <ImgPreview
          title={msg?.user}
          img={preview}
          onOk={saveFile}
          onCancel={() => setPreview(false)}
          okText="Save"
          cancleText="Back"
        />
      )}
    </>
  );
};

export default Chat;

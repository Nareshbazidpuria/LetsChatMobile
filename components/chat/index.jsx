import {
  Alert,
  BackHandler,
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
import { annRoom, contentType, msgType, primary } from "../../utils/constant";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useRef, useState, useEffect } from "react";
import Message from "../common/Message";
import ImgPreview from "../common/ImgPreview";
import profile from "../../assets/profile.png";

import {
  requestPermissionsAsync,
  saveToLibraryAsync,
} from "expo-media-library";
import { getMsgsApi } from "../../api/apis";
import { chooseImgGallery, uploadImg } from "../../utils/common";
import { baseURL } from "../../api/axios";

const Chat = ({ navigation, route }) => {
  const { user, socket } = route.params;
  const msgs = useRef();
  const toast = (msg) => ToastAndroid.show(msg, ToastAndroid.LONG);
  const [message, setMessage] = useState("");
  const [img, setImg] = useState({});
  const [preview, setPreview] = useState(false);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [receivedMsg, setReceivedMsg] = useState(false);
  const [chats, setChats] = useState([
    // { delevered: true, seen: true },
    // { type: "in" },
    // { type: "in" },
    // { delevered: true, seen: true },
    // { delevered: true, seen: true },
    // { delevered: true, seen: true },
    // { type: "in" },
    // { type: "in" },
    // { delevered: true, seen: true },
    // { type: "in" },
    // { delevered: true, seen: true },
    // { type: "in" },
    // { type: "in" },
    // { type: "in" },
    // { type: "in" },
    // { delevered: true, seen: true },
    // { delevered: true, seen: true },
    // { type: "in" },
    // { type: "in" },
    // { delevered: true, seen: true },
    // { type: "in" },
    // { delevered: true, seen: true },
    // { delevered: true, seen: false },
    // { delevered: false, seen: false },
    // { delevered: false, seen: false },
  ]);

  const sendMsg = (additional = {}) => {
    if (socket) {
      setChats([
        ...chats,
        {
          delevered: false,
          seen: false,
          message,
          type: msgType.out,
          time: new Date(),
          user: user?.name,
          ...additional,
        },
      ]);
      if (additional.src) delete additional.src;
      socket.emit("message", {
        message: { message, ...additional },
        roomId: user?.room?._id,
      });
      setMessage("");
    }
  };

  const sendFile = async () => {
    const res = await uploadImg(img);
    if (res?.status === 200) {
      // setChats([...chats, { delevered: false, seen: false, src: img }]);
      sendMsg({
        src: img,
        height: img.height,
        width: img.width,
        message: res.data?.data?.src,
        contentType: contentType.img,
      });
      setImg({});
    }
  };

  const saveFile = async () => {
    try {
      const { status } = await requestPermissionsAsync();
      if (status === "granted") {
        await saveToLibraryAsync(preview?.uri);
        toast("File save successfully");
      }
    } catch (error) {
      console.log(error);
      toast("Unable to save");
    }
  };

  const onMsgPress = (item) => {
    if (item?.src?.uri) setPreview({ ...item.src, item });
  };

  const onChange = (e) => {
    setMessage(e);
  };

  const chooseImg = async () => {
    let img = await chooseImgGallery();
    if (img) setImg(img);
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

  const joinChat = async () => {
    try {
      socket.emit("join", user.room._id);
      // setPage(1);
      // typeMessage.current.focus();
      // setLoadingChat(true);
      // setChats([]);
      if (user?.room?._id && user.room._id !== annRoom) {
        const res = await getMsgsApi(user.room._id, 1);
        if (res?.status === 200) {
          // setTotalRecords(res?.data?.data?.totalRecords);
          // setLoadingChat(false);
          setChats(
            res?.data?.data?.data?.map((msg) =>
              msg?.contentType === contentType.img
                ? {
                    ...msg,
                    src: { uri: baseURL.split("mob")[0] + msg.message },
                  }
                : msg
            )
          );
          // setChats([{ delevered: true, seen: true }]);
        }
      }
      // setLoadingChat(false);
    } catch (error) {
      // setLoadingChat(false);
      // console.log(error);
    } finally {
      setLoaded(true);
      setTimeout(() => {
        scrollChat();
      }, 500);
    }
  };

  useEffect(() => {
    scrollChat();
  }, [msgs?.current, chats]);

  useEffect(() => {
    setTimeout(() => {
      scrollChat();
    }, 70);
  }, []);

  useEffect(() => {
    joinChat();
    return () => socket.off();
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (socket) socket.emit("leave", user?.room?._id);
      }
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (loaded) socket.on("receive", (msg) => setReceivedMsg(msg));
  }, [loaded]);

  useEffect(() => {
    if (receivedMsg) {
      if (receivedMsg?.contentType === contentType.img)
        receivedMsg.src = {
          uri: baseURL.split("mob")[0] + receivedMsg.message,
        };
      setChats([
        ...chats,
        {
          ...receivedMsg,
          message: receivedMsg.message,
          time: receivedMsg.createdAt,
          type:
            receivedMsg.sentBy === user._id || user.room._id === annRoom
              ? msgType.in
              : msgType.out,
          sentBy: receivedMsg.sentBy,
        },
      ]);
    }
  }, [receivedMsg]);

  useEffect(() => {
    setTimeout(() => {
      // document.getElementById("testttt").style.border = "1px solid";
    }, 5000);
  }, []);

  return (
    <>
      <View
        style={tw`p-3 bg-[${primary}] flex flex-row items-center justify-between`}
      >
        <Pressable onPress={() => navigation?.navigate("Profile", { user })}>
          <View style={tw`flex flex-row gap-3 items-center`}>
            <Image
              source={user?.profilePic || profile}
              style={tw`h-10 w-10 border border-white rounded-full`}
            />
            <Text style={tw`text-white text-lg font-bold`}>{user?.name}</Text>
          </View>
        </Pressable>
        {!user?.ann && (
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
            msg={{ ...item, user: user?.ann ? user?.name : false }}
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
              user?.ann || message.length ? 83 : 75
            }%]`}
            placeholder="Message"
          />
          {!user?.ann && !message.length && (
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
              onPress={() => sendMsg()}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      {img?.uri && (
        <ImgPreview
          title={"Sending to " + user?.name}
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
          title={user?.name}
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

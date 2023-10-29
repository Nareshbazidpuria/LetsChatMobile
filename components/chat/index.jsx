import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Text,
  TextInput,
  View,
} from "react-native";
import tw from "twrnc";
// import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import { primary } from "../../utils/constant";
import IonIcon from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import Message from "../common/Message";
import { useEffect } from "react";

const Chat = ({ route }) => {
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

  // const requestCameraPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CAMERA
  //       // {
  //       //   title: "Cool Photo App Camera Permission",
  //       //   message:
  //       //     "Cool Photo App needs access to your camera " +
  //       //     "so you can take awesome pictures.",
  //       //   buttonNeutral: "Ask Me Later",
  //       //   buttonNegative: "Cancel",
  //       //   buttonPositive: "OK",
  //       // }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log(await launchCamera());
  //     } else {
  //       console.log("Camera permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const requestStoragePermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  //       // {
  //       //   title: "Cool Photo App Camera Permission",
  //       //   message:
  //       //     "Cool Photo App needs access to your camera " +
  //       //     "so you can take awesome pictures.",
  //       //   buttonNeutral: "Ask Me Later",
  //       //   buttonNegative: "Cancel",
  //       //   buttonPositive: "OK",
  //       // }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the camera");
  //     } else {
  //       console.log("Camera permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  const chooseImg = async () => {
    // launchImageLibrary
    try {
      // await requestCameraPermission();
      // await requestStoragePermission();
      // console.log(11);
      // const result = await launchImageLibrary();
      // console.warn(result);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });

      console.log(result);
      if (!result?.canceled) {
        // setChats([
        //   ...chats,
        //   { delevered: false, seen: false, src: result?.assets[0] },
        // ]);
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
        // inverted
        ref={msgs}
        data={chats}
        renderItem={({ item }) => <Message msg={item} />}
        // initialScrollIndex={chats.length - 1}
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

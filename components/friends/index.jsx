import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  Image,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import annony from "../../assets/annony.png";
import random from "../../assets/random.gif";
import empty from "../../assets/empty.gif";
import tw from "twrnc";
import FrndTab from "../common/FrndTab";
import { useEffect, useState } from "react";
import { primary } from "../../utils/constant";
import Bicon from "../common/Bicon";
import { getUsersApi } from "../../api/apis";
import { baseURL, socketURL } from "../../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/common";
import { io } from "socket.io-client";

const Friends = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.searchText);
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState([]);
  const [socket, setSocket] = useState(null);

  /*

    [
      {
        "_id": "64cde7ca988cb0fe2cf3a3e1",
        "name": "Testing User",
        "userName": "test",
        "email": "nkbazidpuria@gmail.com",
        "status": "active",
        "lastJoined": "64cde7f2988cb0fe2cf3a41a",
        "room": {
          "_id": "64cde7f2988cb0fe2cf3a41a",
          "lastMessage": {
            "_id": "64cde819988cb0fe2cf3a453",
            "message": "hii",
            "createdAt": "2023-08-05T06:11:37.192Z",
            "type": "outgoing"
          }
        }
      }
    ]


    */

  const fetccUser = async (params = {}) => {
    try {
      setRefreshing(true);
      setSelected([]);
      const res = await getUsersApi({ ...params, type: "friends" });
      if (res?.status === 200) {
        const users = res?.data?.data?.data?.map((user) => {
          if (user?.profilePic)
            user = {
              ...user,
              profilePic: { uri: baseURL.split("mob")[0] + user.profilePic },
            };
          return user;
        });
        setChats(users);
        // console.log(JSON.stringify(users, null, 2));
        // const users = res?.data?.data?.data?.map((user) => ({
        //   ...user,
        //   user: user?.name,
        //   userName: user?.userName,
        //   text: user?.room?.lastMessage?.message,
        //   time: user?.room?.lastMessage?.createdAt,
        //   image: user?.image ? { uri: user?.image } : profile,
        // }));
        // setChats(users);
      } else setChats([]);

      // const res = await axios.get("https://dummyjson.com/users");
      // const users = res?.data?.users?.map((user) => ({
      //   ...user,
      //   user: user?.firstName + " " + user?.lastName,
      //   userName: user?.username,
      //   text: "Hi",
      //   time: "7:30 AM",
      //   image: user?.image ? { uri: user?.image } : profile,
      // }));
      // if (users?.length) setChats(users);
    } catch (error) {
      setChats([]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetccUser(searchText?.text ? { name: searchText?.text } : {});
  }, [searchText.text]);

  useEffect(() => {
    navigation.addListener("focus", () =>
      dispatch(setSearchText({ text: "", open: false }))
    );
  }, []);

  useEffect(async () => {
    const socket = io(socketURL, {
      auth: { token: await AsyncStorage.getItem("token") },
    });
    setSocket(socket);
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <FrndTab
            navigation={navigation}
            user={item}
            selected={selected}
            setSelected={setSelected}
            socket={socket}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetccUser} />
        }
        ListEmptyComponent={
          <View style={tw`flex justify-center items-center h-[120]`}>
            <Image style={tw`w-full h-80`} source={empty} />
            <Text style={tw`font-bold text-xl text-gray-400 text-center`}>
              No Friends
            </Text>
            <Text style={tw`text-gray-400 text-center mb-3`}>
              Add friends to start conversation
            </Text>
            <Bicon
              name="add"
              title="Add"
              onPress={() => navigation.navigate("People")}
            />
          </View>
        }
      />
      <Pressable
        style={tw`absolute bottom-8 right-3 bg-[${primary}] rounded-full p-4`}
        onPress={() =>
          navigation.navigate("Chat", {
            user: { name: "Annonymous Users", ann: true, profilePic: random },
          })
        }
      >
        <Image source={annony} style={tw`h-7 w-7`} />
      </Pressable>
    </View>
  );
};

export default Friends;

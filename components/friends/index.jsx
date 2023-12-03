import { FlatList, Pressable, RefreshControl, Text } from "react-native";
import { View } from "react-native";
import annony from "../../assets/annony.png";
import random from "../../assets/random.gif";
import empty from "../../assets/empty.gif";
import tw from "twrnc";
import { Image } from "react-native";
import FrndTab from "../common/FrndTab";
import axios from "axios";
import { useEffect, useState } from "react";
import { primary } from "../../utils/constant";
import Bicon from "../common/Bicon";

const Friends = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState([]);

  const fetccUser = async () => {
    setRefreshing(true);
    setSelected([]);
    const res = await axios.get("https://dummyjson.com/users");
    const users = res?.data?.users?.map((user) => ({
      ...user,
      user: user?.firstName + " " + user?.lastName,
      userName: user?.username,
      text: "Hi",
      time: "7:30 AM",
      image: user?.image,
    }));

    if (users?.length) setChats(users);
    setRefreshing(false);
  };

  useEffect(() => {
    fetccUser();
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <FrndTab
            navigation={navigation}
            msg={item}
            logo={item?.image}
            selected={selected}
            setSelected={setSelected}
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
            logo: random,
            msg: { user: "Annonymous Users", ann: true },
          })
        }
      >
        <Image source={annony} style={tw`h-7 w-7`} />
      </Pressable>
    </View>
  );
};

export default Friends;

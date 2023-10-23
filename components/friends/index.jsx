import { FlatList, Pressable } from "react-native";
import { View } from "react-native";
import logo from "../../assets/icon.png";
import random from "../../assets/random.gif";
import tw from "twrnc";
import { Image } from "react-native";
import FrndTab from "../common/FrndTab";

const Friends = ({ navigation }) => {
  const chats = [
    { user: "Ramesh Nath", text: "Hi", time: "7:30 AM" },
    { user: "Sanjay", text: "Hi", time: "7:30 AM" },
    { user: "Gaurav", text: "Hi", time: "7:30 AM" },
    { user: "Rinku", text: "Hi", time: "7:30 AM" },
    { user: "Parvesh Sir", text: "Hi", time: "7:30 AM" },
    { user: "Tushar Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
    { user: "Pankaj Sir", text: "Hi", time: "7:30 AM" },
  ];
  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <FrndTab navigation={navigation} msg={item} logo={logo} />
        )}
      />
      <Pressable
        style={tw`absolute bottom-8 right-3`}
        onPress={() =>
          navigation.navigate("Chat", {
            logo: random,
            msg: { user: "Annonymous Users", ann: true },
          })
        }
      >
        <Image source={random} style={tw`h-20 w-20`} />
      </Pressable>
    </View>
  );
};

export default Friends;

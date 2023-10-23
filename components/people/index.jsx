import { FlatList, ScrollView } from "react-native";
import { View } from "react-native";
import logo from "../../assets/icon.png";
import tw from "twrnc";
import PeopTab from "../common/PeopTab";
import ReqTab from "../common/ReqTab";

const People = () => {
  const chats = [
    { userName: "ramesh_nath", user: "Ramesh Nath", reqSent: true },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "ramesh_nath", user: "Ramesh Nath", reqSent: true },
    { userName: "rinku", user: "Rinku", reqReceived: true },
    { userName: "rinku", user: "Rinku", reqReceived: true },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "rinku", user: "Rinku", reqReceived: true },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "gaurav", user: "Gaurav", reqSent: true },
    { userName: "gaurav", user: "Gaurav", reqSent: true },
    { userName: "rinku", user: "Rinku", reqReceived: true },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "rinku", user: "Rinku", reqReceived: true },
  ];
  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView>
        {chats?.map((chat, i) =>
          chat.reqReceived ? (
            <ReqTab key={i} msg={chat} logo={logo} />
          ) : (
            <PeopTab key={i} msg={chat} logo={logo} />
          )
        )}
      </ScrollView>
    </View>
  );
};

export default People;

import { FlatList } from "react-native";
import { View } from "react-native";
import logo from "../../assets/icon.png";
import tw from "twrnc";
import ReqTab from "../common/ReqTab";

const Requests = () => {
  const chats = [
    { userName: "ramesh_nath", user: "Ramesh Nath" },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "gaurav", user: "Gaurav" },
    { userName: "rinku", user: "Rinku" },
  ];
  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ReqTab msg={item} logo={logo} />}
      />
    </View>
  );
};

export default Requests;

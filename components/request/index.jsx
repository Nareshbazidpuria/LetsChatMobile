import { FlatList, Image, Text } from "react-native";
import { View } from "react-native";
import logo from "../../assets/icon.png";
import tw from "twrnc";
import ReqTab from "../common/ReqTab";
import empty from "../../assets/empty.gif";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSearchText } from "../../redux/common";

const Requests = ({ navigation }) => {
  const dispatch = useDispatch();
  const chats = [
    { userName: "ramesh_nath", user: "Ramesh Nath" },
    { userName: "sanjay", user: "Sanjay" },
    { userName: "gaurav", user: "Gaurav" },
    { userName: "rinku", user: "Rinku" },
  ];

  useEffect(() => {
    navigation.addListener("focus", () =>
      dispatch(setSearchText({ text: "", open: false }))
    );
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ReqTab msg={item} logo={logo} />}
        ListEmptyComponent={
          <View style={tw`flex justify-center items-center h-[120]`}>
            <Image style={tw`w-full h-80`} source={empty} />
            <Text style={tw`font-bold text-xl text-gray-400 text-center`}>
              No Requests
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Requests;

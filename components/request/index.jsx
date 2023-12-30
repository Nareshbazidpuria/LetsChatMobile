import { FlatList, Image, RefreshControl, Text } from "react-native";
import { View } from "react-native";
import logo from "../../assets/icon.png";
import tw from "twrnc";
import ReqTab from "../common/ReqTab";
import empty from "../../assets/empty.gif";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setSearchText } from "../../redux/common";
import { getReqsApi, getUsersApi } from "../../api/apis";
import { baseURL } from "../../api/axios";

const Requests = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.searchText);
  const [reqs, setReqs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetccReqs = async (params = {}) => {
    try {
      setRefreshing(true);
      const res = await getReqsApi(params);
      if (res?.status === 200) {
        const requests = res?.data?.data?.data?.map((request) => {
          if (request?.profilePic)
            request = {
              ...request,
              profilePic: { uri: baseURL.split("mob")[0] + request.profilePic },
            };
          return request;
        });
        setReqs(requests);
      } else setReqs([]);
    } catch (error) {
      setReqs([]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetccReqs(searchText?.text ? { name: searchText?.text } : {});
  }, [searchText.text]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(setSearchText({ text: "", open: false }));
      fetccReqs();
    });
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={reqs}
        renderItem={({ item }) => <ReqTab user={item} cb={() => fetccReqs()} />}
        ListEmptyComponent={
          <View style={tw`flex justify-center items-center h-[120]`}>
            <Image style={tw`w-full h-80`} source={empty} />
            <Text style={tw`font-bold text-xl text-gray-400 text-center`}>
              No Requests
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetccReqs} />
        }
      />
    </View>
  );
};

export default Requests;

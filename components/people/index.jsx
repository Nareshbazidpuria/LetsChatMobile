import { FlatList, RefreshControl, ScrollView } from "react-native";
import { View } from "react-native";
import logo from "../../assets/icon.png";
import tw from "twrnc";
import PeopTab from "../common/PeopTab";
import ReqTab from "../common/ReqTab";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../redux/common";
import { useEffect, useState } from "react";
import { getUsersApi } from "../../api/apis";
import { baseURL } from "../../api/axios";

const People = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.searchText);
  const [people, setPeople] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetccUser = async (params = {}) => {
    try {
      setRefreshing(true);
      const res = await getUsersApi(params);
      if (res?.status === 200) {
        const users = res?.data?.data?.data?.map((user) => {
          if (user?.profilePic)
            user = {
              ...user,
              profilePic: { uri: baseURL.split("mob")[0] + user.profilePic },
            };
          return user;
        });
        setPeople(users);
      } else setPeople([]);
    } catch (error) {
      setPeople([]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetccUser(searchText?.text ? { name: searchText?.text } : {});
  }, [searchText.text]);

  useEffect(() => {
    navigation.addListener("focus", () => {
      dispatch(setSearchText({ text: "", open: false }));
      fetccUser();
    });
  }, []);

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={people}
        renderItem={({ item, i }) =>
          item.reqReceived ? (
            <ReqTab key={i} user={item} />
          ) : (
            <PeopTab key={i} user={item} />
          )
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetccUser} />
        }
      />
    </View>
  );
};

export default People;

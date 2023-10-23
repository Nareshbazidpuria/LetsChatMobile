import { Text, View } from "react-native";
import IonIcon from "@expo/vector-icons/Ionicons";
import tw from "twrnc";

const Message = ({ msg }) => {
  const { type, delevered, seen } = msg;
  return (
    <View
      style={tw`p-2 bg-sky-100 rounded-xl self-${
        type === "in" ? "start" : "end"
      } max-w-4/5 my-1 mx-3`}
    >
      <Text style={tw`mr-3`}>Hi there, I am using Let's Chat.</Text>
      <View style={tw`flex flex-row gap-1 justify-end items-center`}>
        <Text style={tw`text-xs text-gray-400`}>7:30 AM</Text>
        {type !== "in" ? (
          <IonIcon
            name={`checkmark-${
              seen
                ? "done-circle"
                : delevered
                ? "done-circle-outline"
                : "circle-outline"
            }`}
            color="gray"
            size={15}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Message;

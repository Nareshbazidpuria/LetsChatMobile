import { Button, Image, Pressable, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/constant";
import RBSheet from "react-native-raw-bottom-sheet";
import { useRef } from "react";

const Cover = ({ logo }) => {
  const refRBSheet = useRef();

  return (
    <>
      <View style={tw`px-4 h-36 bg-sky-100 flex items-center`}>
        <Image
          style={tw`relative top-14 h-40 w-40 border-4 border-sky-100 rounded-full bg-white`}
          source={{ uri: logo }}
        />
        <Pressable onPress={() => alert("Not available yet")}>
          <View
            style={tw`bg-[${primary}] relative top-4 left-16 border border-white rounded-full h-12 w-12 flex items-center justify-center`}
          >
            <IonIcon name="camera" color="#fff" size={25} />
          </View>
        </Pressable>
      </View>
      <Pressable
        style={tw`absolute right-4 top-6`}
        onPress={() => refRBSheet.current.open()}
      >
        <IonIcon name="pencil" color="#fff" size={20} />
      </Pressable>
      <View style={tw`h-22`} />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        animationType="fade"
        customStyles={{
          container: {
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}
      >
        <View style={tw`p-4`}>
          <Text>Email</Text>
          <TextInput
            editable={false}
            style={tw`border-b border-gray-400 mb-4`}
            value="rooaieeqw@aurtuid.ruwie"
          />
          <Text>Name</Text>
          <TextInput style={tw`border-b border-gray-400 mb-4`} />
          <Text>Userame</Text>
          <TextInput style={tw`border-b border-gray-400 mb-4`} />
          <Pressable>
            <Text
              style={tw`rounded text-center bg-[${primary}] p-2 text-white font-bold`}
            >
              Save
            </Text>
          </Pressable>
        </View>
      </RBSheet>
    </>
  );
};

export default Cover;

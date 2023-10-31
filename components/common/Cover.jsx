import { Image, Pressable, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/constant";

const Cover = ({ logo }) => (
  <>
    <View style={tw`px-4 h-36 bg-sky-100 flex items-center`}>
      <Image
        style={tw`relative top-18 h-36 w-36 border-4 border-white rounded-full bg-white`}
        source={logo}
      />
      <Pressable onPress={() => alert("Not available yet")}>
        <View
          style={tw`bg-[${primary}] relative top-5 left-14 border border-white rounded-full h-10 w-10 flex items-center justify-center`}
        >
          <IonIcon name="camera" color="#fff" size={20} />
        </View>
      </Pressable>
    </View>
    <View style={tw`h-20`} />
  </>
);

export default Cover;

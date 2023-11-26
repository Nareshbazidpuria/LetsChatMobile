import { Dimensions, Image, Text, View } from "react-native";
import tw from "twrnc";

const ImgPreview = ({ title, img, onOk, onCancel, okText, cancleText }) => {
  return (
    <View
      style={tw`absolute bg-gray-800 w-full h-full py-3 flex items-center justify-between`}
    >
      <Text style={tw`text-white font-bold text-lg`}>{title}</Text>
      <Image
        source={{
          uri: img?.uri,
        }}
        width={Dimensions.get("window").width}
        height={
          Dimensions.get("window").height - 150 <
          (Dimensions.get("window").width * img?.height) / img?.width
            ? Dimensions.get("window").height - 150
            : (Dimensions.get("window").width * img?.height) / img?.width
        }
      />
      <View style={tw`flex flex-row justify-around w-full`}>
        <Text style={tw`text-white px-5 py-2 text-base`} onPress={onCancel}>
          {cancleText || "Cancel"}
        </Text>
        <Text style={tw`text-white px-5 py-2 text-base`} onPress={onOk}>
          {okText || "Send"}
        </Text>
      </View>
    </View>
  );
};

export default ImgPreview;

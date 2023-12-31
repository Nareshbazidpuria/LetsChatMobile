import { Image, Pressable, Text, TextInput, View } from "react-native";
import tw from "twrnc";
import IonIcon from "@expo/vector-icons/Ionicons";
import { primary } from "../../utils/constant";
import RBSheet from "react-native-raw-bottom-sheet";
import profile from "../../assets/profile.png";
import { useEffect, useRef, useState } from "react";
import { updateProfileApi } from "../../api/apis";
import ImgPreview from "./ImgPreview";
import * as ImagePicker from "expo-image-picker";
import { chooseImgGallery, uploadImg } from "../../utils/common";

const Cover = ({ user, self, cb }) => {
  const refRBSheet = useRef();
  const [payload, setPayload] = useState({});
  const [img, setImg] = useState();

  const updateProfile = async (data) => {
    try {
      const res = await updateProfileApi(data || payload);
      if (res?.status == 200) {
        await refRBSheet?.current.close();
        cb();
      }
    } catch (error) {}
  };

  const chooseImg = async () => {
    let img = await chooseImgGallery({
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (img) setImg(img);
  };

  const uploadProfilePic = async () => {
    const res = await uploadImg(img);
    if (res?.status === 200) {
      setImg();
      updateProfile({
        profilePic: res.data.data?.src,
      });
    }
  };

  useEffect(() => {
    setPayload({
      name: user?.name,
      email: user?.email,
    });
  }, [user]);

  return (
    <>
      <View style={tw`px-4 h-36 bg-sky-100 flex items-center`}>
        <Image
          style={tw`relative top-14 h-40 w-40 border-4 border-sky-100 rounded-full bg-white`}
          source={user?.profilePic || profile}
        />
        {self && (
          <Pressable
            onPress={chooseImg}
            style={tw`bg-[${primary}] relative top-4 left-16 border border-white rounded-full h-12 w-12 flex items-center justify-center`}
          >
            <IonIcon name="camera" color="#fff" size={25} />
          </Pressable>
        )}
      </View>
      {self && (
        <Pressable
          style={tw`absolute right-4 top-6`}
          onPress={() => refRBSheet.current.open()}
        >
          <IonIcon name="pencil" color="#fff" size={20} />
        </Pressable>
      )}
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
          <Text>Userame</Text>
          <TextInput
            editable={false}
            style={tw`border-b border-gray-400 mb-4`}
            value={user.userName}
          />
          <Text>Email</Text>
          <TextInput
            style={tw`border-b border-gray-400 mb-4`}
            value={payload?.email}
            onChangeText={(email) => setPayload({ ...payload, email })}
          />
          <Text>Name</Text>
          <TextInput
            style={tw`border-b border-gray-400 mb-4`}
            value={payload.name}
            onChangeText={(name) => setPayload({ ...payload, name })}
          />
          <Pressable onPress={updateProfile}>
            <Text
              style={tw`rounded text-center bg-[${primary}] p-2 text-white font-bold`}
            >
              Save
            </Text>
          </Pressable>
        </View>
      </RBSheet>
      {img && (
        <ImgPreview
          title="Set Profile Picture"
          img={img}
          onOk={uploadProfilePic}
          onCancel={() => setImg()}
          okText="Set"
        />
      )}
    </>
  );
};

export default Cover;

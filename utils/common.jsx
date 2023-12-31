import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { uploadImageApi } from "../api/apis";
import * as ImagePicker from "expo-image-picker";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const registerPush = async () => {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    return Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  }
};

export const uploadImg = async (img) => {
  try {
    const data = new FormData();
    const uri = img.uri;
    const name = uri.split("/").pop();
    const match = /\.(\w+)$/.exec(name);
    const type = match ? `image/${match[1]}` : `image`;
    data.append("image", { uri, name, type });
    const res = await uploadImageApi(data);
    return res;
  } catch (error) {
    return false;
  }
};

export const chooseImgGallery = async (options = {}) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      ...options,
    });
    if (!result?.canceled) {
      return result?.assets[0];
    }
  } catch (e) {
    return false;
  }
};

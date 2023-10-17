import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./components/login";

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" translucent={false} backgroundColor="#fff" />
      <Login />
    </NavigationContainer>
  );
};

export default App;

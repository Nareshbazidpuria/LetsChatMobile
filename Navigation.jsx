import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Login from "./components/login";

const Tab = createMaterialTopTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Signup" component={Login} />
    </Tab.Navigator>
  );
};

export default Navigation;

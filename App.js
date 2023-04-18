import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FirstPageScreen from "./screens/FirstPageScreen";
import RoleScreen from "./screens/RoleScreen";
import OrgaSigninScreen from "./screens/OrgaSigninScreen";
import OrgaSignupScreen from "./screens/OrgaSignupScreen";
import UserSigninScreen from "./screens/UserSigninScreen";
import UserSignupScreen from "./screens/UserSignupScreen";
import OrgaProfileScreen from "./screens/OrgaProfileScreen";
import OrgaCreateEventScreen from "./screens/OrgaCreateEventScreen";
import OrgaEventStatsScreen from "./screens/OrgaEventStatsScreen";
import UserPositionScreen from "./screens/UserPositionScreen";
import UserHomePageScreen from "./screens/UserHomePageScreen";
import UserSearchScreen from "./screens/UserSearchScreen";
import UserTicketScreen from "./screens/UserTicketScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import UserEventPageScreen from "./screens/UserEventPageScreen";
import UserBookingScreen from "./screens/UserBookingScreen";
import UserPaymentScreen from "./screens/UserPaymentScreen";
import UserValidationScreen from "./screens/UserValidationScreen";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const store = configureStore({
  reducer: { user },
});

const OrgaTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "OrgaProfile") {
            iconName = "home";
          } else if (route.name === "OrgaCreateEvent") {
            iconName = "plus-square-o";
          } else if (route.name === "OrgaEventStats") {
            iconName = "line-chart";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ec6e5b",
        tabBarInactiveTintColor: "#335561",
        headerShown: false,
      })}
    >
      <Tab.Screen name="OrgaProfile" component={OrgaProfileScreen} />
      <Tab.Screen name="OrgaCreateEvent" component={OrgaCreateEventScreen} />
      <Tab.Screen name="OrgaEventStats" component={OrgaEventStatsScreen} />
    </Tab.Navigator>
  );
};

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "UserHomePage") {
            iconName = "home";
          } else if (route.name === "UserSearch") {
            iconName = "search";
          } else if (route.name === "UserTicket") {
            iconName = "ticket";
          } else if (route.name === "UserProfile") {
            iconName = "user-circle-o";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "white",
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "black", // permet de définir le fond de la tabbar
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen name="UserHomePage" component={UserHomePageScreen} />
      <Tab.Screen name="UserSearch" component={UserSearchScreen} />
      <Tab.Screen name="UserTicket" component={UserTicketScreen} />
      <Tab.Screen name="UserProfile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FirstPage" component={FirstPageScreen} />
          <Stack.Screen name="Role" component={RoleScreen} />
          <Stack.Screen
            name="OrgaSignin"
            component={OrgaSigninScreen}
          />
           <Stack.Screen
            name="OrgaSignup"
            component={OrgaSignupScreen}
          />
          <Stack.Screen
            name="UserSignin"
            component={UserSigninScreen}
          />
          <Stack.Screen
            name="UserSignup"
            component={UserSignupScreen}
          />
          <Stack.Screen name="OrgaTabNavigator" component={OrgaTabNavigator} />
          <Stack.Screen name="UserPosition" component={UserPositionScreen} />
          <Stack.Screen name="UserTabNavigator" component={UserTabNavigator} />
          <Stack.Screen name="UserEventPage" component={UserEventPageScreen} />
          <Stack.Screen name="UserBooking" component={UserBookingScreen} />
          <Stack.Screen name="UserPayment" component={UserPaymentScreen} />
          <Stack.Screen name="UserValidation" component={UserValidationScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

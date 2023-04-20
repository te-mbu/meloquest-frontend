import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FirstPageScreen from "./screens/FirstPageScreen";
import RoleScreen from "./screens/RoleScreen";
import SigninScreen from "./screens/SigninScreen";
import OrgaSignupScreen from "./screens/OrgaSignupScreen";
import UserSignupScreen from "./screens/UserSignupScreen";
import OrgaProfileScreen from "./screens/OrgaProfileScreen";
import OrgaCreateEventScreen from "./screens/OrgaCreateEventScreen";
import OrgaEventStatsScreen from "./screens/OrgaEventStatsScreen";
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

          if (route.name === "Profil") {
            iconName = "home";
          } else if (route.name === "Création d'évenements") {
            iconName = "plus-square-o";
          } else if (route.name === "Statistiques") {
            iconName = "line-chart";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "white",
        headerShown: false,

         // permet de définir le sytle de la tabbar
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
        }

      })}
    >
      <Tab.Screen name="Profil" component={OrgaProfileScreen} />
      <Tab.Screen name="Création d'évenements" component={OrgaCreateEventScreen} />
      <Tab.Screen name="Statistiques" component={OrgaEventStatsScreen} />
    </Tab.Navigator>
  );
};

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Recherche") {
            iconName = "search";
          } else if (route.name === "Ticket") {
            iconName = "ticket";
          } else if (route.name === "Profil") {
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
      <Tab.Screen name="Accueil" component={UserHomePageScreen} />
      <Tab.Screen name="Recherche" component={UserSearchScreen} />
      <Tab.Screen name="Ticket" component={UserTicketScreen} />
      <Tab.Screen name="Profil" component={UserProfileScreen} />
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
            name="Signin"
            component={SigninScreen}
          />
          <Stack.Screen
            name="OrgaSignup"
            component={OrgaSignupScreen}
          />
          <Stack.Screen
            name="UserSignup"
            component={UserSignupScreen}
          />
          <Stack.Screen name="OrgaTabNavigator" component={OrgaTabNavigator} />
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

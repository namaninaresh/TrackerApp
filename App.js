import "react-native-gesture-handler";

// Import React and Component
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Import Screens
import SplashScreen from "./components/Screens/SplashScreen";
import LoginScreen from "./components/Screens/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreenNew";
import DrawerNavigationRoutes from "./components/Navigation/DrawerNavigator";
import Register from "./components/Screens/RegisterScreen";
import { Layout } from "./components/Layout/Layout";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, Button, View, ActivityIndicator } from "react-native";
import EditProfileScreen from "./components/Screens/EditProfileScreen";
import SettingsScreen from "./components/Screens/SettingsScreen";
import { NavigationStackHeader } from "./components/Navigation/NavigationDrawerHeader";
import PageHeader from "./components/atoms/PageHeader";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AccountScreen from "./components/Screens/AccountScreen";
import AllTransactionScreen from "./components/Screens/AllTransactionScreen";
import AllTransactionScreenSwipe from "./components/Screens/AllTransactionScreenSwipe";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./components/context/AuthContext";
import { auth, db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import UserContext from "./components/context/UserContext";
import {
  ADD_BANK,
  DELETE_TRANS,
  GET_ALLTRANSACTIONS,
  reducer,
} from "./components/Reducers/userReducer";
import TransactionsScreen from "./components/Screens/TransactionsScreen";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
const AuthStack = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{
          headerShown: false,
          title: "Register", //Set Header Title
          headerStyle: {
            backgroundColor: "#307ecc", //Set Header color
          },
          headerTintColor: "#fff", //Set Header text color
          headerTitleStyle: {
            fontWeight: "bold", //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="DrawerNavigationRoutes">
      {/* SplashScreen which will come once for 5 Seconds */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        // Hiding header for Splash Screen
        options={{ headerShown: false }}
      />

      {/* Navigation Drawer as a landing page */}
      <Stack.Screen
        name="DrawerNavigationRoutes"
        component={DrawerNavigationRoutes}
        // Hiding header for Navigation Drawer
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        // Hiding header for Navigation Drawer
        options={({ navigation }) => {
          return {
            headerMode: "float",
            headerLeft: () => (
              <NavigationStackHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader
                navigation={navigation}
                props={props}
                name="Edit Profile "
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        // Hiding header for Navigation Drawer
        options={({ navigation }) => {
          return {
            headerMode: "float",
            headerLeft: () => (
              <NavigationStackHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader
                navigation={navigation}
                props={props}
                name="Settings "
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />

      <Stack.Screen
        name="AllTransactions"
        component={AllTransactionScreen}
        // Hiding header for Navigation Drawer
        options={({ navigation }) => {
          return {
            headerMode: "float",
            headerLeft: () => (
              <NavigationStackHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader
                navigation={navigation}
                props={props}
                name="All Transactions "
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />

      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        // Hiding header for Navigation Drawer
        options={({ navigation }) => {
          return {
            headerMode: "float",
            headerLeft: () => (
              <NavigationStackHeader navigationProps={navigation} />
            ),
            // headerLeft: () => <HeaderLeft navigation={navigation} />,
            headerTitle: (props) => (
              <PageHeader
                navigation={navigation}
                props={props}
                name="Accounts"
              />
            ),
            //headerRight: () => <HeaderRight navigation={navigation} />,
          };
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);
  // const [user, setUser] = useState(null);

  const initialLoginState = {
    user: null,
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const initialState = {
    transactions: [],
    accounts: [],
    loading: true,
    error: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "RETRIEVE_TOKEN":
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          user: null,
          userToken: null,
          userName: null,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          user: action.user,
          userToken: action.token,
          userName: action.id,
          isLoading: false,
        };
      case "UPDATEUSER":
        return {
          ...prevState,
          user: action.user,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState
  );
  const [transactionState, dispatchTrans] = React.useReducer(
    reducer,
    initialState
  );

  const authContext = React.useMemo(() => ({
    signIn: (email, password) => {
      let userToken = null;
      try {
        signInWithEmailAndPassword(auth, email, password)
          .then((response) => {
            userToken = response._tokenResponse.accessToken;
            AsyncStorage.setItem(
              "@Auth_Token",
              response._tokenResponse.refreshToken
            );
            console.log("lgoin", response);
            dispatch({ type: "LOGIN", id: email, token: userToken });
          })
          .catch((error) => {
            console.log("error", error);
            if (error.code === "auth/wrong-password") {
              // handleError("Wrong Password ! Try again", "password");
            }
            if (error.code === "auth/user-not-found") {
              // handleError("User not found ", "email");
            }
          });
      } catch (error) {
        console.log("error while signin", error);
      }
    },

    signOut: async () => {
      console.log("singout");
      try {
        await AsyncStorage.removeItem("@Auth_Token");
      } catch (error) {
        console.log(e);
      }
      dispatch({ type: "LOGOUT" });
    },
    signUp: () => {
      setUserToken("newUser");
      setIsLoading(false);
    },

    updateUser: (newUser) => {
      console.log("uupdate", newUser);
      dispatch({ type: "UPDATEUSER", user: newUser });
    },
  }));

  const transContextMethods = React.useMemo(() => ({
    addTransaction: () => {
      dispatchTrans({
        type: ADD_BANK,
        payload: {
          amount: "500",
          description: "Test with Context",
          id: "cFOT0a1plT6rzRawjHlp1243",
          title: "TextContext Added",
        },
      });
      console.log("adding Transaction");
    },
    deleteTransaction: ({ item, index }) => {
      console.log("delete Transaction", index);
      dispatchTrans({
        type: DELETE_TRANS,
        payload: item,
      });
    },
  }));

  const isLoggedIn = async () => {
    let userToken = null;
    try {
      userToken = await AsyncStorage.getItem("@Auth_Token");

      const tempDoc = [];
      /*getAuth().onAuthStateChanged(async (user) => {
        const snapshot = await getDocs(collection(db, "accounts"));
        snapshot.forEach((doc) => {
          tempDoc.push({ ...doc.data() });
        });
        dispatch({
          type: "RETRIEVE_TOKEN",
          token: userToken,
          user: { ...user, accounts: tempDoc },
        });
      }); */
      const user = { displayName: "Chinna", email: "vloe@gma.com" };
      dispatch({
        type: "RETRIEVE_TOKEN",
        token: userToken,
        user: {
          ...user,
          accounts: [
            { name: "paytm", amount: 1000, type: "bank", id: "23232fdf" },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }

    /*try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("@Auth_Token");
      console.log("islogiged", userToken);
      setUserToken(userToken);
      setIsLoading(false);
    } catch (error) {
      console.log(`isLoggged in Eror ${error}`);
    } */
  };

  // useEffect(() => {
  //   const tempDoc = [];
  //   const unregisterAUthobserver = getAuth().onAuthStateChanged(
  //     async (user) => {
  //       const snapshot = await getDocs(collection(db, "accounts"));
  //       snapshot.forEach((doc) => {
  //         tempDoc.push({ ...doc.data() });
  //       });
  //       if (user)
  //         setUser({
  //           ...user,
  //           pending: false,
  //           isSignedIn: !!user,
  //           accounts: tempDoc,
  //         });
  //     }
  //   );

  //   return () => unregisterAUthobserver();
  // }, []);

  useEffect(() => {
    setTimeout(async () => {
      isLoggedIn();
      dispatchTrans({ type: "GETALL" });
      // setIsLoading(false);
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <ExpoStatusBar />
      <AuthContext.Provider value={{ user: loginState.user, ...authContext }}>
        <UserContext.Provider
          value={{ allData: transactionState, ...transContextMethods }}
        >
          <NavigationContainer>
            {/* {<TransactionsScreen />} */}
            {/*<AllTransactionScreenSwipe /> */}
            {loginState.userToken === null ? <AuthStack /> : <AppStack />}
          </NavigationContainer>
        </UserContext.Provider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;

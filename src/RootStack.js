import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './Redux/AuthSlice';
import { ActivityIndicator, View } from 'react-native';

// Import screens
import CustomTabBar from './Components/ButtomNav';
import HomeScreen from './screen/Home';
import LoginScreen from './screen/LoginScreen';
import ForgotPasswordScreen from './screen/Password';
import OpenScreen from './screen/openScreen';
import SecondOpenScreen from './screen/secondOpenScreen';
import DetailsPage from './screen/Details';
import TicketsScreen from './screen/Ticket';
import SubbyPlusScreen from './screen/SubbyPlus';
import TimesheetsScreen from './screen/Timesheets';
import WorkplacesScreen from './screen/Workplaces';
import CISStatements from './Components/CisStatement';
import ViewTimesheetScreen from './Components/ViewTickets';
import YourTimesheetScreen from './Components/YourTimesheets';
import AddTicketScreen from './Components/AddTickets';
import ExpenseClaims from './Components/ExpenseClaims';
import AnotherTestView from './Components/AnotherTest';
import AddExpenseScreen from './Components/AddExpense';
import TestView from './Components/TestView';
import TimesheetForm from './Components/CompleteTimesheet';
import ValorantScreen from './Components/Valorant';
import WorkspaceDetails from './Components/WorkspaceDetail';
import DetailsForm from './Components/YourDetailsForm';
import ContactForm from './Components/ContactForm';
import PaymentForm from './Components/PaymentForm';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Open' component={OpenScreen} />
    <Stack.Screen name='SecondOpen' component={SecondOpenScreen} />
    <Stack.Screen name='Login' component={LoginScreen} />
    
    <Stack.Screen name='Password' component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Home' component={HomeScreen} />
    <Stack.Screen name='CisStatement' component={CISStatements} />
  </Stack.Navigator>
);

const YourDetailsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='YOUR_DETAILS' component={DetailsPage} />
    <Stack.Screen name='DetailForm' component={DetailsForm}/>
    <Stack.Screen name='ContactFrom' component={ContactForm}/>
    <Stack.Screen name='PaymentForm' component={PaymentForm}/>
  </Stack.Navigator>
);

const TicketsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='TICKETS' component={TicketsScreen} />
    <Stack.Screen name='ViewTickets' component={ViewTimesheetScreen} />
    <Stack.Screen name='AddTicket' component={AddTicketScreen} />
    <Stack.Screen name='Valorant' component={ValorantScreen} />
  </Stack.Navigator>
);

const SubbyPlusStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='SUBBYPLUS' component={SubbyPlusScreen} />
  </Stack.Navigator>
);

const TimesheetsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='TIMESHEETS' component={TimesheetsScreen} />
    <Stack.Screen name='ExpenseClaims' component={ExpenseClaims} />
    <Stack.Screen name='CompletePage' component={TimesheetForm} />
    <Stack.Screen name='Expense' component={AddExpenseScreen} />
    <Stack.Screen name='YourTimesheet' component={YourTimesheetScreen} />
    <Stack.Screen name='ViewTickets' component={ViewTimesheetScreen} />
  </Stack.Navigator>
);

const WorkplacesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='WORKPLACES' component={WorkplacesScreen} />
    <Stack.Screen name='AnotherTest' component={AnotherTestView} />
    <Stack.Screen name='TestView' component={TestView} />
    <Stack.Screen name='WorkspaceDetail' component={WorkspaceDetails} />
  </Stack.Navigator>
);

const RootStack = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(checkAuth());
  // }, [dispatch]);

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#000" />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <CustomTabBar {...props} />}
        >
          <Tab.Screen name='Home' component={HomeStack} />
          <Tab.Screen name='YOUR_DETAILS' component={YourDetailsStack} />
          <Tab.Screen name='TICKETS' component={TicketsStack} />
          <Tab.Screen name='SUBBYPLUS' component={SubbyPlusStack} />
          <Tab.Screen name='TIMESHEETS' component={TimesheetsStack} />
          <Tab.Screen name='WORKPLACES' component={WorkplacesStack} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default RootStack;

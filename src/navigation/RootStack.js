import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import CustomTabBar from './ButtomNav';
import HomeScreen from '../screen/home/Home';
import LoginScreen from '../screen/auth/LoginScreen';
import ForgotPasswordScreen from '../screen/auth/Password';
import OpenScreen from '../screen/auth/OpenScreen';
import SecondOpenScreen from '../screen/auth/SecondOpenScreen';
import DetailsPage from '../screen/profile/Details';
import TicketsScreen from '../screen/tickets/Ticket';
import SubbyPlusScreen from '../screen/subbyPlus/SubbyPlus';
import TimesheetsScreen from '../screen/timesheets/Timesheets';
import WorkplacesScreen from '../screen/workspace/Workplaces';
import CISStatements from '../screen/home/CisStatement';
import ViewTimesheetScreen from '../screen/timesheets/ViewTimesheet';
import YourTimesheetScreen from '../screen/timesheets/YourTimesheets';
import AddTicketScreen from '../screen/tickets/AddTickets';
import ExpenseClaims from '../screen/timesheets/ExpenseClaims';
import AnotherTestView from '../screen/workspace/Document';
import AddExpenseScreen from '../screen/timesheets/AddExpense';

// import TimesheetForm from '../screen/timesheets/CompleteTimesheet';
import ValorantScreen from '../screen/tickets/TicketsList';
import WorkspaceDetails from '../screen/workspace/WorkspaceDetail';
import DetailsForm from '../screen/profile/YourDetailsForm';
import EmergencyForm from '../screen/profile/EmergencyForm';
import PaymentForm from '../screen/profile/PaymentForm';

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
    <Stack.Screen name='EmergencyForm' component={EmergencyForm}/>
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
    {/* <Stack.Screen name='CompletePage' component={TimesheetForm} /> */}
    <Stack.Screen name='Expense' component={AddExpenseScreen} />
    <Stack.Screen name='YourTimesheet' component={YourTimesheetScreen} />
    <Stack.Screen name='ViewTickets' component={ViewTimesheetScreen} />
  </Stack.Navigator>
);

const WorkplacesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='WORKPLACES' component={WorkplacesScreen} />
    <Stack.Screen name='AnotherTest' component={AnotherTestView} />

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

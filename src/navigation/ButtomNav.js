import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

import Person from '../assets/icons/person.svg'
import Workspace from '../assets/icons/sites.svg'
import Ticket from '../assets/icons/tickets.svg'
import Subby from '../assets/icons/reward.svg'
import Timesheet from '../assets/icons/timesheet.svg'
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Fontisto from 'react-native-vector-icons/Fontisto';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomBottomTab = ({ navigation, state }) => {
  const isFocused = (routeName) => state.routes[state.index].name === routeName;

  const tabItems = [
    {
      route: 'YOUR_DETAILS',
      topLabel: 'Your',
      bottomLabel: 'Details',
      icon: <Person width={80} height={22} />

    },
    {
      route: 'TICKETS',
      topLabel: 'Your',
      bottomLabel: 'Tickets',
      // icon: <Ionicons name="reader-outline" size={20} color={isFocused('TICKETS') ? '#F47C25' : 'gray'} />,
      // icon: <Image source={require('../assets/icons/appicon.svg')} style={styles.thumbnail} />,
      icon: <Ticket width={80} height={22} />
    },
    {
      route: 'SUBBYPLUS',
      topLabel: 'Subby',
      bottomLabel: 'Plus',
      
      icon: <Subby width={80} height={22} />
  
    },
    {
      route: 'TIMESHEETS',
      topLabel: 'Your',
      bottomLabel: 'Timesheets',
      icon: <Timesheet width={80} height={22} />
    },
    {
      route: 'WORKPLACES',
      topLabel: 'Your',
      bottomLabel: 'Workplaces',
      icon: <Workspace width={80} height={22} />
    },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(item.route)}
          style={styles.navItem}
        >
          {item.icon}
          <View style={styles.textContainer}>
            <Text style={[styles.navTextTop, isFocused(item.route) && { color: '#F47C25' }]}>
              {item.topLabel}
            </Text>
            <Text style={[styles.navTextBottom, isFocused(item.route) && { color: '#F47C25' }]}>
              {item.bottomLabel}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  thumbnail: {
    width: 35,
    height: 35,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 2,
  },
  navTextTop: {
    fontSize: 12,
    color: 'gray',
    lineHeight: 12,
  },
  navTextBottom: {
    fontSize: 11,
    color: 'gray',
    lineHeight: 12,
  },
});

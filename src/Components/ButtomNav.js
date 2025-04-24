import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomBottomTab = ({ navigation, state }) => {
  const isFocused = (routeName) => state.routes[state.index].name === routeName;

  const tabItems = [
    {
      route: 'YOUR_DETAILS',
      topLabel: 'Your',
      bottomLabel: 'Details',
      // icon: <Ionicons name="person-outline" size={20} color={isFocused('YOUR_DETAILS') ? '#F47C25' : 'gray'} />,
      icon: <Image source={require('../assets/icons/person.svg')} style={styles.thumbnail} />,
    },
    {
      route: 'TICKETS',
      topLabel: 'Your',
      bottomLabel: 'Tickets',
      // icon: <Ionicons name="reader-outline" size={20} color={isFocused('TICKETS') ? '#F47C25' : 'gray'} />,
      icon: <Image source={require('../assets/icons/tickets.svg')} style={styles.thumbnail} />,
    },
    {
      route: 'SUBBYPLUS',
      topLabel: 'Subby',
      bottomLabel: 'Plus',
      icon: <Image source={require('../assets/icons/reward.svg')} style={styles.thumbnail} />,
    //  img: <Image source={require('../assets/images/image.png')} style={styles.thumbnail} />
    },
    {
      route: 'TIMESHEETS',
      topLabel: 'Your',
      bottomLabel: 'Timesheets',
     
      // icon: <Fontisto name="date" size={20} color={isFocused('TIMESHEETS') ? '#F47C25' : 'gray'} />,
      icon: <Image source={require('../assets/icons/timesheet.svg')} style={styles.thumbnail} />,
    },
    {
      route: 'WORKPLACES',
      topLabel: 'Your',
      bottomLabel: 'Workplaces',
      // icon: <MaterialCommunityIcons name="file-document-outline" size={20} color={isFocused('WORKPLACES') ? '#F47C25' : 'gray'} />,
      icon: <Image source={require('../assets/icons/sites.svg')} style={styles.thumbnail} />,
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
    backgroundColor:'white',
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

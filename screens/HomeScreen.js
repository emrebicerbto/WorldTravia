import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Feather name="settings" size={24} color="black" style={styles.iconLeft} />
        <View style={styles.pointsContainer}>
          <Feather name="check" size={30} color="green" />
          <Text style={styles.points}>2</Text>
          <Feather name="question" size={30} color="yellow" />
          <Text style={styles.points}>0</Text>
        </View>
        <Feather name="shopping-cart" size={24} color="black" style={styles.iconRight} />
      </View>
      <Image
        source={require('../images/applogo.png')} // Update the path to your logo image file
        style={[styles.logo, { width: width * 0.6, height: height * 0.3 }]}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DailyScreen')}>
        <Text style={styles.buttonText}>Play Daily</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CategoriesScreen')}>
        <Text style={styles.buttonText}>Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SettingsScreen')}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#8AE3FE',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    marginHorizontal: 8,
    fontSize: 18,
  },
  iconLeft: {
    marginLeft: 16,
    color:"transparent"
  },
  iconRight: {
    marginRight: 16,
  },
  logo: {
    marginBottom: 40,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#8AE3FE',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 15,
    borderColor:"#000000" ,
    borderWidth:1,
    width: '60%',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    alignSelf:"center"
  },
});

export default HomeScreen;

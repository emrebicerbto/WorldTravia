import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';

const settingsOptions = [
  { id: '1', title: 'Change Language', icon: 'globe' },
  { id: '2', title: 'Share with Friends', icon: 'share' },
  { id: '3', title: 'Rate the App', icon: 'star' },
  { id: '4', title: 'Go to Shop', icon: 'shopping-cart' },
  { id: '5', title: 'Privacy Policy', icon: 'file-text' },
  //{ id: '6', title: 'Reset Game Progress', icon: 'trash' },
];

const SettingsScreen = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate('LanguageScreen')}>
      <Feather name={item.icon} size={24} color="black" />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.header}>
      <Image
        source={require('../images/applogo.png')} // Update the path to your logo image file
        style={[styles.logo, { width: width * 0.6, height: height * 0.3 }]}
      />
      </View>
      <FlatList
        data={settingsOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.optionsList}
      />
      <View style={styles.footer}>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8AE3FE',
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 16,
  },
  header: {
    alignItems: 'center',
  },
  optionsList: {
    width: '100%',
    paddingHorizontal: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
    marginTop: 10,
    borderRadius: 15,
    borderColor:"#000000" ,
    borderWidth:1,
  },
  optionText: {
    width: '80%',
    fontSize: 18,
    marginLeft: 16,
  },
  footer: {
    alignItems: 'center',
    padding: 16,
    marginBottom:40,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  versionText: {
    fontSize: 12,
    color: 'rgba(136, 136, 136, 0.5)',
  },
});

export default SettingsScreen;

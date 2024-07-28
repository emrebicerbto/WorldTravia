import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const languageOptions = [
  { id: '1', title: 'English', icon: 'circle' },
  { id: '2', title: 'Turkish', icon: 'circle' },
  { id: '3', title: 'English', icon: 'circle' },
  { id: '4', title: 'Turkish', icon: 'circle' },
];

const LanguageScreen = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.optionContainer}>
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={languageOptions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.optionsList}
      />
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
});

export default LanguageScreen;

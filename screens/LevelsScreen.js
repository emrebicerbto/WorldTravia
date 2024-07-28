import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { questions } from '../data/questions';

const LevelsScreen = ({ route, navigation }) => {
  const { categoryId } = route.params;
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = () => {
      try {
        const categoryLevels = questions[categoryId];
        const levelsList = categoryLevels ? Object.keys(categoryLevels).map(key => ({ id: key, name: key })) : [];
        setLevels(levelsList);
      } catch (e) {
        console.error("Error fetching levels: ", e);
      }
    };

    fetchLevels();
  }, [categoryId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuestionsListScreen', { categoryId, levelId: item.id })}>
      <Text style={styles.buttonText}>Level {item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertext}>{categoryId}</Text>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} style={styles.backButton2}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={levels}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.optionsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8AE3FE',
  },
  text: {
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 16,
  },
  backButton2: {
    color: "transparent"
  },
  text: {
    fontSize: 24,
  },
  headertext:{
    fontSize: 20,
    fontWeight:"500"
  },
  button: {
    backgroundColor: '#8AE3FE',
    paddingVertical: 30,
    marginBottom: 40,
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 1,
    width: '80%',
    marginHorizontal:"10%",
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    alignSelf: "center"
  },
  optionsList: {
    marginTop:30,
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom:40
  },
});

export default LevelsScreen;

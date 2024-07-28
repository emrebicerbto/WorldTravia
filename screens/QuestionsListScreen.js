import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { questions } from '../data/questions';

const QuestionsListScreen = ({ route, navigation }) => {
  const { categoryId, levelId } = route.params;
  const [questionsList, setQuestionsList] = useState([]);

  useEffect(() => {
    const fetchQuestions = () => {
      try {
        const levelQuestions = questions[categoryId][levelId];
        setQuestionsList(levelQuestions);
      } catch (e) {
        console.error("Error fetching questions: ", e);
      }
    };

    fetchQuestions();
  }, [categoryId, levelId]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QuestionsScreen', { categoryId, levelId, questionIndex: index })}>
      <Image source={{ uri: item.uri }} style={styles.image} />
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
        data={questionsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.optionsList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8AE3FE',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headertext:{
    fontSize: 20,
    fontWeight:"500"
  },
  backButton: {
    alignSelf: 'flex-start',
    margin: 16,
  },
  backButton2: {
    color: "transparent"
  },
  button: {
    backgroundColor: '#E1DCD9',//#00B900 yeşil öneri
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 40,
    marginHorizontal:20,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  optionsList: {
    paddingHorizontal: 16,
    marginTop:"25%"
  },
});

export default QuestionsListScreen;

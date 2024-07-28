import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { questions } from '../data/questions';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = () => {
      try {
        const categoriesList = Object.keys(questions).map(key => ({ id: key, name: key }));
        setCategories(categoriesList);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching categories: ", e);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingscr}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (categories.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
          <Text>CATEGORIES</Text>
        </TouchableOpacity>
        <Text>No categories found</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LevelsScreen', { categoryId: item.id })}>
      <Text style={styles.buttonText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headertext}>CATEGORIES</Text>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} style={styles.backButton2}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={categories}
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
  loadingscr: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    marginTop: 200,
    fontSize: 72
  },
  button: {
    backgroundColor: '#8AE3FE',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 15,
    borderColor: "#000000",
    borderWidth: 1,
    width: '60%',
    marginHorizontal:"20%"
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    alignSelf: "center"
  },
  optionsList: {
    marginTop:50,
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});

export default CategoriesScreen;

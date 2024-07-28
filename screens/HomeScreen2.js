import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const categories = [
  { id: '1', title: 'Movies', packs: '10 Packs', icon: require('../images/applogo.png') },
  { id: '2', title: 'TV Shows', packs: '10 Packs', icon: require('../images/applogo.png') },
  { id: '3', title: 'League of Legends', packs: '19 Packs', icon: require('../images/applogo.png') },
  { id: '4', title: 'Literature', packs: '4 Packs', icon: require('../images/applogo.png') },
  { id: '5', title: 'Games', packs: '10 Packs', icon: require('../images/applogo.png') },
  { id: '6', title: 'Anime', packs: '20 Packs', icon: require('../images/applogo.png') },
];

const CategoryScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.categoryContainer}>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryPacks}>{item.packs}</Text>
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </View>
      <Image source={item.icon} style={styles.categoryIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="shopping-cart" size={24} color="black" />
        <View style={styles.pointsContainer}>
          <FontAwesome name="key" size={24} color="green" />
          <Text style={styles.points}>2</Text>
          <FontAwesome name="lightbulb-o" size={24} color="yellow" />
          <Text style={styles.points}>0</Text>
        </View>
        <Feather name="settings" size={24} color="black" />
      </View>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Choose a category to start solving!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  list: {
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryInfo: {},
  categoryPacks: {
    color: '#7CFC00',
    fontSize: 14,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  footer: {
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 16,
  },
});

export default CategoryScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import WorldMap from '../WorldMap';
import worldData from '../worldData.json';

const getRandomCountries = (data) => {
  const countries = data.features;
  const country1 = countries[Math.floor(Math.random() * countries.length)];
  let country2 = country1;

  while (country2 === country1) {
    country2 = countries[Math.floor(Math.random() * countries.length)];
  }

  return [country1, country2];
};

const areCountriesConnected = (country1, country2) => {
  const coordinates1 = country1.geometry.coordinates;
  const coordinates2 = country2.geometry.coordinates;

  const flattenCoordinates = (coords) => {
    if (typeof coords[0][0] === 'number') return coords;
    return coords.flat();
  };

  const borders1 = flattenCoordinates(coordinates1).flat();
  const borders2 = flattenCoordinates(coordinates2).flat();

  for (let i = 0; i < borders1.length; i += 2) {
    for (let j = 0; j < borders2.length; j += 2) {
      if (borders1[i] === borders2[j] && borders1[i + 1] === borders2[j + 1]) {
        return true;
      }
    }
  }
  return false;
};

const DailyScreen = ({ navigation }) => {
  const [countries, setCountries] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const [country1, country2] = getRandomCountries(worldData);
    setCountries([country1, country2]);
    setConnected(areCountriesConnected(country1, country2));
  }, []);

  return (
    <View style={styles.container}>
      <WorldMap selectedCountries={countries} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{`Country 1: ${countries[0]?.properties.NAME}`}</Text>
        <Text style={styles.text}>{`Country 2: ${countries[1]?.properties.NAME}`}</Text>
        <Text style={styles.text}>{connected ? 'Connected' : 'Not Connected'}</Text>
        <Button title="New Countries" onPress={() => {
          const [country1, country2] = getRandomCountries(worldData);
          setCountries([country1, country2]);
          setConnected(areCountriesConnected(country1, country2));
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    padding: 16,
    backgroundColor: 'white',
  },
  text: {
    alignSelf: 'center',
    marginBottom: 8,
  },
});

export default DailyScreen;

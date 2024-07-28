/*

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View>
      {data ? <Text>{data}</Text> : <Text>Loading...</Text>}
    </View>
  );
};

export default HomeScreen;

*/
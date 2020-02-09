import React, {useState} from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';

import {api} from './utils/api';
import dateBuilder from './utils/databuilder';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [alert, setAlert] = useState(null);

  const search = async e => {
    try {
      if (e.key === 'enter') {
        const res = await fetch(
          `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`,
        );
        const result = await res.json();
        if (result.cod === '404') {
          setAlert(result.message);
          setTimeout(() => {
            setAlert(null);
          }, 3000);
        }
        setWeather(result);
        setQuery('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View>
      <ImageBackground
        source={
          typeof weather.main !== 'undefined'
            ? weather.main.temp > 18
              ? require('./assets/warm.jpg')
              : require('./assets/cold.jpg')
            : require('./assets/cold.jpg')
        }
        style={{width: '100%', height: '100%'}}>
        <Text>Hello</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {},
});

export default App;

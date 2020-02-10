import React, {useState, Fragment} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {api} from './utils/api';
import dateBuilder from './utils/databuilder';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [alert, setAlert] = useState(null);

  const search = async () => {
    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  const onChange = e => setQuery(e);

  const imageShift =
    typeof weather.main !== 'undefined'
      ? weather.main.temp > 18
        ? require('./assets/warm.jpg')
        : require('./assets/cold.jpg')
      : require('./assets/cold.jpg');

  return (
    <View>
      <ImageBackground
        source={imageShift}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.searchBox}>
          <TextInput
            onChangeText={onChange}
            placeholder="Search..."
            style={styles.searchBar}
          />
          <TouchableOpacity onPress={search}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text>{dateBuilder(new Date())}</Text>
          {typeof weather.main !== 'undefined' ? (
            <Fragment>
              <Text>
                {weather.name}, {weather.sys.country}
              </Text>
              <Text>{Math.round(weather.main.temp)}°c</Text>
              <Text>{weather.weather[0].main}</Text>
            </Fragment>
          ) : alert !== null ? (
            <Text>{alert}</Text>
          ) : (
            <Text>{''}</Text>
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {width: '100%', marginBottom: 75},
  searchBar: {display: 'flex', width: '100%', padding: 15},
});

export default App;

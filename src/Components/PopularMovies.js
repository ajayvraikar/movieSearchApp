import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPopularMovies} from '../Api/PopularMovies/action';
import {useDispatch} from 'react-redux';
import MovieCard from './MovieCard';
const PopularMovies = ({navigation}) => {
  const dispatch = useDispatch();
  const [popularMoview, setPopularMoview] = useState([]);
  function getPopularMoviesApi() {
    const payload = {
      onSuccess: response => {
        console.log('getPopularMovies', response);
        setPopularMoview(response?.data?.results);
      },
      onFailure: error => {
        console.log('error gpm', error);
      },
    };
    dispatch(getPopularMovies(payload));
  }
  useEffect(() => {
    getPopularMoviesApi();
  }, []);

  return (
    <View style={styles.mainView}>
      <Text style={styles.popularTxt}>Popular Movies</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={popularMoview}
        horizontal
        renderItem={({item}) => {
          return (
            <MovieCard
              poster={item?.poster_path}
              title={item?.title}
              rating={item.vote_average}
              onPressCard={() => {
                navigation.navigate('MovieDetails', item);
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default PopularMovies;

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 16,
  },
  popularTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
    marginTop: 12,
  },
});

import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {SEARCH, CANCEL} from '../Constants/Images';
import PopularMovies from '../Components/PopularMovies';
import useDebounce from '../Utils/useDebounce';
import {getMoviesByQuery} from '../Api/Search/action';
import SearchMovieCard from '../Components/SearchMovieCard';

const SearchScreen = props => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  function getResultsForSearch(query) {
    let payload = {
      query: query,
      onSuccess: response => {
        console.log('getResultsForSearch', response);
        setSearchResults(response.data.results);
      },
      onFailure: error => {
        console.log('errorerrorerror', error);
      },
    };
    dispatch(getMoviesByQuery(payload));
  }
  useDebounce(
    () => {
      if (searchQuery.trim() !== '') {
        getResultsForSearch(searchQuery);
      } else {
        setSearchResults(null);
      }
    },
    [searchQuery],
    500,
  );
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.searchView}>
        <Image source={SEARCH} style={styles.searchIcon} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.textInput}
          placeholder={'Search for movie'}
          placeholderTextColor={'#8B9BB5'}
          autoCorrect={false}
        />
        {searchQuery !== '' ? (
          <TouchableOpacity
            onPress={() => {
              setSearchQuery('');
              setSearchResults(null);
            }}>
            <Image source={CANCEL} style={styles.searchIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
      {searchResults && searchResults?.length === 0 ? (
        <Text style={styles.noResultTxt}>No Result Found</Text>
      ) : null}
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.mainStyleFlat}
        data={searchResults}
        keyExtractor={item => item?.id}
        renderItem={({item}) => {
          return (
            <SearchMovieCard
              poster={item?.poster_path}
              title={item?.title}
              rating={item.vote_average}
              releaseDate={item?.release_date}
              overView={item?.overview}
              onPressCard={() => {
                props.navigation.navigate('MovieDetails', item);
              }}
            />
          );
        }}
      />

      {searchQuery === '' || searchResults?.length === 0 ? (
        <PopularMovies navigation={props.navigation} />
      ) : null}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#355376',
    flex: 1,
    paddingHorizontal: 12,
  },
  searchIcon: {
    height: 25,
    width: 25,
    marginRight: 12,
    tintColor: 'white',
  },
  textInput: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    padding: 0,
  },
  searchView: {
    borderWidth: 1,
    flexDirection: 'row',
    padding: 12,
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#4A658B',
    borderColor: '#697F9F',
  },
  mainStyleFlat: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width * 0.9,
    alignSelf: 'center',
  },
  noResultTxt: {
    width: '90%',
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 30,
  },
});

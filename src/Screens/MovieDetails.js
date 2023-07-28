import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getMoviesDetails} from '../Api/MovieDetails/action';
import {BACK} from '../Constants/Images';

const MovieDetails = props => {
  const dispatch = useDispatch();
  const [moviewData, setMoviewData] = useState(null);
  function getMoviewDetails(movieId) {
    let payload = {
      movieId: movieId,
      onSuccess: response => {
        console.log('response', response);
        setMoviewData(response.data);
      },
      onFailure: err => {
        console.log('errerr', err);
      },
    };
    dispatch(getMoviesDetails(payload));
  }
  useEffect(() => {
    if (props?.route?.params?.id) {
      getMoviewDetails(props?.route?.params?.id);
    }
  }, [props?.route?.params?.id]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.backBtn}>
        <Image source={BACK} style={styles.backBtnImage} />
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.movieImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${moviewData?.poster_path}`,
          }}
        />

        <View style={styles.innerView}>
          <Text style={styles.titleName}>{moviewData?.title}</Text>
          {moviewData?.tagline ? (
            <Text style={styles.subTitle}>{moviewData?.tagline}</Text>
          ) : null}
          {moviewData?.genres?.length > 0 ? (
            <View style={styles.genresView}>
              {moviewData?.genres?.map((item, index) => {
                return (
                  <View key={index} style={styles.genres}>
                    <Text style={styles.genresTxt}>{item.name}</Text>
                  </View>
                );
              })}
            </View>
          ) : null}

          {moviewData?.vote_average ? (
            <View style={styles.rating}>
              <Text style={styles.ratingTxt}>
                IMDB {'  '}{' '}
                {parseFloat(moviewData?.vote_average || 0).toFixed(2)}
              </Text>
            </View>
          ) : null}

          {moviewData?.overview ? (
            <>
              <Text style={styles.overViewHeader}>overview :-</Text>
              <Text style={[styles.overViewText]}>{moviewData?.overview}</Text>
            </>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  titleName: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
  innerView: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  subTitle: {
    color: '#9FA5BB',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  genres: {
    backgroundColor: '#536F9F',
    padding: 8,
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 16,
  },
  genresView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 18,
    flexWrap: 'wrap',
    width: '100%',
  },
  genresTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  rating: {
    backgroundColor: '#F5C518',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  ratingTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  overViewHeader: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 16,
    width: '100%',
    marginBottom: 0,
  },
  overViewText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
    textTransform: 'capitalize',
    marginTop: 8,
    lineHeight: 20,
    width: '100%',
    marginBottom: 7,
    textAlign: 'justify',
  },
  backBtn: {
    position: 'absolute',
    top: 60,
    zIndex: 1,
  },
  backBtnImage: {
    height: 30,
    height: 30,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  movieImage: {
    width: '100%',
    height: 500,
    resizeMode: 'stretch',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#355376',
  },
});

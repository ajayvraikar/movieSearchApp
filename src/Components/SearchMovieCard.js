import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {formatDate} from '../Utils/generalUtils';

const SearchMovieCard = ({
  poster,
  title,
  onPressCard,
  overView,
  releaseDate,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPressCard && onPressCard()}
      activeOpacity={0.6}
      style={styles.movieCardMain}>
      <Image
        style={styles.movieImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${poster}`,
        }}
      />
      <View style={styles.sideView}>
        <View>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {releaseDate ? (
            <Text style={styles.releaseDate}>{formatDate(releaseDate)}</Text>
          ) : null}
        </View>
        <Text numberOfLines={4} style={styles.overView}>
          {overView}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchMovieCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
    width: '100%',
    marginBottom: 5,
  },
  movieCardMain: {
    borderRadius: 12,
    width: Dimensions.get('screen').width * 0.93,
    height: 140,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#697F9F',
    backgroundColor: '#4A658B',
    marginBottom: 20,
    flexDirection: 'row',
  },
  movieImage: {
    height: '100%',
    width: '30%',
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  sideView: {
    width: '70%',
    height: '100%',
    padding: 10,
    justifyContent: 'space-between',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },

  releaseDate: {
    fontSize: 13,
    color: 'white',
    fontWeight: '700',
  },
  overView: {
    fontSize: 12,
    color: 'white',
    textAlign: 'justify',
  },
});

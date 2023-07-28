import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {STAR} from '../Constants/Images';

const MovieCard = ({poster, title, rating, onPressCard}) => {
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
      <View style={styles.bottomView}>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        {rating ? (
          <View style={styles.ratingView}>
            <Text style={styles.rating}> {parseFloat(rating).toFixed(1)}</Text>
            <Image source={STAR} style={styles.star} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
    width: '76%',
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  movieCardMain: {
    borderRadius: 12,
    width: Dimensions.get('screen').width * 0.45,
    height: 300,
    marginRight: 12,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: '#697F9F',
    backgroundColor: '#4A658B',
    marginBottom: 20,
  },
  movieImage: {
    height: '84%',
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottomView: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
  },
  ratingView: {
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    height: 12,
    width: 12,
    marginLeft: 4,
  },
});

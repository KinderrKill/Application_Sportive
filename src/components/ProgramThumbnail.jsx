import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ROUTER } from '../MainScreen';

function ProgramThumbnail(props) {
  const { _id, title, durationIndicator, posterImage, programId, videoUrl, isGray } = props;

  const navigation = useNavigation();

  const durationIndicatorFinal = parseInt(durationIndicator) / 60;

  const handlePress = () => {
    navigation.navigate(ROUTER.YOUTUBE_PLAYER, {
      _id: _id,
      title: title,
      program_id: programId,
      videoUrl: videoUrl,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.screen, { backgroundColor: isGray ? 'transparent' : 'white' }]}
      onPress={handlePress}>
      <Image style={styles.img} source={{ uri: posterImage }} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit={true}>
          {title}
        </Text>
        <View style={styles.timerContent}>
          <Icon type='feather' name='clock' />
          <Text style={styles.description} numberOfLines={1} adjustsFontSizeToFit={true}>
            {durationIndicatorFinal}min
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    height: 100,
    position: 'relative',
    marginBottom: 10,
  },

  img: {
    marginLeft: 10,
    height: '90%',
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },

  content: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  title: {
    fontSize: 15,
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    padding: 5,
  },
  timerContent: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 5,
  },
  description: {
    color: 'darkorange',
    fontWeight: 'bold',
    marginTop: 2,
  },
});

export default ProgramThumbnail;

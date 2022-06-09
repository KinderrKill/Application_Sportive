import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { ROUTER } from '../MainScreen';

function HomepageThumbnail(props) {
  const { _id, elHeight, title, description, bgImg, flexEnd, icon } = props;
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(ROUTER.PROGRAM_PAGE, {
      _id: _id,
      title: title,
    });
  };

  return (
    <TouchableOpacity style={[styles.screen, { height: elHeight }]} onPress={handlePress}>
      <View style={[styles.blocHeader]}>
        <ImageBackground source={{ uri: bgImg }} style={styles.programmeImage} resizeMode='cover'>
          <Text
            style={[styles.title, { alignSelf: !flexEnd ? 'flex-start' : 'flex-end' }]}
            numberOfLines={1}
            adjustsFontSizeToFit={true}>
            {props.title}
          </Text>
        </ImageBackground>
      </View>
      <View style={[styles.blocDescription, { backgroundColor: '#f8f8f8' }]}>
        <Icon style={styles.icon} type='feather' name={icon} />
        <Text
          style={styles.description}
          numberOfLines={1}
          ellipsizeMode='tail'
          selectable={true}
          adjustsFontSizeToFit={false}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    position: 'relative',
    backgroundColor: 'green',
    borderRadius: 10,
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },

  blocHeader: {
    flex: 4,
  },

  blocDescription: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: 'white',
    fontWeight: '300',
    margin: 8,
    textTransform: 'uppercase',
  },
  description: {
    textAlignVertical: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  programmeImage: {
    flex: 1,
  },
});

export default HomepageThumbnail;

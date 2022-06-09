import { useState, useRef, useEffect, useCallback } from 'react';

import { useQuery } from '@apollo/client';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

import YoutubePlayerFrame from 'react-native-youtube-iframe';
import { getYoutubeMeta } from 'react-native-youtube-iframe';

import * as DataManager from '../data/Program';

// Variables
const ICON_SIZE = 60;

function PlayerPage(props) {
  const { _id, title, program_id, videoUrl } = props.route.params;

  const programData = getProgramData(_id);

  const playerRef = useRef();
  const playerInterval = useRef();

  const [actualVideo, setActualVideo] = useState();
  const [previousVideo, setPreviousVideo] = useState();
  const [nextVideo, setNextVideo] = useState();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setActualVideo(DataManager.getById(_id));
    setPreviousVideo(DataManager.getNextOrPreviousData(_id, program_id, false));
    setNextVideo(DataManager.getNextOrPreviousData(_id, program_id, true));
  }, []);

  console.log(actualVideo);
  console.log(previousVideo);
  console.log(nextVideo);

  // Manage
  const togglePlaying = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <View>
      <YoutubePlayerFrame ref={playerRef} height={220} play={isPlaying} videoId={videoUrl} />
      <View style={STYLES.nav__screen}>
        <View style={STYLES.nav__playBtn}>
          <Icon type='feather' name='skip-back' onPress={togglePlaying} size={ICON_SIZE - 10} />
          <Icon
            type='feather'
            name={isPlaying ? 'pause' : 'play'}
            onPress={togglePlaying}
            size={ICON_SIZE}
          />
          <Icon type='feather' name='skip-forward' onPress={togglePlaying} size={ICON_SIZE - 10} />
        </View>
      </View>
    </View>
  );
}

const STYLES = StyleSheet.create({
  nav__screen: {
    height: '67%',
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  nav__playBtn: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 10,
  },
});

const getProgramData = (_id) => {
  const { loading, error, data } = useQuery(DataManager.QUERY_GET_BY_PROGRAM_ID, {
    variables: { programId: _id },
  });

  console.log(loading, error, data);
  if (loading || error) {
    return [
      {
        _id: 0,
        title: loading ? 'Chargement en cours...' : error ? 'Erreur lors du chargement...' : '',
        durationIndicator: 0,
      },
    ];
  } else {
    const programData = [...data.findVideosByProgramID].sort((a, b) => a.order - b.order);
    DataManager.saveDataByProgramId(_id, programData);
    return programData;
  }
};

export default PlayerPage;

import { useState, useCallback, useRef, useEffect } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import YoutubePlayerFrame from 'react-native-youtube-iframe';
import { getYoutubeMeta } from 'react-native-youtube-iframe';

import * as programManager from '../data/Program';

function YoutubePlayer(props) {
  const { _id, title, program_id, videoUrl } = props.route.params;

  const programItems = programManager.getProgram();

  // Video const
  const playerRef = useRef();

  const [stateId, setId] = useState(_id);
  const [stateTitle, setTitle] = useState(title);
  const [stateVideoUrl, setVideoUrl] = useState(videoUrl);
  const [playing, setPlaying] = useState(false);

  const [videoCurrentTimeInterval, setVideoCurrentTimeInterval] = useState();
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);

      let indexActualVideo = programItems.findIndex((item) => item._id == stateId);
      if (indexActualVideo++ >= programItems.length - 1) indexActualVideo = programItems.length - 1;

      let nextVideo = programItems[indexActualVideo];

      getYoutubeMeta(nextVideo.videoUrl).then((meta) => {
        setNextVideoThumbnail(meta.thumbnail_url);
      });
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const checkVideoCurrentTime = () => {
    playerRef.current?.getDuration().then((getDuration) => setVideoDuration(parseInt(getDuration)));

    setVideoCurrentTimeInterval(
      setInterval(() => {
        playerRef.current
          ?.getCurrentTime()
          .then((currentTime) => setVideoCurrentTime(parseInt(currentTime)));
      }, 100)
    );

    if (!playing) clearInterval(videoCurrentTimeInterval);
  };

  const changeVideo = (isNext) => {
    let indexActualVideo = programItems.findIndex((item) => item._id == stateId);

    if (isNext) {
      if (indexActualVideo++ >= programItems.length - 1) return;
    } else {
      if (indexActualVideo-- <= 0) return;
    }

    let nextVideo = programItems[indexActualVideo];
    setId(() => nextVideo._id);
    setTitle(() => nextVideo.title);
    setVideoUrl(() => nextVideo.videoUrl);
  };

  const getHHMMSS = (value) => {
    const sec_num = value;
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
  };

  const getPercentOf = (numA, numB) => {
    return (numA / numB) * 100;
  };

  return (
    <View>
      <View style={styles.titleContainer}>
        <Icon type='feather' name='clock' />
        <Text style={styles.title}>{stateTitle}</Text>
      </View>
      <YoutubePlayerFrame
        ref={playerRef}
        height={220}
        play={playing}
        videoId={stateVideoUrl}
        onChangeState={onStateChange}
      />
      <View style={styles.playerNav}>
        <View style={styles.navBtn}>
          <Button title='◄' onPress={() => changeVideo(false)} />
        </View>
        <View style={styles.navBtn}>
          <Button
            title={playing ? 'Pause' : 'Lecture'}
            onPress={() => {
              togglePlaying();
              checkVideoCurrentTime();
            }}
          />
        </View>
        <View style={styles.navBtn}>
          <Button title='Relire' onPress={() => playerRef.current?.seekTo(0, true)} />
        </View>
        <View style={styles.navBtn}>
          <Button title='►' onPress={() => changeVideo(true)} />
        </View>
      </View>
      <View style={styles.durationBar}>
        <Text
          style={[
            styles.dynamicDurationBar,
            { width: getPercentOf(videoCurrentTime, videoDuration) + '%' },
          ]}></Text>
        <Text style={styles.fakeDynamicDurationBar}>
          {getHHMMSS(videoCurrentTime)} / {getHHMMSS(videoDuration)}
        </Text>
      </View>

      {/* <View>
        <Image source={{ uri: nextVideoThumbnail }} style={styles.img} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  playerNav: {
    flexDirection: 'row',
    marginTop: 10,
  },
  navBtn: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'lightgray',
  },
  durationBar: {
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  dynamicDurationBar: {
    color: 'white',
    textAlign: 'left',
    backgroundColor: 'darkred',
    paddingVertical: 5,
  },
  fakeDynamicDurationBar: {
    position: 'absolute',
    paddingVertical: 5,
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
  img: {
    width: 250,
    height: 250,
    marginLeft: 10,
    borderRadius: 10,
  },
});

export default YoutubePlayer;

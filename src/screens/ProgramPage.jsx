import { useQuery } from '@apollo/client';

import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import ProgramThumbnail from '../components/ProgramThumbnail';

import * as DataManager from '../data/Program';

function ProgramPage(props) {
  const { _id, title } = props.route.params;

  const programData = getProgramData(_id);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        keyExtractor={(item) => item._id}
        data={programData}
        renderItem={({ item, index }) => (
          <ProgramThumbnail
            key={index}
            _id={item._id}
            title={item.title}
            durationIndicator={item.durationIndicator}
            posterImage={item.posterImage}
            programId={item.program}
            videoUrl={item.videoUrl}
            isGray={index % 2}
          />
        )}
      />
    </SafeAreaView>
  );
}

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

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
    maxHeight: '86%',
  },
});

export default ProgramPage;

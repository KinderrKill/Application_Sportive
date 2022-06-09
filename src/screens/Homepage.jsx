import { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';

import HomepageThumbnail from '../components/HomepageThumbnail';

import * as CONSTANTS from '../Constants';

export default function App() {
  const [programItems, setProgramItems] = useState([
    {
      _id: '609d57d819e6846e473d4fc3',
      name: 'Débutant',
      level: 1,
      description: 'Commencez tout en douceur!',
      bgImage: 'https://i.ibb.co/42gmhCq/MAIN-DEBUTANT.png',
      background: 'green',
      icon: 'chevrons-up',
    },
    {
      _id: '609d582219e6846e473d4fc4',
      name: 'Intérmédiaire',
      description: 'Lancez vous des défis et allez plus loin!',
      bgImage: 'https://i.ibb.co/s6V5r1d/MAIN-INTERMEDIAIRE.png',
      background: 'red',
      icon: 'activity',
    },
    {
      _id: '609d584019e6846e473d4fc6',
      name: 'Avancé',
      description: 'Repoussez vos limites!',
      bgImage: 'https://i.ibb.co/D57J8TW/MAIN-AVANCE.png',
      background: 'blue',
      icon: 'heart',
    },
  ]);

  const [itemHeight, setItemHeight] = useState();

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item._id}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          setItemHeight((height - CONSTANTS.TAB_BOTTOM_HEIGHT) / programItems.length);
        }}
        data={programItems}
        renderItem={({ item, index, separators }) => (
          <HomepageThumbnail
            _id={item._id}
            elHeight={itemHeight}
            title={item.name}
            description={item.description}
            bgImg={item.bgImage}
            flexEnd={index % 2}
            icon={item.icon}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});

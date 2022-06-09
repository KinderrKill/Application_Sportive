import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './screens/Homepage';
import ProgramPage from './screens/ProgramPage';
import PlayerPage from './screens/PlayerPage';

const Stack = createNativeStackNavigator();

export default function MainScreen() {
  return (
    <Stack.Navigator initialRouteName='LaPasserelle'>
      <Stack.Screen
        name='Home'
        options={{
          headerTitle: 'LaPasserelle',
        }}
        component={Homepage}
      />
      <Stack.Screen
        name='ProgramPage'
        options={{
          headerTitle: 'ProgramPage',
        }}
        component={ProgramPage}
      />

      <Stack.Screen
        name='PlayerPage'
        options={{
          headerTitle: 'PlayerPage',
        }}
        component={PlayerPage}
      />
    </Stack.Navigator>
  );
}

export const ROUTER = {
  PROGRAM_PAGE: 'ProgramPage',
  YOUTUBE_PLAYER: 'PlayerPage',
};

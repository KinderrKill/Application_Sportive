import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';

import { Form, FormItem } from 'react-native-form-component';

import * as CONSTANTS from '../../Constants';

function LoginOrRegister(props) {
  const { setIsConnected } = props;

  const [isRegisterPanel, setIsRegisterPanel] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //IsRegister
  const [confirmPassword, setConfirmPassword] = useState('');

  //Handle error
  const [error, setError] = useState('');

  // Function
  const swapPanel = (isRegister) => {
    setIsRegisterPanel(isRegister);
  };

  //Try to register user
  const [registerUser, { data: mutationData }] = useMutation(CONSTANTS.GQL_CREATE_USER, {
    onCompleted: () => setIsRegisterPanel(false),
    onError: (error) => setError(error.message),
  });

  //Try to connecte user
  const [connectUser] = useLazyQuery(CONSTANTS.GQL_CONNECT_USER, {
    onCompleted: (data) => completeConnexion(data.connectUser.token),
    onError: (error) => setError(error.message),
  });

  const completeConnexion = (dataToken) => {
    CONSTANTS.IS_CONNECTED = true;
    CONSTANTS.CLIENT_JWT_TOKEN = dataToken;
    setIsConnected(true);
  };

  return (
    <View style={STYLES.screen}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 50, color: '#822828' }}>
        LaPasserelle Sport
      </Text>
      <Form
        style={STYLES.form}
        onButtonPress={() =>
          isRegisterPanel
            ? registerUser({ variables: { email: email, password: password } })
            : connectUser({ variables: { email: email, password: password } })
        }
        buttonText={isRegisterPanel ? "S'inscrire" : 'Se connecter'}>
        <FormItem
          label='Email'
          isRequired
          value={email}
          onChangeText={(value) => setEmail(value)}
          underneathText='Vous devez renseigner un email valide !'
        />
        <FormItem
          label='Mot de passe'
          isRequired
          value={password}
          onChangeText={(value) => setPassword(value)}
          secureTextEntry
          underneathText='Vous devez renseigner un mot de passe valide !'
        />
        {isRegisterPanel && (
          <FormItem
            label='Confirmer le mot de passe'
            isRequired
            value={confirmPassword}
            onChangeText={(value) => setConfirmPassword(value)}
            secureTextEntry
            underneathText='Vous devez renseigner un mot de passe valide !'
          />
        )}
        <Text style={STYLES.errorTxt}>{error}</Text>
      </Form>
      <View>
        {isRegisterPanel ? (
          <Text style={STYLES.swapPanelBtn}>
            Vous avez déjà un compte ?{' '}
            <Text style={{ color: '#cd5c5c' }} onPress={() => swapPanel(false)}>
              Connectez-vous !
            </Text>
          </Text>
        ) : (
          <Text style={STYLES.swapPanelBtn}>
            Vous n'avez pas de compte ?{' '}
            <Text style={{ color: '#cd5c5c' }} onPress={() => swapPanel(true)}>
              Rejoignez-nous !
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
}

const STYLES = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  errorTxt: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
  swapPanelBtn: {
    color: 'lightgray',
    marginTop: 50,
    fontSize: 15,
  },
});

export default LoginOrRegister;

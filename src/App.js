/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as Animatable from 'react-native-animatable';
import * as RNLocalize from 'react-native-localize';

import {
  Animated,
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import I18n from '../src/services/translations';
import {TypingAnimation} from 'react-native-typing-animation';

const App = () => {
  const [state, setState] = useState({
    typing_email: false,
    typing_password: false,
    enable: true,
    animation_login: new Animated.Value(width - 40),
  });

  const _foucus = (value) => {
    if (value === 'email') {
      setState({
        typing_email: true,
        typing_password: false,
      });
    } else {
      setState({
        typing_email: false,
        typing_password: true,
      });
    }
  };

  const _typing = () => {
    return <TypingAnimation dotColor="#5D87C7" style={{marginRight: 25}} />;
  };

  const _animation = () => {
    console.log('Click en animacion');
    Animated.timing(state.animation_login, {
      toValue: 40,
      duration: 250,
    }).start();
    setTimeout(() => {
      setState({
        enable: false,
        typing_email: false,
        typing_password: false,
      });
    }, 150);
  };

  const widthAnimation = state.animation_login;

  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.header}>
          <ImageBackground
            source={require('../assets/header.png')}
            style={styles.imageBackground}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
              {I18n.t('welcomeBack')}
            </Text>
            <Text style={{color: '#f5f5f5'}}>{I18n.t('signIn')}</Text>
          </ImageBackground>
        </View>
        <View style={styles.footer}>
          <Text style={[styles.title, {marginTop: 50}]}>E-mail</Text>
          <View style={styles.action}>
            <TextInput
              placeholder={I18n.t('yourEmail')}
              style={styles.textInput}
              onFocus={() => _foucus('email')}
            />
            {state.typing_email ? _typing() : null}
          </View>
          <Text style={[styles.title, {marginTop: 20}]}>Password</Text>
          <View style={styles.action}>
            <TextInput
              secureTextEntry
              placeholder={I18n.t('yourPassword')}
              style={styles.textInput}
              onFocus={() => _foucus('password')}
            />
            {state.typing_password ? _typing() : null}
          </View>
          <TouchableOpacity onPress={() => _animation()}>
            <View style={styles.button_container}>
              <Animated.View
                style={[styles.animation, {width: widthAnimation}]}>
                {state.enable ? (
                  <Text style={styles.textLogin}>{I18n.t('Login')}</Text>
                ) : (
                  <Animatable.View animation="bounceIn" delay={50}>
                    <FontAwesome
                      style={{paddingHorizontal: 10}}
                      name="check"
                      color="white"
                      size={20}
                    />
                  </Animatable.View>
                )}
              </Animated.View>
            </View>
          </TouchableOpacity>
          <View style={styles.signUp}>
            <Text style={{color: 'black', marginRight: 10}}>
              {I18n.t('newUser')}
            </Text>
            <Text style={{color: 'blue'}}>{I18n.t('signUp')}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    height: 250,
  },
  footer: {
    flex: 2,
    padding: 20,
    backgroundColor: 'transparent',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 5,
    color: 'gray',
  },
  button_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    backgroundColor: '#5D87C7',
    paddingVertical: 10,
    marginTop: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default App;

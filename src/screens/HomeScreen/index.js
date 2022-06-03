import React from 'react';
import {View, Text} from 'react-native';
import {Auth} from 'aws-amplify';
import {useNavigation} from '@react-navigation/core';


const Home = () => {

  const navigation = useNavigation();

  
  const signOut = () => {
    console.debug("Sign Out Pressed")
    Auth.signOut();
    navigation.navigate('SignIn')
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet home</Text>
      <Text
        onPress={signOut}
        style={{
          width: '100%',
          textAlign: 'center',
          color: 'red',
          marginTop: 'auto',
          marginVertical: 20,
          fontSize: 20,
        }}>
        Sign out
      </Text>
    </View>
  );
};

export default Home;

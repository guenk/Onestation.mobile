import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

interface RequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigation = useNavigation();

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion
    navigation.navigate('Login');
    return (
      <View>
        <Text>Redirecting to login...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

export default RequireAuth;

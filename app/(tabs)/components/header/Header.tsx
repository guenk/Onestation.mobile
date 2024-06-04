import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authActions';
import { RootState } from '../../redux/store';

const navigationItems = [
  { name: 'Rejoindre une partie', to: 'JoinGame' },
  { name: 'Créer une partie', to: 'CreateGame' },
  { name: 'Règles du jeu', to: 'Rules' },
];

const Header: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      dispatch(logout());
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const avatarFileName = user?.avatar?.split('/').pop();

  return (
    <View style={styles.navbar}>
      <View style={styles.logoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.logo}
            source={require("../../../../assets/navbarpic2.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.navItemsContainer}>
        {navigationItems.map((item) => (
          <TouchableOpacity key={item.name} onPress={() => navigation.navigate(item.to)}>
            <Text style={styles.navItem}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isAuthenticated ? (
        <View style={styles.authContainer}>
          {user && (
            <TouchableOpacity onPress={() => navigation.navigate('Profil', { id: user.id_gamer })}>
              <View style={styles.profileContainer}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `${process.env.VITE_BACKEND_URL}/static/${avatarFileName}`,
                  }}
                  resizeMode="cover"
                />
                <Text style={styles.username}>{user.pseudo}</Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.authButton}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.authButton}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.authButton}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    height: 60,
    width: 120,
  },
  navItemsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  navItem: {
    fontSize: 16,
    color: '#0B8DFD',
    fontWeight: 'bold',
  },
  authContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  authButton: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#0B8DFD',
  },
});

export default Header;

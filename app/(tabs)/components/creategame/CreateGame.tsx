import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CreateGameProps {
  joinRoom: () => void;
  createRoom: (profil: { username: string; color: string }, privateOrNot: boolean) => void;
  profil: { username: string; color: string };
}

const CreateGame: React.FC<CreateGameProps> = ({ joinRoom, createRoom, profil }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.joinButton]} onPress={() => joinRoom()}>
        <Text style={styles.joinButtonText}>Jouer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.createButton]}
        onPress={() => createRoom(profil, true)}
      >
        <Text style={styles.createButtonText}>Créer une room privée</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  joinButton: {
    backgroundColor: '#C6F6D5',
  },
  createButton: {
    backgroundColor: '#BEE3F8',
  },
  joinButtonText: {
    fontWeight: 'bold',
    color: '#22543D',
  },
  createButtonText: {
    fontWeight: 'bold',
    color: '#2B6CB0',
  },
});

export default CreateGame;

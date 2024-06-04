import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

interface GameToolbarProps {
  roomID: string;
  setChatMessageAuto: (message: string) => void;
}

const GameToolbar: React.FC<GameToolbarProps> = ({ roomID, setChatMessageAuto }) => {
  const copyToClipboard = async () => {
    try {
      Clipboard.setString("localhost:5173/?" + roomID);
      setChatMessageAuto("Lien d'invitation copié");
      Alert.alert("Succès", "Lien d'invitation copié");
    } catch (error) {
      console.log(error);
      Alert.alert("Erreur", "Impossible de copier le lien");
    }
  };

  return (
    <View style={styles.toolbar}>
      <TextInput
        style={styles.input}
        value={"localhost:5173/?" + roomID}
        editable={false}
      />
      <TouchableOpacity style={styles.button} onPress={copyToClipboard}>
        <Text style={styles.buttonText}>Copier</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    margin: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  button: {
    backgroundColor: "#007aff",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default GameToolbar;

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Signature from 'react-native-signature-canvas';

interface GameCanvasProps {
  socket: any;
  roomID: number;
  room: any;
  etape: number;
  round: number;
  changerEtape: (etapeEnCours: number, round: number, mot?: string) => void;
  words: string[];
  setWords: (words: string[]) => void;
  setChatMessageAuto: (message: string) => void;
  drawer: any;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  socket,
  roomID,
  room,
  etape,
  round,
  changerEtape,
  words,
  setWords,
  setChatMessageAuto,
  drawer,
}) => {
  const [customWords, setCustomWords] = useState(words.join(","));

  function handleCustomWordsChange(value: string) {
    setCustomWords(value);
    setWords(value.split(","));
  }

  function handleStartClick() {
    if (words.length < 10) {
      setChatMessageAuto("Ajoutez un minimum de 10 mots");
    } else {
      changerEtape(1, 1);
    }
  }

  function handleWordChosen(word: string) {
    changerEtape(2, round, word);
  }

  const handleSignature = (signature: string) => {
    console.log(signature);
  };

  const handleClear = () => {
    console.log('Clear');
  };

  switch (etape) {
    case 0:
      return (
        <View style={styles.container}>
          {socket.id === room.creator ? (
            <>
              <TextInput
                style={styles.textarea}
                multiline
                numberOfLines={10}
                placeholder="Ajouter un minimum de 10 mots, séparés par une , (virgule)"
                value={customWords}
                onChangeText={handleCustomWordsChange}
              />
              <TouchableOpacity style={styles.startButton} onPress={handleStartClick}>
                <Text style={styles.startButtonText}>Commencer</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.waitingText}>En attente du propriétaire du jeu...</Text>
          )}
        </View>
      );

    case 1:
      return (
        <View style={styles.container}>
          {drawer.id === socket.id ? (
            <>
              <Text style={styles.textCenter}>Choisissez un mot</Text>
              <View style={styles.wordsContainer}>
                {words.map((word, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.wordButton}
                    onPress={() => handleWordChosen(word)}
                  >
                    <Text style={styles.wordButtonText}>{word}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.waitingText}>{drawer.profil.username} est en train de choisir un mot...</Text>
          )}
        </View>
      );

    case 2:
      return (
        <View style={styles.canvasContainer}>
          <Signature
            onOK={handleSignature}
            descriptionText="Draw"
            clearText="Clear"
            confirmText="Save"
            webStyle={styles.canvas}
          />
        </View>
      );

    case 3:
      return (
        <View style={styles.container}>
          <Text style={styles.winnerText}>{drawer.profil.username} a gagné !</Text>
        </View>
      );

    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  textarea: {
    width: "100%",
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#34c759",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  startButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  waitingText: {
    fontSize: 18,
    color: "#666",
  },
  textCenter: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20,
  },
  wordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  wordButton: {
    backgroundColor: "#007aff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  wordButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  canvasContainer: {
    flex: 1,
    width: '100%',
  },
  canvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  winnerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34c759",
  },
});

export default GameCanvas;


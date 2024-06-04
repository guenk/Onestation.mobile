import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface GameBarProps {
  round: number;
  label: string;
  etape: number;
  words: string;
  socket: any;
  drawer: any;
}

const GameBar: React.FC<GameBarProps> = ({ round, etape, words, socket, drawer }) => {
  if (etape === 2) {
    if (socket.id === drawer.id) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Round {round} sur 3</Text>
          <View>
            <Text style={styles.text}>Dessinez ce mot</Text>
            <Text style={[styles.text, styles.boldText, styles.centerText]}>{words}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Round {round} sur 3</Text>
          <View>
            <Text style={styles.text}>Devinez ce mot</Text>
            <Text style={[styles.text, styles.boldText, styles.centerText]}>
              {[...words].map((letter, index) => {
                if (letter === " ") {
                  return <Text key={index}>&nbsp;&nbsp;</Text>;
                } else {
                  return <Text key={index}>_ </Text>;
                }
              })}
            </Text>
          </View>
        </View>
      );
    }
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  centerText: {
    textAlign: "center",
  },
});

export default GameBar;

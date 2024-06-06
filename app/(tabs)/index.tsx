import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Header from "@/components/header";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>
          Bienvenue dans
        </Text>
        <Text style={styles.titleText}>
          Guess My Draw!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => {
            /* TODO */
          }}
        >
          <Text style={styles.buttonText}>Jouer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.blueButton]}
          onPress={() => {
            /* TODO */
          }}
        >
          <Text style={[styles.buttonText]}>Créer une room privée</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 80,
  },
  titleText: {
    textAlign: "center",
    paddingTop: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    justifyContent: "center",
    flexDirection: "row",
    gap: 40,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    alignItems: "center",
  },
  greenButton: {
    backgroundColor: "#C6F6D5",
  },
  blueButton: {
    backgroundColor: "#BEE3F8",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2D3748",
  },
  disabledButton: {},
  disabledText: {
    color: "#2D3748",
  },
});

import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Header from "@/components/header";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <Header />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.titleText}>
          Bienvenue dans
        </ThemedText>
        <ThemedText type="title" style={styles.titleText}>
          Guess My Draw!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.buttonContainer}>
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
      </ThemedView>
    </ThemedView>
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

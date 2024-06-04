import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/header/Header";

const Rules: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.rulesContainer}>
        <View style={styles.rules}>
          <Text style={styles.title}>Règles du Jeu</Text>
          <Text style={styles.intro}>Bienvenue sur la page des règles. Voici comment jouer :</Text>

          <View style={styles.ruleSection}>
            <Text style={styles.sectionTitle}>
              À chaque tour de rôle, les joueurs doivent faire deviner un mot en dessinant.
            </Text>
            <Text style={styles.subTitle}>Si tu es le dessinateur :</Text>
            <Text style={styles.ruleText}>
              Choisis parmi 10 mots dans la liste proposée celui de ton choix.
            </Text>
            <Text style={styles.ruleText}>Le temps pour dessiner est de 80 secondes.</Text>
            <Text style={styles.ruleText}>Interdiction de faire deviner le mot en l'écrivant !</Text>
          </View>

          <View style={styles.ruleSection}>
            <Text style={styles.subTitle}>Si tu es la personne qui devine :</Text>
            <Text style={styles.ruleText}>
              Tu disposes de 80 secondes pour taper le mot dans le Chat.
            </Text>
            <Text style={styles.ruleText}>Sois rapide pour amasser le plus de points possibles !</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F6F6",
  },
  rulesContainer: {
    padding: 20,
    alignItems: "center",
  },
  rules: {
    width: "100%",
    maxWidth: 600,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  intro: {
    fontSize: 16,
    marginBottom: 20,
  },
  ruleSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ruleText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Rules;

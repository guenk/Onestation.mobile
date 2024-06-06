import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import Header from "../../components/header";

const Rules = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/grib.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Header />
        <ScrollView contentContainerStyle={styles.rulesContainer}>
          <View style={styles.rules}>
            <Text style={styles.title}>Règles du Jeu</Text>
            <Text style={styles.paragraph}>
              Bienvenue sur la page des règles.Voici comment jouer :
            </Text>

            <View style={styles.ruleSection}>
              <Text style={styles.subtitle}>
                À chaque tour de rôle, les joueurs doivent faire deviner un mot
                en dessinant.
              </Text>
              <Text style={styles.sectionTitle}>Si tu es le dessinateur :</Text>
              <Text style={styles.paragraph}>
                Choisis parmi 10 mots dans la liste proposée celui de ton choix.
              </Text>
              <Text style={styles.paragraph}>
                Le temps pour dessiner est de 80 secondes.
              </Text>
              <Text style={styles.paragraph}>
                Interdiction de faire deviner le mot en l'écrivant !
              </Text>
            </View>

            <View style={styles.ruleSection}>
              <Text style={styles.sectionTitle}>
                Si tu es la personne qui devine :
              </Text>
              <Text style={styles.paragraph}>
                Tu disposes de 80 secondes pour taper le mot dans le Chat.
              </Text>
              <Text style={styles.paragraph}>
                Sois rapide pour amasser le plus de points possibles !
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Rules;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    width: "auto",
    height: "auto",
  },
  overlay: {
    flex: 1,
    width: "100%",
  },
  rulesContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  rules: {
    width: "80%",
    maxWidth: 800,
    backgroundColor: "#ffffff",
    padding: 40,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: "#e63946",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "justify",
  },
  ruleSection: {
    marginTop: 18,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#1d3557",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#1a1c1c",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 20,
    paddingTop: 20,
    lineHeight: 24,
    textAlign: "justify",
  },
});

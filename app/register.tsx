import React, { useState } from "react";
import { Link } from "expo-router";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { validateInputs } from "../utils/errorInputs";

export default function Register() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    const inputErrors = validateInputs({ pseudo, password });

    if (Object.keys(inputErrors).length > 0) {
      setFormError(inputErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, email, password }),
      });

      if (!response.ok) {
        console.log(response);
        const errorData = await response.json();
        throw new Error(errorData.errorCode);
      }

      await response.json();
      Toast.show({
        type: "success",
        text1: "Inscription réussie !",
      });
      navigation.navigate("login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      if (error instanceof Error) {
        switch (error.message) {
          case "invalidInput":
            Toast.show({
              type: "error",
              text1: "Merci de respecter le format requis",
            });
            break;
          case "emailExist":
            Toast.show({
              type: "error",
              text1: "Un utilisateur avec cet email existe déjà.",
            });
            break;
          case "loginExist":
            Toast.show({
              type: "error",
              text1: "Un utilisateur avec ce pseudo existe déjà.",
            });
            break;
          default:
            Toast.show({
              type: "error",
              text1: error.message || "Erreur lors de l'inscription.",
            });
        }
      }
    }
  };

  return (
    <View style={styles.mainregister}>
      <Link style={styles.link} href="/">
        <Image
          source={require("../assets/images/navbarpic2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </Link>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Inscription</Text>
        <Text style={styles.label}>Pseudo:</Text>
        <TextInput
          style={styles.input}
          value={pseudo}
          onChangeText={setPseudo}
          placeholder="Pseudo"
          placeholderTextColor="#888"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {formError.pseudo && (
          <Text style={styles.errorText}>{formError.pseudo}</Text>
        )}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
        />
        <Text style={styles.label}>Mot de passe:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mot de passe"
          placeholderTextColor="#888"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {formError.password && (
          <Text style={styles.errorText}>{formError.password}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Vous avez déjà un compte?</Text>
          <Link href="login">
            <Text style={styles.linkText}>Se connecter</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainregister: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    borderRadius: 8,
  },
  link: {
    alignSelf: "center",
    marginBottom: 20,
    height: 200,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    alignSelf: "center",
    fontSize: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 4,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  text: {
    color: "#333",
    marginBottom: 10,
  },
  linkText: {
    color: "blue",
    fontWeight: "bold",
    marginLeft: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

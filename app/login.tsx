import React, { useState } from "react";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authActions";
import { validateInputs } from "../utils/errorInputs";

export default function Login() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const inputErrors = validateInputs({ pseudo, password });

    if (Object.keys(inputErrors).length > 0) {
      setFormError(inputErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorCode);
      }

      const data = await response.json();
      const { token, user } = data;
      dispatch(loginSuccess(token, user));
      Toast.show({
        type: "success",
        text1: "Connexion réussie !",
      });
      navigation.navigate("index");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      if (error instanceof Error) {
        switch (error.message) {
          case "invalidInput":
            Toast.show({
              type: "error",
              text1: "Merci de respecter le format requis",
            });
            break;
          case "invalidCombinaison":
            Toast.show({
              type: "error",
              text1: "Identifiants incorrects.",
            });
            break;
          default:
            Toast.show({
              type: "error",
              text1: error.message || "Erreur lors de la connexion",
            });
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Link style={styles.link} href="/">
          <Image
            source={require("../assets/images/navbarpic2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </Link>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.label}>Pseudo:</Text>
        <TextInput
          style={styles.input}
          value={pseudo}
          onChangeText={(text) => setPseudo(text)}
          placeholder="Pseudo"
          placeholderTextColor="#333"
        />
        {formError.pseudo && (
          <Text style={styles.errorText}>{formError.pseudo}</Text>
        )}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          placeholderTextColor="#333"
        />
        <Text style={styles.label}>Mot de passe:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Mot de passe"
          placeholderTextColor="#333"
          secureTextEntry={true}
        />
        {formError.password && (
          <Text style={styles.errorText}>{formError.password}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <View style={styles.registerLink}>
          <Text>Vous n'avez pas encore de compte?</Text>
          <Link href="register">
            <Text style={styles.registerText}>S'inscrire</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  formContainer: {
    width: "80%",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  link: {
    alignSelf: "center",
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
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  registerLink: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: "blue",
    marginLeft: 5,
  },
});

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import loginpicone from "../../../../assets/navbarpic2.png";
import { validateInputs } from "../../../utils/errorInputs";

const Register: React.FC = () => {
  const [pseudo, setPseudo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<Record<string, string>>({});
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
        const errorData = await response.json();
        throw new Error(errorData.errorCode);
      }

      await response.json();

      Toast.show({
        type: 'success',
        text1: 'Inscription réussie !',
      });
      navigation.navigate("Login");
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      switch (error.message) {
        case "invalidInput":
          Toast.show({
            type: 'error',
            text1: "Merci de respecter le format requis",
          });
          break;
        case "emailExist":
          Toast.show({
            type: 'error',
            text1: "Un utilisateur avec cet email existe déjà.",
          });
          break;
        case "loginExist":
          Toast.show({
            type: 'error',
            text1: "Un utilisateur avec ce pseudo existe déjà.",
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: error.message || "Erreur lors de l'inscription.",
          });
      }
    }
  };

  return (
    <>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Image style={styles.loginpicone} source={loginpicone} />
          </TouchableOpacity>
          <View>
            <Text style={styles.label}>Pseudo:</Text>
            <TextInput
              style={styles.input}
              value={pseudo}
              onChangeText={setPseudo}
              required
            />
            {formError.pseudo && (
              <Text style={styles.errorText}>{formError.pseudo}</Text>
            )}
          </View>
          <View>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              required
            />
          </View>
          <View>
            <Text style={styles.label}>Mot de passe:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              required
            />
            {formError.password && (
              <Text style={styles.errorText}>{formError.password}</Text>
            )}
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>S'inscrire</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text>Vous avez déjà un compte?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginButton}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  loginpicone: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#0B8DFD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginButton: {
    color: '#0B8DFD',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default Register;

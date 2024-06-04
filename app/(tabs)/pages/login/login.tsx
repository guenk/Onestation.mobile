import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { loginSuccess } from "../../redux/authActions";
import loginpicone from "../../../../assets/navbarpic2.png";
import { validateInputs } from "../../utils/errorInputs";
w
const Login: React.FC = () => {
  const [pseudo, setPseudo] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<Record<string, string>>({});
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
      console.log("Connexion réussie:", data);
      dispatch(loginSuccess(token, user));
      Toast.show({
        type: 'success',
        text1: 'Connexion réussie !',
      });
      navigation.navigate("Home");
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      switch (error.message) {
        case "invalidInput":
          Toast.show({
            type: 'error',
            text1: 'Merci de respecter le format requis',
          });
          break;
        case "invalidCombinaison":
          Toast.show({
            type: 'error',
            text1: "Identifiants (pseudo / email) et/ou mot de passe incorrect.",
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: error.message || "Erreur lors de la connexion.",
          });
      }
    }
  };

  return (
    <>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={styles.mainlogin}>
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
            <Text style={styles.submitButtonText}>Se connecter</Text>
          </TouchableOpacity>
          <View style={styles.registerContainer}>
            <Text>Vous n'avez pas encore de compte?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.registerButton}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainlogin: {
    flex: 1,
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
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerButton: {
    color: '#0B8DFD',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default Login;

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; 
// import { ToastContainer, toast } from "react-native-toastify";
// import "react-native-toastify/dist/ReactNativeToastify.css";
// import loginpicone from "../../assets/navbarpic2.png";
// import { Link } from "react-router-dom";
// import { validateInputs } from "../../utils/errorInputs";

export default function Register() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const navigation = useNavigation(); // Hook pour la navigation

  const handleSubmit = async () => {
    // const inputErrors = validateInputs({ pseudo, password });

    // if (Object.keys(inputErrors).length > 0) {
    //   setFormError(inputErrors);
    // }
    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pseudo, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Récupération de la réponse en cas d'erreur
        throw new Error(errorData.errorCode);
      }

      await response.json(); // Extraction des données de la réponse

    //   toast.success("Inscription réussie !");
    //   navigation.navigate("Login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
    //   switch (error.message) {
    //     case "invalidInput":
    //       toast.error("Merci de respecter le format requis");
    //       break;
    //     case "emailExist":
    //       toast.error("Un utilisateur avec cet email existe déjà.");
    //       break;
    //     case "loginExist":
    //       toast.error("Un utilisateur avec ce pseudo existe déjà.");
    //       break;
    //     default:
    //       toast.error(error.message || "Erreur lors de l'inscription.");
    //   }
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <View style={styles.mainregister}>
        <View style={styles.formContainer}>
          {/* <Link to={"/"}>
            <Image source={loginpicone} style={styles.logo} />
          </Link> */}
          <Text style={styles.label}>Pseudo:</Text>
          <TextInput
            style={styles.input}
            value={pseudo}
            onChangeText={(text) => setPseudo(text)}
            placeholder="Pseudo"
            placeholderTextColor="#888"
            autoCapitalize="none"
            autoCorrect={false}
            // required
          />
          {/* {formError.pseudo && <Text style={styles.errorText}>{formError.pseudo}</Text>} */}
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="Email"
            placeholderTextColor="#888"
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
            // required
          />
          <Text style={styles.label}>Mot de passe:</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Mot de passe"
            placeholderTextColor="#888"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            // required
          />
          {/* {formError.password && <Text style={styles.errorText}>{formError.password}</Text>} */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Vous avez déjà un compte?</Text>
            {/* <Link to={"/login"}> */}
              <TouchableOpacity>
                <Text style={styles.linkText}>Se connecter</Text>
              </TouchableOpacity>
            {/* </Link> */}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainregister: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "whitesmoke",
  },
  formContainer: {
    width: "80%",
    backgroundColor: "whitesmoke",
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
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
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
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    color: "#333",
  },
  linkText: {
    color: "blue",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootState } from "../../redux/store";
import Header from "../../components/header/Header";
import { updateUser, logout } from "../../redux/authActions";
import { validateInputs } from "../utils/errorInputs";
import Toast from 'react-native-toast-message';

const UpdateProfil: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const [formData, setFormData] = useState({
    pseudo: user.pseudo,
    email: user.email,
    avatar: user.avatar,
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (route.params?.successMessage) {
      Toast.show({
        type: 'success',
        text1: route.params.successMessage,
      });
    }
  }, [route.params]);

  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    setIsModified(true);
  };

  const handleAvatarClick = () => {
    // Handle avatar click
  };

  const handleSubmit = async () => {
    const inputErrors = validateInputs(formData);
    if (Object.keys(inputErrors).length > 0) {
      setFormError(inputErrors);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/api/gamer/${user.id_gamer}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errorCode);
      }

      const updatedData = await response.json();
      dispatch(updateUser(updatedData.pseudo, updatedData.email, updatedData.avatar));

      Toast.show({
        type: 'success',
        text1: 'Votre profil a bien été modifié avec succès !',
      });

      navigation.navigate("Profil", {
        successMessage: "Votre profil a bien été modifié avec succès !",
      });
    } catch (error: any) {
      console.error("Error updating user:", error);
      switch (error.message) {
        case "invalidInput":
          Toast.show({
            type: 'error',
            text1: "Merci de respecter le format requis",
          });
          break;
        case "loginExist":
          Toast.show({
            type: 'error',
            text1: "Un utilisateur avec ce pseudo existe déjà.",
          });
          break;
        case "emailExist":
          Toast.show({
            type: 'error',
            text1: "Un utilisateur avec cet email existe déjà.",
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: "Erreur lors de la modification de votre profil !",
          });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.form}>
        <TouchableOpacity onPress={handleAvatarClick}>
          <Image style={styles.avatar} source={{ uri: formData.avatar }} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          value={formData.pseudo}
          onChangeText={(text) => handleChange("pseudo", text)}
        />
        {formError.pseudo && <Text style={styles.errorText}>{formError.pseudo}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
        />
        {formError.email && <Text style={styles.errorText}>{formError.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={formData.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
        />
        {formError.password && <Text style={styles.errorText}>{formError.password}</Text>}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={!isModified}>
          <Text style={styles.submitButtonText}>Modifier</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  form: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
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
    backgroundColor: "#0B8DFD",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UpdateProfil;


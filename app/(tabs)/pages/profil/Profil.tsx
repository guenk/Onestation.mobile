import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootState } from "../../redux/store";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../redux/authActions";
import Toast from 'react-native-toast-message';

const Profil: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const avatarFileName = user?.avatar.split("/").pop();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/api/gamer/${user.id_gamer}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(logout());
      navigation.navigate("Home");
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  useEffect(() => {
    if (route.params?.successMessage) {
      Toast.show({
        type: 'success',
        text1: route.params.successMessage,
      });
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.profileContainer}>
        <Text style={styles.title}>
          <Text style={styles.titlePart1}>Bienvenue </Text>
          <Text style={styles.titlePart2}>sur Guess </Text>
          <Text style={styles.titlePart3}>My Draw !</Text>
        </Text>
        <Text style={styles.subtitle}>Mon compte</Text>
        <Toast />
        <View style={styles.profileInfoContainer}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={{ uri: `${process.env.VITE_BACKEND_URL}/static/${avatarFileName}` }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Pseudo: <Text style={styles.infoValue}>{user?.pseudo}</Text></Text>
            <Text style={styles.infoText}>Email: <Text style={styles.infoValue}>{user?.email}</Text></Text>
            <Text style={styles.infoText}>Mot de passe: <Text style={styles.infoValue}>************</Text></Text>
          </View>
        </View>
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('UpdateProfil', { id_gamer: user?.id_gamer })}>
            <FontAwesomeIcon icon={faPen} size={24} color="#0B8DFD" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShow}>
            <FontAwesomeIcon icon={faTrash} size={24} color="#FE2C65" />
          </TouchableOpacity>
        </View>
        <Modal visible={showModal} transparent={true} animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text>Êtes-vous sûr de vouloir supprimer votre compte ?</Text>
              <View style={styles.modalActions}>
                <TouchableOpacity style={styles.modalButtonDelete} onPress={handleDelete}>
                  <Text style={styles.modalButtonText}>Supprimer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonCancel} onPress={handleClose}>
                  <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F6F6',
  },
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titlePart1: {
    color: '#FE2C65',
  },
  titlePart2: {
    color: '#FFB401',
  },
  titlePart3: {
    color: '#0B8DFD',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FE2C65',
    marginVertical: 16,
  },
  profileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    width: '90%',
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  infoValue: {
    color: '#888',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButtonDelete: {
    backgroundColor: '#FE2C65',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  modalButtonCancel: {
    backgroundColor: '#FFB401',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
});

export default Profil;

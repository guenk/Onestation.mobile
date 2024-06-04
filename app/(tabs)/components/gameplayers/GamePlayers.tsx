import React, { useEffect } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/authActions";
import { RootState } from "../../redux/store";

const GamePlayers: React.FC = () => {
  const dispatch = useDispatch();

  // Sélectionner les informations du joueur depuis le store Redux
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // Mettre à jour l'id_role du joueur si nécessaire
  useEffect(() => {
    if (user && user.id_role !== 3) {
      const { pseudo, email, avatar } = user;
      dispatch(updateUser(pseudo, email, avatar));
    }
  }, [dispatch, user]);

  // Récupérer le nom du fichier avatar
  const avatarFileName = user?.avatar?.split("/").pop();

  if (!user) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{ uri: `${process.env.VITE_BACKEND_URL}/static/${avatarFileName}` }}
        alt="Description de l'image"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{user.pseudo}</Text>
        <Text>0 points</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 80,
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoContainer: {
    marginLeft: 10,
  },
  username: {
    fontWeight: "bold",
  },
});

export default GamePlayers;

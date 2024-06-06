import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogin = () => {
    // Logic for login
    console.log("Login button clicked");
  };

  const handleSignup = () => {
    // Redirection vers la page Register
    navigation.navigate("register");
  };

  return (
    <TouchableOpacity onPress={closeMenu}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/navbarpic2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons
            name={menuOpen ? "close" : "menu"}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        {menuOpen && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleLogin}>
              <Text style={styles.menuText}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleSignup}>
              <Text style={styles.menuText}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 150,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 30,
    color: "#0B8DFD",
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  menuText: {
    fontFamily: "PermanentMarker-Regular",
    fontSize: 16,
  },
});

export default Header;

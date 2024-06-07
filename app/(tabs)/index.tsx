import React, {useEffect, useState} from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Header from "@/components/header";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";
import GameState from "@/components/GameState";

const socket = io("http://localhost:3001");

export default function HomeScreen() {
  const [room, setRoom] = useState({ roomID: null, room: null });
  const [messageAuto, setMessageAuto] = useState("");
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const user = useSelector((state) => state.auth.user);

  // Normally stored in DB
  const profil = {
    username: 'Jean Michel',
    color: "#FF6F61",
    avatar: "backend/src/assets/av6.png",
  };

  function joinRoom(roomID: undefined) {
    const queryParameters = new URLSearchParams(window.location.search);

    if (roomID === undefined) {
      socket.emit("join_random_room", { profil });
    } else {
      roomID = Number(queryParameters.toString().split("=")[0].trim());
      socket.emit("join_room", { roomID, profil });
    }
  }

  function createRoom(profil, privateOrNot) {
    socket.emit("create_game_room", { profil, privateOrNot });
  }

  useEffect(() => {
    socket.emit("home_room", { profil });

    socket.on("home_room_joined", ({ roomID, roomJoined }) => {
      setRoom({ roomID, room: roomJoined });
    });

    socket.on("game_room_created", ({ roomID, roomCreated }) => {
      setRoom({ roomID, room: roomCreated });
      if (roomID !== 0 && roomID !== null) {
        setMessageAuto(
            `${profil.username} est maintenant propriétaire de la partie`
        );
      }
    });

    socket.on("room_joined", ({ roomID, roomJoined }) => {
      setRoom({ roomID, room: roomJoined });
    });

    return () => {
      socket.off("home_room_joined");
      socket.off("game_room_created");
      socket.off("random_room_joined");
    };
  }, [profil.username]);

  return (
    <>
    <View style={styles.container}>
      <Header roomID={room.roomID} setRoom={setRoom} />

      {room.roomID == undefined || room.roomID == 0 ? (
        <>
          <View style={styles.titleContainer}>
            <Text type="title" style={styles.titleText}>
              Bienvenue dans
            </Text>
            <Text type="title" style={styles.titleText}>
              Guess My Draw!
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.greenButton]}
              onPress={() => {
                joinRoom()
              }}
            >
              <Text style={styles.buttonText}>Jouer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.blueButton]}
              onPress={() => {
                createRoom(profil, true)
              }}
            >
              <Text style={[styles.buttonText]}>Créer une room privée</Text>
            </TouchableOpacity>
          </View>
        </>
        ) : (
        <GameState
          socket={socket}
          roomID={room.roomID}
          room={room.room}
          profil={profil}
          messageAuto={messageAuto}
          setMessageAuto={setMessageAuto}
        ></GameState>
      )}

    </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  titleContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 80,
  },
  titleText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    marginVertical: 20,
    justifyContent: "center",
    flexDirection: "row",
    gap: 40,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 15,
    alignItems: "center",
  },
  greenButton: {
    backgroundColor: "#C6F6D5",
  },
  blueButton: {
    backgroundColor: "#BEE3F8",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2D3748",
  },
  disabledButton: {},
  disabledText: {
    color: "#2D3748",
  },
});
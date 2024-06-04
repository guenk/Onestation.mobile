import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Platform, View, Text, ActivityIndicator } from "react-native";
import io from "socket.io-client";
import { useSelector, Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import CreateGame from "./components/creategame/CreateGame";
import GameState from "./components/gamestate/GameState";
import RequireAuth from "./components/requireauth/RequireAuth";
import Chat from "./components/chat/Chat";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Header from "./components/header/Header";
import Profil from "./pages/profil/Profil";
import UpdateProfil from "./components/updateProfil/updateProfil";
import Rules from "./pages/rules/rules";

const socket = io("http://localhost:3001");

const Stack = createStackNavigator();

function App() {
  const [room, setRoom] = useState({ roomID: null, room: null });
  const [messageAuto, setMessageAuto] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);

  const profil = {
    username: "Jean Patrick",
    color: "#FF6F61",
  };

  function joinRoom(roomID) {
    if (roomID === undefined) {
      socket.emit("join_random_room", { profil });
    } else {
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
        setMessageAuto(`${profil.username} est maintenant propriétaire de la partie`);
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
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Rules" component={Rules} />
            <Stack.Screen name="Home">
              {() => (
                <>
                  <Header />
                  {room.roomID === null || room.roomID === 0 ? (
                    <View style={styles.container}>
                      <Text style={styles.title}>Guess My Draw</Text>
                      <CreateGame joinRoom={joinRoom} createRoom={createRoom} profil={profil} />
                      <Chat socket={socket} roomID={room.roomID} profil={profil} />
                    </View>
                  ) : (
                    <GameState
                      socket={socket}
                      roomID={room.roomID}
                      room={room.room}
                      profil={profil}
                      messageAuto={messageAuto}
                      setMessageAuto={setMessageAuto}
                    />
                  )}
                </>
              )}
            </Stack.Screen>
            <Stack.Screen name="Profil" component={RequireAuth(Profil)} />
            <Stack.Screen name="UpdateProfil" component={RequireAuth(UpdateProfil)} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

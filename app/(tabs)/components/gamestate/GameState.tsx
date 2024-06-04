import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Chat from "../chat/Chat";
import GameBar from "../gamebar/GameBar";
import GameCanvas from "../gamecanvas/GameCanvas";
import GamePlayers from "../gameplayers/GamePlayers";
import GameToolbar from "../gametoolbar/GameToolbar";

interface GameStateProps {
  socket: SocketIOClient.Socket;
  roomID: number;
  room: any;
  profil: { username: string; color: string };
  messageAuto: string;
  setMessageAuto: (message: string) => void;
}

const GameState: React.FC<GameStateProps> = ({
  socket,
  roomID,
  room,
  profil,
  messageAuto,
  setMessageAuto,
}) => {
  const labels = {
    1: "En attente",
    2: "Devinez le mot",
    3: "Dessinez le mot",
  };

  const [etape, setEtape] = useState(0);
  const [round, setRound] = useState(1);
  const [label, setLabel] = useState("En attente");
  const [chatMessageAuto, setChatMessageAuto] = useState<string>();
  const [words, setWords] = useState("");
  const [currentDrawer, setCurrentDrawer] = useState<any>(null);

  function changerEtape(etapeEnCours: number, round: number, mot: string | null = null) {
    switch (etapeEnCours) {
      case 1:
        setLabel("En attente");
        socket.emit("new_step", {
          roomID,
          customWords: words,
          etapeEnCours: 1,
          round: round,
        });
        break;

      case 2:
        try {
          socket.emit("new_step", {
            roomID,
            customWords: mot,
            etapeEnCours: 2,
            round: round,
          });
        } catch (e) {
          console.log(e);
        }
    }
  }

  useEffect(() => {
    setChatMessageAuto(messageAuto);
  }, [messageAuto, setMessageAuto]);

  useEffect(() => {
    socket.on("game_started", ({ etapeEnCours, currentDrawer, chosenWords }) => {
      setCurrentDrawer(currentDrawer);
      setWords(chosenWords);
      setEtape(etapeEnCours);
    });

    socket.on("word_chosen", ({ etapeEnCours, word }) => {
      setEtape(etapeEnCours);
      setWords(word);
    });

    socket.on("victory", ({ winner, nextDrawer }) => {
      setEtape(3);
      setCurrentDrawer(winner); // On se sert du même state pour éviter de créer un state inutile

      setTimeout(() => {
        setRound(round + 1);

        if (nextDrawer.id === socket.id) {
          changerEtape(1, round + 1);
        }
      }, 5000);
    });

    return () => {
      socket.off("game_started");
      socket.off("word_chosen");
      socket.off("victory");
    };
  }, [round, socket]);

  return (
    <View style={styles.container}>
      <GameBar
        round={round}
        label={label}
        etape={etape}
        words={words}
        socket={socket}
        drawer={currentDrawer}
      />

      <GamePlayers />

      <GameCanvas
        socket={socket}
        roomID={roomID}
        room={room}
        etape={etape}
        round={round}
        changerEtape={changerEtape}
        words={words}
        setWords={setWords}
        setChatMessageAuto={setChatMessageAuto}
        drawer={currentDrawer}
      />

      <Chat
        socket={socket}
        roomID={roomID}
        profil={profil}
        chatMessageAuto={chatMessageAuto}
        setChatMessageAuto={setChatMessageAuto}
        drawer={currentDrawer}
        etape={etape}
      />

      <GameToolbar roomID={roomID} setChatMessageAuto={setChatMessageAuto} />
    </View>
  );
};

export default GameState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});

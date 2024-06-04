import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native";
import { Socket } from "socket.io-client";

interface Profil {
  username: string;
  color: string;
}

interface ChatProps {
  socket: Socket;
  roomID: number;
  profil: Profil;
  chatMessageAuto?: string;
  setChatMessageAuto: (message: string) => void;
  drawer: { id: string };
  etape: number;
}

interface Message {
  message: string;
  sender: Profil | { username: string };
}

const Chat: React.FC<ChatProps> = ({
  socket,
  roomID,
  profil,
  chatMessageAuto,
  setChatMessageAuto,
  drawer,
  etape,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");

  function sendMessage() {
    setMessages((messages) => [...messages, { message, sender: profil }]);
    socket.emit("message", { message, roomID, profil });
  }

  function sendGuess() {
    setMessages((messages) => [...messages, { message, sender: profil }]);
    socket.emit("guess", { message, roomID, guesser: { id: socket.id, profil } });
  }

  useEffect(() => {
    socket.on("receiveMessage", ({ receivedMessage, sender }) => {
      setMessages((messages) => [
        ...messages,
        { message: receivedMessage, sender },
      ]);
    });

    socket.on("close_to_guess", ({ guesser }) => {
      if (guesser.id === socket.id) {
        setChatMessageAuto("Vous êtes proche !");
      } else {
        setChatMessageAuto(guesser.profil.username + " est proche !");
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("close_to_guess");
    };
  }, [setChatMessageAuto, socket]);

  useEffect(() => {
    if (chatMessageAuto !== undefined && chatMessageAuto !== "") {
      setMessages((messages) => [
        ...messages,
        { message: chatMessageAuto, sender: { username: "Bot" } },
      ]);
    }
  }, [chatMessageAuto]);

  function handleSubmit() {
    if (etape === 2 && socket.id !== drawer.id) {
      sendGuess();
    } else {
      sendMessage();
    }
    setMessage("");
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            <Text style={{ color: item.sender.color, fontWeight: "bold" }}>
              {item.sender.username}:{" "}
            </Text>
            {item.message}
          </Text>
        )}
        style={styles.messagesContainer}
      />
      <TextInput
        style={styles.input}
        placeholder="Tapez votre message ici"
        onChangeText={setMessage}
        onSubmitEditing={handleSubmit}
        value={message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    padding: 10,
  },
  messagesContainer: {
    flex: 1,
  },
  input: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
});

export default Chat;

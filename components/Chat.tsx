import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Chat = ({
                  socket,
                  roomID,
                  profil,
                  chatMessageAuto,
                  setChatMessageAuto,
                  drawer,
                  etape,
              }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    function sendMessage() {
        setMessages((messages) => [...messages, { message, sender: profil }]);
        socket.emit("message", { message, roomID, profil });
    }

    function sendGuess() {
        setMessages((messages) => [...messages, { message, sender: profil }]);
        socket.emit("guess", { message, roomID, guesser: { id: socket.id, profil }});
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
    }, [setChatMessageAuto, socket]);

    useEffect(() => {
        if (chatMessageAuto !== undefined && chatMessageAuto !== "")
            setMessages((messages) => [
                ...messages,
                { message: chatMessageAuto, sender: { username: "Bot" } },
            ]);
    }, [chatMessageAuto, setChatMessageAuto]);

    function handleSubmit(e) {
        if (e.nativeEvent.key === "Enter") {
            if (etape === 2 && socket.id !== drawer.id) {
                sendGuess(message, roomID);
                setMessage("");
            } else {
                sendMessage(message, roomID);
                setMessage("");
            }
        }
    }

    return (
        <View style={styles.chatContainer}>
            <View style={styles.messageContainer}>
                {messages.map((message, index) => {
                    return (
                        <Text key={index} style={{ color: message.sender.color, fontWeight: 'bold' }}>
                            {message.sender.username}: {message.message}
                        </Text>
                    );
                })}
            </View>
            <TextInput
                style={styles.textInput}
                placeholder="Tapez votre message ici"
                onChangeText={(text) => {
                    setMessage(text);
                }}
                onKeyPress={handleSubmit}
                value={message}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
        overflow: 'hidden',
    },
    messageContainer: {
        flexDirection: 'column',
        padding: 10,
        overflow: 'scroll',
    },
    textInput: {
        height: 40,
        padding: 10,
        backgroundColor: '#ffffff',
    },
});

export default Chat;
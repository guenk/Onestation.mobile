import {useEffect, useState} from "react";
import {View} from "react-native";
import GameBar from "@/components/GameBar";
import GamePlayers from "@/components/GamePlayers";
import GameCanvas from "@/components/GameCanvas";
import Chat from "@/components/Chat";
import GameToolbar from "@/components/GameToolbar";
import { StyleSheet, Dimensions } from 'react-native';

export default function GameState({ socket,
                                      roomID,
                                      room,
                                      profil,
                                      messageAuto,
                                      setMessageAuto }) {
    const [etape, setEtape] = useState(0);
    const [round, setRound] = useState(1);
    const [label, setLabel] = useState("En attente");
    const [chatMessageAuto, setChatMessageAuto] = useState();
    const [words, setWords] = useState("");
    const [currentDrawer, setCurrentDrawer] = useState(null);

    function changerEtape(etapeEnCours, round, mot = null) {
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
        socket.on(
            "game_started",
            ({ etapeEnCours, currentDrawer, chosenWords }) => {
                setCurrentDrawer(currentDrawer);
                setWords(chosenWords);
                setEtape(etapeEnCours);
            },
        );

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
    }, []);

    return (
        <View style={styles.gameBoard}>
            <GameBar
                style={styles.gameBar}
                round={round}
                label={label}
                etape={etape}
                words={words}
                socket={socket}
                drawer={currentDrawer}
            ></GameBar>

            <GamePlayers style={styles.gamePlayers} socket={socket} roomID={roomID} />

            <GameCanvas
                style={styles.gameCanvas}
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
            ></GameCanvas>

            <Chat
                style={styles.gameChat}
                socket={socket}
                roomID={roomID}
                profil={profil}
                chatMessageAuto={chatMessageAuto}
                setChatMessageAuto={setChatMessageAuto}
                drawer={currentDrawer}
                etape={etape}
            ></Chat>

            <GameToolbar
                style={styles.gameToolbar}
                roomID={roomID}
                setChatMessageAuto={setChatMessageAuto}
            ></GameToolbar>
        </View>
    );
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    gameBoard: {
        flex: 1,
        flexDirection: width > height ? 'row' : 'column',
        justifyContent: 'space-between',
        gap: 10,
        margin: 10,
    },
    gameBar: {
        flex: 1,
        width: width > height ? '10%' : '100%',
    },
    gamePlayers: {
        flex: 1,
        width: width > height ? '10%' : '100%',
    },
    gameCanvas: {
        flex: 3,
        width: width > height ? '60%' : '100%',
    },
    gameChat: {
        flex: 1,
        width: width > height ? '10%' : '100%',
    },
    gameToolbar: {
        flex: 1,
    },
});
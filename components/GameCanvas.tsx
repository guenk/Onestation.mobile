import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import Canva from "@/components/Canva";

const GameCanvas = ({
                        socket,
                        roomID,
                        room,
                        etape,
                        round,
                        changerEtape,
                        words,
                        setWords,
                        setChatMessageAuto,
                        drawer,
                    }) => {
    function handleCustomWordsChange(value) {
        setWords(value.split(','));
    }

    function handleStartClick() {
        if (words.length < 10) {
            setChatMessageAuto('Ajoutez un minimum de 10 mots');
        } else {
            changerEtape(1, 1);
        }
    }

    function handleWordChosen(e) {
        changerEtape(2, round, e.target.textContent);
    }

    switch (etape) {
        case 0:
            return (
                <View style={styles.gameCanvas}>
                    {socket.id === room.creator ? (
                        <>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Ajouter un minimum de 10 mots, séparés par une , (virgule)"
                                value={words}
                                onChangeText={handleCustomWordsChange}
                            />
                            <Button title="Commencer" onPress={handleStartClick} />
                        </>
                    ) : (
                        <Text>En attente du propriétaire du jeu...</Text>
                    )}
                </View>
            );

        case 1:
            return (
                <View style={styles.gameCanvas}>
                    {drawer.id === socket.id ? (
                        <>
                            <Text>Choisissez un mot</Text>
                            <View style={styles.buttonContainer}>
                                {words.map((e, index) => {
                                    return (
                                        <Button
                                            title={e}
                                            onPress={handleWordChosen}
                                            key={index}
                                        />
                                    );
                                })}
                            </View>
                        </>
                    ) : (
                        <Text>{drawer.profil.username} est en train de choisir un mot...</Text>
                    )}
                </View>
            );

        case 2:
            return <Canva style={styles.gameCanvas} socket={socket} roomID={roomID} />;

        case 3:
            return (
                <View style={styles.gameCanvas}>
                    <Text>{drawer.profil.username} a gagné !</Text>
                </View>
            );
    }
};

const styles = StyleSheet.create({
    gameCanvas: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        justifyContent: 'center',
        gap: 10,
    },
    textInput: {
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default GameCanvas;
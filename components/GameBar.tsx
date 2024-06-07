import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameBar = ({ round, label, etape, words, socket, drawer }) => {
    if (etape === 2) {
        if (socket.id === drawer.id) {
            return (
                <View style={styles.gameBar}>
                    <Text>Round {round} sur 3</Text>
                    <View>
                        <Text>Dessinez ce mot</Text>
                        <Text style={styles.textCenterBold}>{words}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.gameBar}>
                    <Text>Round {round} sur 3</Text>
                    <View>
                        <Text>Devinez ce mot</Text>
                        <Text style={styles.textCenterBold}>
                            {[...words].map((letter, index) => {
                                if (letter === " ") {
                                    return <Text key={index}>&nbsp;&nbsp;</Text>;
                                } else {
                                    return " _ ";
                                }
                            })}
                        </Text>
                    </View>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    gameBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    textCenterBold: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default GameBar;
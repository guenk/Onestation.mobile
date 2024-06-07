import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const GameToolbar = ({ roomID, setChatMessageAuto }) => {
    async function copyToClipboard() {
        try {
            await Clipboard.setStringAsync("localhost:5173/?" + roomID);
            setChatMessageAuto("Lien d'invitation copié");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.gameToolbar}>
            <TextInput
                style={styles.textInput}
                value={"localhost:5173/?" + roomID}
                editable={false}
            />
            <Button
                title="Copier"
                onPress={copyToClipboard}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    gameToolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden',
    },
    textInput: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F1F5F9',
    }
});

export default GameToolbar;
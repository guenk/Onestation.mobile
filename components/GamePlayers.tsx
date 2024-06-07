import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../../redux/authActions";
import { View, Text, Image, StyleSheet } from 'react-native';

const GamePlayers = ({ socket, roomID }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.on("player_joined", ({ players }) => {
            setPlayers(players);
        });

        socket.on("player_left", ({ players }) => {
            setPlayers(players);
        })
    });

    // const dispatch = useDispatch();

    // Select player information from the Redux store
    // const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Update the player's id_role if necessary
    // useEffect(() => {
    //     if (user && user.id_role !== 3) {
    //         const { pseudo, email, avatar } = user;
    //         dispatch(updateUser(pseudo, email, avatar));
    //     }
    // }, [dispatch, user?.id_role, user?.pseudo, user?.email, user?.avatar]);
    //
    // if (!user) {
    //     return <Text>Loading...</Text>;
    // }

    return (
        <View style={styles.gamePlayers}>
            {
                players.length === 0 ? <Text>Loading...</Text> :
                players.map((player) => {
                    return (
                        <View key={player.id} style={styles.playerContainer}>
                            <Image
                                style={styles.playerImage}
                                source={{uri: `${process.env.VITE_BACKEND_URL}/static/${player?.profil.avatar?.split("/").pop()}`}}
                            />
                            <Text>{player.profil.username}</Text>
                        </View>
                    );
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    gamePlayers: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 10,
        alignItems: 'center',
    },
    playerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    playerImage: {
        height: 32,
        width: 32,
        borderRadius: 16,
    },
});

export default GamePlayers;
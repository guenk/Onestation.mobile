import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Canvas from 'react-native-canvas';

const Canva = ({socket, roomID}) => {
    const canvasRef = useRef(null);
    const [lines, setLines] = useState([]);
    const [color, setColor] = useState('#000000');
    const linesRef = useRef(lines);
    const [drawing, setDrawing] = useState(false);
    const [current, setCurrent] = useState({ x: 0, y: 0 });

    useEffect(() => {
        linesRef.current = lines;
    }, [lines]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const { locationX, locationY } = evt.nativeEvent;
                setDrawing(true);
                setCurrent({ x: locationX, y: locationY });
            },
            onPanResponderMove: (evt) => {
                if (!drawing) return;
                const { locationX, locationY } = evt.nativeEvent;
                drawLine(current.x, current.y, locationX, locationY, color, true);
                setCurrent({ x: locationX, y: locationY });
            },
            onPanResponderRelease: () => {
                setDrawing(false);
            },
        })
    ).current;

    useEffect(() => {
        const handleCanvas = async (canvas) => {
            const context = await canvas.getContext('2d');
            context.height = 500;

            let drawing = false;
            let current = { x: 0, y: 0 };

            const drawLine = (x0, y0, x1, y1, color, emit) => {
                context.beginPath();
                context.moveTo(x0, y0);
                context.lineTo(x1, y1);
                context.strokeStyle = color;
                context.lineWidth = 2;
                context.stroke();
                context.closePath();

                if (!emit) { return; }
                const w = canvas.width;
                const h = canvas.height;

                const line = { x0: x0 / w, y0: y0 / h, x1: x1 / w, y1: y1 / h, color };
                setLines(lines => [...lines, line]);

                socket.emit('drawing', {
                    roomID,
                    data: line,
                });
            };

            // ... rest of your code ...

            const redrawLines = () => {
                const w = canvas.width;
                const h = canvas.height;
                for (let line of linesRef.current) {
                    drawLine(line.x0 * w, line.y0 * h, line.x1 * w, line.y1 * h, line.color);
                }
            };

            redrawLines();
        };

        if (canvasRef.current) {
            handleCanvas(canvasRef.current);
        }
    }, [lines]);

    return (
        <View style={styles.canvaContainer} {...panResponder.panHandlers}>
            <Canvas ref={canvasRef} style={styles.canvas} />
        </View>
    );
};

const styles = StyleSheet.create({
    canvaContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 10,
        backgroundColor: '#F1F5F9',
    },
    canvas: {
        flex: 1,
    },
});

export default Canva;
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Box from "./components/box";

export default function App() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXChance, setIsXChance] = useState(true);
  const [winner, setWinner] = useState(null);

  function PlayBox(no) {
    return (
      <Box
        no={no}
        boxInfo={{ boxes, setBoxes }}
        chance={{ isXChance, setIsXChance }}
        winner={winner}
      />
    );
  }

  const winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function calculateWinner() {
    for (let i = 0; i < winPosition.length; i++) {
      if (
        boxes[winPosition[i][0]] !== null &&
        boxes[winPosition[i][0]] === boxes[winPosition[i][1]] &&
        boxes[winPosition[i][0]] === boxes[winPosition[i][2]]
      ) {
        setWinner(boxes[winPosition[i][0]]);
        return;
      }
      else if (!boxes.includes(null)) {
        setWinner("No one");
      }
    }
  }

  useEffect(() => {
    calculateWinner();
  }, [isXChance]);

  function resetValues() {
    setWinner(null);
    setBoxes(Array(9).fill(null));
    setIsXChance(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="orange" />
      <View style={styles.featureContainer}>
        {winner !== null ? (
          <Text style={[styles.primaryText, styles.winnerText]}>
            {winner} WON
          </Text>
        ) : (
          <Text style={styles.primaryText}>
            Chance: {isXChance ? "X" : "O"}
          </Text>
        )}
        <Ionicons
          style={styles.resetIcon}
          name="reload-circle"
          size={38}
          color="black"
          onPress={resetValues}
        ></Ionicons>
      </View>
      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayBox(0)}
          {PlayBox(1)}
          {PlayBox(2)}
        </View>
        <View style={styles.rows}>
          {PlayBox(3)}
          {PlayBox(4)}
          {PlayBox(5)}
        </View>
        <View style={styles.rows}>
          {PlayBox(6)}
          {PlayBox(7)}
          {PlayBox(8)}
        </View>
      </View>
      <View style={{marginVertical:25}}>
      {winner && ( // This condition ensures the button is only shown when there's a winner or a draw
        <Button onPress={resetValues} title="Play Again" color="orange" />
      )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00008B",
    alignItems: "center",
    justifyContent: "center",
  },
  playBoard: {
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 10,
  },
  rows: {
    flexDirection: "row",
  },
  featureContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  primaryText: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  winnerText: {
    color: "darkorange",
    fontSize: 48,
  },
});

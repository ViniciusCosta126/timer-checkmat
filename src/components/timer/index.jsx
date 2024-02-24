import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Hours from "../hours";

const Timer = () => {
  const [active, setActive] = useState(0);
  const [visibilities, setVisibilities] = useState([true, true, true]);
  const [visibleCount, setVisibleCount] = useState(0);
  
  const startTimer = () => {
    setActive(1);
    setVisibleCount(1);
    setVisibilities([true, false, false]);
  };

  const onComplete = () => {
    const newActive = active + 1;
    setActive(newActive);

    if (newActive >= 2 && newActive <= 3) {
      const newVisibilities = visibilities.map((v, index) => index === newActive - 1);
      setVisibilities(newVisibilities);
      setVisibleCount(newVisibilities.filter(Boolean).length);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
      {[1, 2, 3].map((index) => (
          <Hours
            key={index}
            titulo={index === 1 ? "Preparação" : index === 2 ? "Round" : "Descanso"}
            active={active === index}
            visible={visibilities[index - 1]}
            complete={onComplete}
            totalComponents={visibleCount}
          />
        ))}
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity title="Start" onPress={() => startTimer()}>
          <Icon name="play" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity title="Pause">
          <Icon name="pause" size={40} color="black" disabled={active === 0} />
        </TouchableOpacity>
        <TouchableOpacity title="Recomecar">
          <Icon name="undo" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center", // Centraliza os itens verticalmente
    padding: 16,
  },
  timerContainer: {
    flex: 5,
    justifyContent: "center", // Centraliza os itens verticalmente
    alignItems: "center",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end", // Alinha no final do eixo vertical
    flex: 1, // Usa todo o espaço disponível
    gap: 30,
  },
});

export default Timer;

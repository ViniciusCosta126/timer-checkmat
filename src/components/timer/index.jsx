import React, { useState} from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Hours from "../hours";

const Timer = () => {
  const [active, setActive] = useState(0);
  const [visibilities, setVisibilities] = useState([true, true, true]);
  const [visibleCount, setVisibleCount] = useState(0);
  const [round, setRound] = useState(1);
  const [isPause, setIsPause] = useState(false);

  const startTimer = () => {
    if (isPause && active !== 0) {
      setIsPause(false);
    } else {
      setActive(1);
      setVisibleCount(1);
      setVisibilities([true, false, false]);
    }
  };

  const restartTimer = () => {
    setActive(0);
    setVisibleCount(0);
    setRound(1);
    setVisibilities([true, true, true]);
    setIsPause(false)
  };

  const pauseTimer = () => {
    setIsPause(true);
  };

  const onComplete = () => {
    var newActive = active + 1;
    if (newActive === 4) {
      newActive = 2;
      var newRound = round + 1;
      setRound(newRound);
      setActive(newActive);
    } else {
      setActive(newActive);
    }

    if (newActive >= 2 && newActive <= 3) {
      const newVisibilities = visibilities.map(
        (v, index) => index === newActive - 1
      );
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
            titulo={
              index === 1 ? "Preparação" : index === 2 ? "Round" : "Descanso"
            }
            active={active === index}
            visible={visibilities[index - 1]}
            complete={onComplete}
            totalComponents={visibleCount}
            round={round}
            bgColor={
              index === 1 ? "#FDE12D" : index === 2 ? "#209443" : "#C40202"
            }
            paused={isPause}
          />
        ))}
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity title="Start" onPress={() => startTimer()}>
          <Icon name="play" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity title="Pause" onPress={() => pauseTimer()}>
          <Icon name="pause" size={40} color="black" disabled={active === 0} />
        </TouchableOpacity>
        <TouchableOpacity title="Recomecar" onPress={() => restartTimer()}>
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
  },
  timerContainer: {
    flex: 1,
    justifyContent: "center", // Centraliza os itens verticalmente
    alignItems: "center",
    paddingBottom: 30,
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end", // Alinha no final do eixo vertical
    flex: 0.5, // Usa todo o espaço disponível
    gap: 30,
    position: "absolute",
    left: "50%",
    bottom: 12,
    transform: [{ translateX: -80 }],
  },
});

export default Timer;

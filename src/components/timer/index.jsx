import React, { useState,useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Hours from "../hours";

const Timer = () => {
  const [active, setActive] = useState(0);
    const [visible,setVisible] = useState(true)
  const startTimer = () => {
    setActive(1);
  };

  const onComplete = () => {
    setActive(active + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Hours  tittulo={"Preparação"} active={active === 1} complete={onComplete}/>
        <Hours  tittulo={"Round"} active={active === 2} complete={onComplete} />
        <Hours  tittulo={"Descanso"} active={active === 3} complete={onComplete} />
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity title="Start" onPress={()=>startTimer()}>
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

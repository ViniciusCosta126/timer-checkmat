import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AdjustTimer = ({
  dezena,
  unidade,
  setDezena,
  setUnidade,
  unidadeMedida,
}) => {
  const increaseTime = (tipo) => {
    if (unidadeMedida === "minuto" || unidadeMedida === "segundo") {
      if (tipo === "dezena") {
        if (dezena + 1 >= 6) {
          setDezena(0);
        } else {
          setDezena(dezena + 1);
        }
      } else {
        if (unidade + 1 >= 10) {
          setUnidade(0);
        } else {
          setUnidade(unidade + 1);
        }
      }
    } else{
        if(tipo === 'dezena'){
            if(dezena + 1 >= 3){
                setDezena(0);
            } else{
                setDezena(dezena + 1);
            }
        } else{
            if(unidade + 1 >= 5){
                setUnidade(0)
            }else{
                setUnidade(unidade + 1)
            }
        }
    }
  };

  const decreaseTime = (tipo) => {
    if (unidadeMedida === "minuto" || unidadeMedida === "segundo") {
      if (tipo === "dezena") {
        if (dezena - 1 < 0) {
          setDezena(5);
        } else {
          setDezena(dezena - 1);
        }
      } else {
        if (unidade - 1 < 0) {
          setUnidade(9);
        } else {
          setUnidade(unidade - 1);
        }
      }
    } else {
      if (tipo === "dezena") {
        if (dezena - 1 < 0) {
          setDezena(2);
        } else {
          setDezena(dezena - 1);
        }
      } else {
        if (unidade - 1 < 0) {
          setUnidade(4);
        } else {
          setUnidade(unidade - 1);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => increaseTime("dezena")}>
          <Icon name="sort-up" size={60} />
        </TouchableOpacity>
        <Text style={styles.textHour}>{dezena}</Text>
        <TouchableOpacity onPress={() => decreaseTime("dezena")}>
          <Icon name="sort-down" size={60} />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => increaseTime("unidade")}>
          <Icon name="sort-up" size={60} />
        </TouchableOpacity>
        <Text style={styles.textHour}>{unidade}</Text>
        <TouchableOpacity onPress={() => decreaseTime("unidade")}>
          <Icon name="sort-down" size={60} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  iconsContainer: {
    alignItems: "center",
  },
  textHour: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});

export default AdjustTimer;

import React, { useState, useEffect, useRef } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AdjustTimer from "../adjustTimer";
import { useInitialValues } from "../../context/InitialValuesContext";

const Hours = ({
  titulo,
  active,
  complete,
  visible,
  totalComponents,
  bgColor,
  round,
  paused
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [unidadeHoras, setUnidadeHoras] = useState(0);
  const [dezenaHoras, setDezenaHoras] = useState(0);
  const [unidadeMinutos, setUnidadeMinutos] = useState(0);
  const [dezenaMinutos, setDezenaMinutos] = useState(0);
  const [unidadeSegundos, setUnidadeSegundos] = useState(0);
  const [dezenaSegundos, setDezenaSegundos] = useState(0);
  const { valorPrep, valorRound, valorDescanso, updateValores } =
    useInitialValues();

  const styles = StyleSheet.create({
    singleComponent: {
      borderColor: bgColor,
      borderWidth: 2,
      backgroundColor: bgColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      width: 300,
      height: 150,
    },
    container: {
      justifyContent: "center",
      alignItems: "center",
    },
    btn: {
      textAlign: "center",
    },
    button: {
      fontSize: 18,
      color: "#000",
      textAlign: "center",
      marginTop: 6,
      fontWeight: "bold",
    },
    buttonSingle: {
      fontSize: 24,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      elevation: 5,
      height: 260,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButton: {
      marginTop: 10,
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
      backgroundColor: "#209443",
      width: 260,
      padding: 10,
      marginTop: 10,
      textAlign: "center",
      borderRadius: 10,
    },
    adjustContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 26,
    },
    hourContainer: {
      justifyContent: "center",
      alignItems: "center",
      justifyContent: "center",
      width: 70,
    },
    adjustTimer: {
      flexDirection: "row",
      alignItems: "center",
    },
    titleHour: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#000",
    },
  });


  const handleInitialValue = () => {
    updateValores(
      titulo,
      `${dezenaHoras} ${unidadeHoras} ${dezenaMinutos} ${unidadeMinutos} ${dezenaSegundos} ${unidadeSegundos}`
    );
  };
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const calculateTotalSeconds = () => {
    return (
      dezenaHoras * 10 +
      unidadeHoras * 1 +
      dezenaMinutos * 600 +
      unidadeMinutos * 60 +
      dezenaSegundos * 10 +
      unidadeSegundos * 1
    );
  };

  // Função para atualizar as unidades e dezenas de horas, minutos e segundos
  const updateTimer = () => {
    const totalSeconds = calculateTotalSeconds();
    if (active) {
      if (totalSeconds > 0) {
        const newTotalSeconds = totalSeconds - 1;
        if (newTotalSeconds === 0) {
          setTimeout(()=>complete(),1000)
          // Chama a função complete imediatamente quando o timer atinge zero
        }

        const newDezenaHoras = Math.floor(newTotalSeconds / 36000);
        const newUnidadeHoras = Math.floor((newTotalSeconds % 36000) / 3600);
        const newDezenaMinutos = Math.floor((newTotalSeconds % 3600) / 600);
        const newUnidadeMinutos = Math.floor((newTotalSeconds % 600) / 60);
        const newDezenaSegundos = Math.floor((newTotalSeconds % 60) / 10);
        const newUnidadeSegundos = Math.floor(newTotalSeconds % 10);

        setDezenaHoras(newDezenaHoras);
        setUnidadeHoras(newUnidadeHoras);
        setDezenaMinutos(newDezenaMinutos);
        setUnidadeMinutos(newUnidadeMinutos);
        setDezenaSegundos(newDezenaSegundos);
        setUnidadeSegundos(newUnidadeSegundos);
      }
    }
    
  };

  useEffect(() => {
    if (active && round > 1) {
      voltRound();
    }
  }, [round, active]);

  // Hook useEffect para atualizar o timer a cada segundo
  useEffect(() => {
    if(paused) {
      return;
    }
    const timerInterval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(timerInterval); // Limpar o intervalo quando o componente for desmontado
  }, [
    dezenaHoras,
    unidadeHoras,
    dezenaMinutos,
    unidadeMinutos,
    dezenaSegundos,
    unidadeSegundos,
    active,
    paused
  ]);

  const voltRound = () => {
    var novosValores;
    switch (titulo) {
      case "Preparação":
        novosValores = valorPrep.split(" ").map((tempo) => parseInt(tempo));
        console.log(`Round ${round} - Preparação: ${novosValores}`);
        break;
      case "Round":
        novosValores = valorRound.split(" ").map((tempo) => parseInt(tempo));
        console.log(`Round ${round} - Round: ${novosValores}`);
        break;
      case "Descanso":
        novosValores = valorDescanso.split(" ").map((tempo) => parseInt(tempo));
        console.log(`Round ${round} - Descanso: ${novosValores}`);
        break;
    }

    setDezenaHoras(novosValores[0]);
    setUnidadeHoras(novosValores[1]);
    setDezenaMinutos(novosValores[2]);
    setUnidadeMinutos(novosValores[3]);
    setDezenaSegundos(novosValores[4]);
    setUnidadeSegundos(novosValores[5]);
  };

  return (
    <View>
      {visible && (
        <View
          style={[
            styles.container,
            totalComponents === 1 && styles.singleComponent,
          ]}
        >
          <TouchableOpacity disabled={active ? true : false} style={styles.btn} onPress={openModal}>
            <Text
              style={[
                styles.button,
                totalComponents === 1 && styles.buttonSingle,
              ]}
            >
              {titulo}
            </Text>
            <Text
              style={[
                styles.button,
                totalComponents === 1 && styles.buttonSingle,
              ]}
            >
              {`${dezenaHoras}${unidadeHoras}`}:
              {`${dezenaMinutos}${unidadeMinutos}`}:
              {`${dezenaSegundos}${unidadeSegundos}`}
            </Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View>
              <View style={styles.modalContent}>
                <View style={styles.adjustContainer}>
                  <View style={styles.hourContainer}>
                    <Text style={styles.titleHour}>Hora</Text>
                    <AdjustTimer
                      setDezena={setDezenaHoras}
                      setUnidade={setUnidadeHoras}
                      dezena={dezenaHoras}
                      unidade={unidadeHoras}
                      initialValue={handleInitialValue}
                    />
                  </View>

                  <View style={styles.hourContainer}>
                    <Text style={styles.titleHour}>Minuto</Text>
                    <AdjustTimer
                      setDezena={setDezenaMinutos}
                      setUnidade={setUnidadeMinutos}
                      dezena={dezenaMinutos}
                      unidade={unidadeMinutos}
                      unidadeMedida={"minuto"}
                      initialValue={handleInitialValue}
                    />
                  </View>

                  <View style={styles.hourContainer}>
                    <Text style={styles.titleHour}>Segundo</Text>
                    <AdjustTimer
                      setDezena={setDezenaSegundos}
                      setUnidade={setUnidadeSegundos}
                      dezena={dezenaSegundos}
                      unidade={unidadeSegundos}
                      initialValue={handleInitialValue}
                      unidadeMedida={"segundo"}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.closeButton}>Aplicar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default Hours;

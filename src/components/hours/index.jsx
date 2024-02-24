import React, { useState, useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AdjustTimer from "../../adjustTimer";

const Hours = ({ titulo, active, complete, visible, totalComponents }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [unidadeHoras, setUnidadeHoras] = useState(0);
  const [dezenaHoras, setDezenaHoras] = useState(0);
  const [unidadeMinutos, setUnidadeMinutos] = useState(0);
  const [dezenaMinutos, setDezenaMinutos] = useState(0);
  const [unidadeSegundos, setUnidadeSegundos] = useState(0);
  const [dezenaSegundos, setDezenaSegundos] = useState(0);

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
          complete(); // Chama a função complete imediatamente quando o timer atinge zero
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

  // Hook useEffect para atualizar o timer a cada segundo
  useEffect(() => {
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
  ]);

  return (
    <View>
      {visible && (
        <View style={[styles.container,totalComponents === 1 && styles.singleComponent]}>
          <TouchableOpacity style={styles.btn} onPress={openModal}>
            <Text style={styles.button}>{titulo}</Text>
            <Text style={styles.button}>
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
                    />
                  </View>

                  <View style={styles.hourContainer}>
                    <Text style={styles.titleHour}>Segundo</Text>
                    <AdjustTimer
                      setDezena={setDezenaSegundos}
                      setUnidade={setUnidadeSegundos}
                      dezena={dezenaSegundos}
                      unidade={unidadeSegundos}
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

const styles = StyleSheet.create({
  singleComponent: {
    borderColor: "rgb(0,0,0)",
    borderWidth: 2,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 200,
    height: 200,
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
    backgroundColor: "#6FD08C",
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
export default Hours;

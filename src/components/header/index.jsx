import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet} from "react-native";

const index = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Função para obter a data e o horário atual
    const getCurrentDate = () => {
      const date = new Date();
      const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      const timeString = date.toLocaleTimeString('pt-BR', options);// Obtém a data e o horário formatados como string
      setCurrentDate(timeString);
    };

    getCurrentDate();

    // Atualiza a data a cada segundo (opcional)
    const intervalId = setInterval(getCurrentDate, 1000);

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{currentDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000',
      color:'#fff',
      padding:8
    },
    text:{
        color:"#fff",
        fontSize:20,
        fontWeight:"bold"
    }
})

export default index;

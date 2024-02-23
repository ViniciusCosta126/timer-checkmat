import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Timer from './src/components/timer/index.jsx';
import Header from './src/components/header/index.jsx';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.containerTimer}>
        <Image style={styles.img1} source={require('./assets/logo-checkmat-araraquara.png')}/>
        <Timer />
        <Image style={styles.img2} source={require('./assets/logo-checkmat.png')}/>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerTimer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  img1:{
    width: 200,
    height: 200,
    objectFit:'contain',
    position:'absolute',
    zIndex:10,
    left: 0,
  },
  img2:{
    width: 150,
    height: 150,
    objectFit:'contain',
    position:'absolute',
    right: 10,
  }
});

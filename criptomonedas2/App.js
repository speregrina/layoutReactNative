import React,{useState, useEffect} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';


const App = () => {
  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptoMoneda] = useState('');
  const [consultarApi, guardarConsultarApi] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] =  useState(false);

  useEffect( ()=> {
   
      const cotizarCriptomoneda =  async () => {
        if(consultarApi) {
          //console.log('Listo para consultar..');
          const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsym=${criptomoneda}&tsyms=${moneda}`;
          const resultado = await axios.get(url);
          //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
          guardarCargando(true);

          //Ocultar el spinner y mostrar el resultado
          setTimeout( () => {
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
            guardarConsultarApi(false);
            guardarCargando(false);
          }, 3000);
          
        }
       }
       cotizarCriptomoneda();
  },[consultarApi]);

  const componente = cargando ? <ActivityIndicator  size="large" color="5E49E2" /> : <Cotizacion resultado={resultado}/>;

  return (
    <>
    <ScrollView>
    <Header />
    <Image 
    source={ require('./assets/img/cryptomonedas.png')}
    style={ styles.imagen} />

    <View style={styles.contenido}>
      <Formulario 
      moneda={moneda}
      guardarMoneda={guardarMoneda}
      criptomoneda={criptomoneda}
      guardarCriptoMoneda={guardarCriptoMoneda}
      guardarConsultarApi={guardarConsultarApi}
      />
    </View>
    <View style={{marginTop:40}}>
      {componente}
      </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  }, 
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;

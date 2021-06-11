import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, guardarMoneda, criptomoneda, guardarCriptoMoneda, guardarConsultarApi}) => {


    const [criptomonedas, guardarCriptoMonedas] = useState([]);

    useEffect( ()=> {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptoMonedas(resultado.data.Data);
            //console.log(resultado);
        }
        consultarApi();
    }, []);

    //save user options
    const obtenermoneda = moneda => {
        //console.log(moneda);
        guardarMoneda(moneda);
    }
    const obtenercriptomoneda = cripto => {
        //console.log(cripto)
        guardarCriptoMoneda(cripto);
    }

    const cotizarPrecio= () => {
        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            mostrarAlerta();
            return;
        }

        //Se pasa la validacion
        console.log('cotizando...');
        guardarConsultarApi(true);
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos Campos son obligatorios',
            [
                { text: 'OK'}
            ]
        );
    }

    return ( 

    <View>
       <Text style={styles.label}>Moneda</Text>
        <Picker 
            selectedValue={moneda}
            onValueChange={moneda => obtenermoneda(moneda)}
            itemStyle={{height: 120}}
            >
            <Picker.Item label="-seleccione-" value=""/>
            <Picker.Item label="Dolar Americano" value="USD"/>
            <Picker.Item label="Peso Méxicano" value="MXN"/>
            <Picker.Item label="Euro" value="EUR"/>
            <Picker.Item label="Libra Esterlina" value="GBP"/>
        </Picker>

        <Text style={styles.label}> Criptomoneda </Text>
        <Picker 
            selectedValue={criptomoneda}
            onValueChange={cripto => obtenercriptomoneda(cripto)}
            itemStyle={{height: 120}}
            >
            <Picker.Item label="-seleccione-" value=""/>
            { criptomonedas.maps( cripto => (
                <Picker.Item  key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name}/>
            )) }
        </Picker>

        <TouchableHighlight
            style={styles.btnCotizar}
            onPress={ () => cotizarPrecio()}
        >
            <Text style={styles.textoCotizar}>
                Cotizar
            </Text>
        </TouchableHighlight>
    </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
    },
    textoCotizar:{
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});

export default Formulario;
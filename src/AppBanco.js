import React, {Component} from 'react';
import {ToastAndroid,Button, StyleSheet, Text, TextInput, Picker, View, Switch, CheckBox, Slider} from 'react-native';
export default class AppBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moneda:1,
            capitalInicial:0,
            capitalFinal:0,
            dias:0,
            switchStatus:false,
            checkBoxStatus:false,
            tasaInteres:0.0,
            resultado:"[[ RESULTADO DE LA OPERACION ]]"
        };
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
        this.calcularInteres = this.calcularInteres.bind(this);
    }
    hacerPlazoFijo(){
        //ToastAndroid.show('Presiono el boton de hacer plazo fijo!', ToastAndroid.LONG);
        this.calcularInteres();
        //console.log(this.state.tasaInteres);
        const auxState = this.state;
        let interes = auxState.capitalInicial * (Math.pow(1+(auxState.tasaInteres),auxState.dias/360)-1);
        auxState.capitalFinal = auxState.capitalInicial + interes;
        auxState.resultado = "Al cabo de " + auxState.dias + " días obrendra $" + auxState.capitalFinal;
        this.setState(auxState);
        console.log(this.state);
        ToastAndroid.show('Tasa de Interes: ' + this.state.tasaInteres, ToastAndroid.LONG);
    }

    calcularInteres(){
        console.log("Entramos en calcularInteres");
        const auxState = this.state;
        let auxTasaInteres = 0;
        if(auxState.capitalInicial<5000){
            if(auxState.dias<30){
                auxTasaInteres=0.25;
            }else{
                auxTasaInteres=0.275;
            }
        }else{
            if(auxState.capitalInicial<99999){
                if(auxState.dias<30){
                    auxTasaInteres=0.30
                    
                }else{
                    auxTasaInteres=0.323;
                }
            }else{
                if(auxState.dias<30){
                    auxTasaInteres=0.35;
                }else{
                    auxTasaInteres=0.385;
                }
            }
        }
        //console.log(auxTasaInteres);
        auxState.tasaInteres=auxTasaInteres;
        this.setState(auxState);
    }
    
    procesarInput(name,value){
        this.setState({name:value});
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>Correo Electronico</Text>
            <TextInput
                placeholder="correo@mail.com"
                keyboardType={"email-address"}
                textContentType={"emailAddress"}/>
            <Text>CUIT</Text>
            <TextInput
                placeholder="00-00000000-0"
                keyboardType={"numeric"}/>
            <Text>Moneda</Text>
            <Picker
                style={{width: 200}}
                selectedValue={this.state.moneda}
                onValueChange={(valor) => this.setState({moneda:valor})}>
                <Picker.Item label="Dolar" value="1" />
                <Picker.Item label="Pesos ARS" value="2" />
            </Picker>
            <Text>Monto</Text>
            <TextInput
                placeholder="000"
                keyboardType={"decimal-pad"}
                onChangeText={(value) => this.setState({capitalInicial:Number(value)})}/>
            <Text>Dias</Text>
            <Slider 
                minimumValue={1}
                maximumValue={365}
                step={1}
                onValueChange={(valor) => this.setState({dias:valor})}
                style={{width: 200}}>
            </Slider>
            <Text>{this.state.dias} días</Text>
            <Text>Avisar por mail</Text>
            <Switch
                title="Avisar por email"
                value={this.state.switchStatus}
                onValueChange={(value) => this.setState({switchStatus:value})}/>
            <Text>Acepto condiciones</Text>
            <CheckBox 
                title='Acepto condiciones'
                value={this.state.checkBoxStatus}
                onValueChange={(value) => this.setState({checkBoxStatus:value})}/>
            <Button 
                title="Hacer Plazo Fijo"
                color="#FF0000"
                onPress={this.hacerPlazoFijo}/>
            <Text>{this.state.resultado}</Text>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
 });
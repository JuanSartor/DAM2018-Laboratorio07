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
            tasaInteres:0.0
        };
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
        this.calcularInteres = this.calcularInteres.bind(this);
    }
    hacerPlazoFijo(){
        //ToastAndroid.show('Presiono el boton de hacer plazo fijo!', ToastAndroid.LONG);
        this.calcularInteres();
        console.log("Exit"+this.state.tasaInteres);
        let interes = this.state.capitalInicial * (Math.pow(1+(this.state.tasaInteres/100),this.state.dias/360)-1);
        this.setState({capitalFinal:(this.state.capitalInicial+interes)});
        console.log(this.state);
        ToastAndroid.show('Tasa de Interes: ' + this.state.tasaInteres, ToastAndroid.LONG);
    }

    calcularInteres(){
        console.log("Entramos en calcularInteres");
        let auxTasaInteres = this.state.tasaInteres;
        if(this.state.capitalInicial<5000){
            if(this.state.dias<30){
                auxTasaInteres=0.25;
                //this.setState({tasaInteres:0.25});
                console.log(auxTasaInteres);
            }else{
                auxTasaInteres=0.275;
                //this.setState({tasaInteres:0.275});
                console.log(auxTasaInteres);
            }
        }else{
            if(this.state.capitalInicial<99999){
                if(this.state.dias<30){
                    auxTasaInteres=0.30
                    //this.setState({tasaInteres:0.30});
                    console.log(auxTasaInteres);
                }else{
                    auxTasaInteres=0.323;
                    //this.setState({tasaInteres:0.323});
                    console.log(auxTasaInteres);
                }
            }else{
                if(this.state.dias<30){
                    auxTasaInteres=0.35;
                    //this.setState({tasaInteres:0.35});
                    console.log(auxTasaInteres);
                }else{
                    auxTasaInteres=0.385;
                    //this.setState({tasaInteres:0.385});
                    console.log(auxTasaInteres);
                }
            }
        }
        this.setState({tasaInteres:auxTasaInteres});
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
            <Text>[[ RESULTADO DE LA OPERACION ]]</Text>
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
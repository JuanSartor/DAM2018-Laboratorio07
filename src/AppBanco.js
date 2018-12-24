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
            resultado:"[[ RESULTADO DE LA OPERACION ]]",
            email:"",
            cuit:""
        };
        this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
        this.calcularInteres = this.calcularInteres.bind(this);
    }
    
    hacerPlazoFijo(){
        let correoExpReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let cuitExpReg = /^[0-9]{2}-[0-9]{8}-[0-9]{1}$/;

        if(correoExpReg.test(this.state.email)){
            //console.log('Correo valido');
            if(cuitExpReg.test(this.state.cuit)){
                //console.log('CUIT valido');
                if(this.state.checkBoxStatus){
                    //ToastAndroid.show('Presiono el boton de hacer plazo fijo!', ToastAndroid.LONG);
                    this.calcularInteres();
                    //console.log(this.state.tasaInteres);
                    const auxState = this.state;
                    let interes = auxState.capitalInicial * (Math.pow(1+(auxState.tasaInteres),auxState.dias/360)-1);
                    let divisa;
                    if (auxState.moneda==1){
                        divisa = "U$S";
                    }else{
                        divisa = "AR$"
                    }
                    auxState.capitalFinal = auxState.capitalInicial + interes;
                    auxState.resultado = "Al cabo de " + auxState.dias + " días obrendra " + divisa + " " + auxState.capitalFinal.toFixed(2);
                    this.setState(auxState);
                    console.log(this.state);
                    //ToastAndroid.show('Tasa de Interes: ' + this.state.tasaInteres, ToastAndroid.LONG);
                }else{
                    ToastAndroid.show('Debe aceptar los terminos y condiciones', ToastAndroid.LONG);
                }
            }else{
                //console.log('CUIT invalido');
                ToastAndroid.show('Debe ingresar un CUIT valido', ToastAndroid.LONG);
            }
        }else{
            //console.log('Correo invalido');
            ToastAndroid.show('Debe Ingresar un correo valido', ToastAndroid.LONG);
        }
        
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

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Banco Movil</Text>
            <Text style={styles.title}>Correo Electronico</Text>
            <TextInput
                style={styles.content}
                placeholder="correo@mail.com"
                keyboardType={"email-address"}
                textContentType={"emailAddress"}
                onChangeText={(value) => this.setState({email:value})}/>
            <Text style={styles.title}>CUIT</Text>
            <TextInput
                style={styles.content}
                placeholder="00-00000000-0"
                keyboardType={"numeric"}
                onChangeText={(value) => this.setState({cuit:value})}/>
            <Text style={styles.title}>Moneda</Text>
            <Picker
                style={{width: 200}}
                selectedValue={this.state.moneda}
                onValueChange={(valor) => this.setState({moneda:valor})}>
                <Picker.Item label="Dolar" value="1" />
                <Picker.Item label="Pesos ARS" value="2" />
            </Picker>
            <Text style={styles.title}>Monto</Text>
            <TextInput
                style={styles.content}
                placeholder="000"
                keyboardType={"decimal-pad"}
                onChangeText={(value) => this.setState({capitalInicial:Number(value)})}/>
            <Text style={styles.title}>Dias</Text>
            <Slider 
                minimumValue={1}
                maximumValue={365}
                step={1}
                onValueChange={(valor) => this.setState({dias:valor})}>
            </Slider>
            <Text>{this.state.dias} días</Text>
            <Text style={styles.title}>Avisar por e-Mail</Text>
            <Switch
                //title="Avisar por email"
                style={{alignSelf:"flex-start"}}
                value={this.state.switchStatus}
                onValueChange={(value) => this.setState({switchStatus:value})}/>
            <Text style={styles.title}>Acepto condiciones</Text>
            <CheckBox 
                title='Acepto condiciones'
                value={this.state.checkBoxStatus}
                onValueChange={(value) => this.setState({checkBoxStatus:value})}/>
            <Button 
                title="Hacer Plazo Fijo"
                color="#FF0000"
                onPress={this.hacerPlazoFijo}/>
            <Text style={styles.result}>{this.state.resultado}</Text>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    title:{
        fontSize: 18,
        textAlign: 'left',
    },
    content:{
        fontSize: 15,
        textAlign: 'left',
        color:'#808080',
    },
    result:{
        fontSize:15,
        margin:10
    }
 });
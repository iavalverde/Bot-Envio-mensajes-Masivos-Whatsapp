const qrcode = require('qrcode-terminal');
const { Client} = require('whatsapp-web.js');
const dialogflow = require('@google-cloud/dialogflow').v2beta1;
const client = new Client();


client.on('qr', qr => {//genera el codigo qr
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Ahora estas Conectado');
    let api = process.env.APIKEY || 'http://192.168.220.237:8448/auth/prueba1/';
        fetch(api)
        .then(response => response.json())
        .then((json) => {
        let numeros_celular=json.map(d=>{
            let numeroCelular=d.celular+"";
                numeroCelular =numeroCelular.replace(/\D/g, "");
                numeroCelular=numeroCelular+"@c.us";
                console.log(numeroCelular);
                return{nombre:d.nombre,celular:numeroCelular,fechaRegistro:d.fechaRegistro,manifiesto:d.manifiesto}
            });
            var number_array = numeros_celular;
                number_array.forEach(element => console.log(element));
                number_array.forEach(element =>{
                let nombre=element.nombre;
                let fechaRegistro=element.fechaRegistro;
                let manifiesto=element.manifiesto;
                let text = "Buen dia estimado conductor "+nombre+"!"+"\n"+"\n"+"Recuerde realizar los servicio en la aplicacion vigia conductor, creado el dia "+fechaRegistro+" con numero de manifiesto "+manifiesto;
                senf_numeber (element.celular,text)
            });

            function senf_numeber (numeroCelular,text) {
                client.isRegisteredUser(numeroCelular).then(function(isRegistered) {//valida que el numero exista
                    if(isRegistered) {
                    console.log(numeroCelular+' Registrado');
                    client.sendMessage(numeroCelular, (text));
                    }else{
                    console.log(numeroCelular+' No Registrado');
                }
            })
        }  
    });
});
client.initialize();
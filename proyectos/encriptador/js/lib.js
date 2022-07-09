// Constantes para encriptador
const mensajeIN = document.getElementById("mensajeIN");
const mensajeOUT = document.getElementById("mensajeOUT");
const matrizEncriptada = [["e", "enter"],["i", "imes"],["a", "ai"],["o", "ober"],["u", "ufat"]];

// Constantes para efectos visuales
const ventanaEntrada = document.getElementById("mensajeEntrada");
const ventanaSalida = document.getElementById("mensajeSalida");


function encriptarBtn(){

    if(mensajeIN.value != ""){
        const textoEncriptado = encriptador(mensajeIN.value, true); 
        mensajeOUT.value = textoEncriptado;

        ventanaSalida.className = " mensajeSalida paneles animate__animated animate__flipInX";

        ventanaSalida.style.display = 'block';
        ventanaEntrada.style.display = 'none';
        
    }else{
        
        alert("Ingresa por favor el texto a encriptar.");
    }
}

function descencriptarBtn(){

    if (mensajeIN.value != ""){
        const textoEncriptado = encriptador(mensajeIN.value, false); 
        mensajeOUT.value = textoEncriptado;
    
        ventanaEntrada.className = " mensajeEntrada paneles animate__animated animate__flipInX";
        ventanaSalida.className = " mensajeSalida paneles animate__animated animate__flipInX";
    
        ventanaSalida.style.display = 'block';
        ventanaEntrada.style.display = 'none'
    }else{
        alert("Por favor pega el texto a descencriptar.");
    }
    
}

function copiarBtn(){

    let content = document.getElementById("mensajeOUT");

    content.select();
    document.execCommand("copy");
    
    alert("¡Mensaje copiado!");

    mensajeIN.value = "";
    mensajeIN.focus();


    ventanaEntrada.className = " mensajeEntrada paneles animate__animated animate__flipInX";
    ventanaSalida.className = " mensajeSalida paneles animate__animated animate__flipInX";

    ventanaEntrada.style.display = 'block';
    ventanaSalida.style.display = 'none';
}

function encriptador(frase, bandera){
    frase = frase.toLowerCase();

    if(bandera == true ){
        for (let i = 0; i < matrizEncriptada.length; i++){
            if(frase.includes(matrizEncriptada[i][0])){
                frase = frase.replaceAll(matrizEncriptada[i][0], matrizEncriptada[i][1]);
            }

        }
    }else if (bandera == false){

        for (let i = 0; i < matrizEncriptada.length; i++){
            if(frase.includes(matrizEncriptada[i][0])){
                frase = frase.replaceAll(matrizEncriptada[i][1], matrizEncriptada[i][0]);
            }
            
        }
    }
    mensajeIN.value = "";
    mensajeOUT.focus();

    return frase;
}
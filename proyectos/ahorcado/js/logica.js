// Ejes: x: horizontal, y: vertical
// Declaramos las variables que usaremos para la logica del juego.
var palabras = [
  "ALURA",
  "AHORCADO",
  "ORACLE",
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "COPIAR",
  "DELTA",
  "FECHA",
  "CORDERO",
  "ORQUESTA",
  "CEMENTERIO",
  "MOTEL",
  "FAMA",
  "PERRERA",
  "CASTOR",
  "CANGREJO",
  "HUEVOS",
  "CEREZA",
  "ALUBIAS",
  "PAN",
  "ACELGAS",
  "SAL",
  "NUEZ",
  "CEREALES",
  "PASTA",
];

var palabra = "";
var tablero = document.getElementById("horca").getContext("2d");
var letras = [];
var palabraCorrecta = [];
var palabraSecreta;
var errores = 9;
var intentos = 9;

var posicionX = tablero.width / 4;
var posicionY = tablero.height / 2;

function resetJuego() {
  document.getElementsByClassName("palabraInput")[0].value = "";
  agregarPalabra.length = 0;
  agregarPalabra = "";
  letras.length = 0;
  palabra = "";
  palabraCorrecta.length = 0;
  palabraSecreta.length = 0;
  palabraCorrecta = [];
  palabraSecreta = "";
  intentos = 9;
  errores = 9;

  console.log("agregar palabra: " + agregarPalabra);
  console.log("Palabra Secreta: " + palabraSecreta);
}

function escojerPalabraSecreta() {
  var agregarPalabra = document.getElementsByClassName("palabraInput")[0].value;

  if (agregarPalabra === "") {
    palabra = palabras[Math.floor(Math.random() * palabras.length)];
  } else {
    palabra = agregarPalabra.toUpperCase();
  }

  palabraSecreta = palabra;
  console.log("La palabra Secreta es: " + palabraSecreta);
  return palabraSecreta;
}

function dibujarLineas() {
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();

  var ancho = 600 / palabraSecreta.length;

  for (let i = 0; i < palabraSecreta.length; i++) {
    tablero.moveTo(posicionX + (ancho * i + 5), posicionY + posicionY / 2 + 50);
    tablero.lineTo(posicionX + 50 + ancho * i, posicionY + posicionY / 2 + 50);
  }

  tablero.stroke();
  tablero.closePath();
}

function escribirVidas() {
  //sintaxis: context.fillText(text,x,y,maxWidth);
  //clearRect(x, y, width, height);
  tablero.clearRect(890, 20, 200, 100);
  tablero.font = "bold 40px Arial";
  tablero.fillStyle = "black";
  tablero.fillText("vidas: " + intentos, 890, 60); // filltext(texto, x, y))
}

function escribirLetraCorrecta(index) {
  //sintaxis: context.fillText(text,x,y,maxWidth);
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";

  var ancho = 600 / palabraSecreta.length;

  // sombra
  tablero.font = "bold 70px Rubik Microbe";
  tablero.fillStyle = "#18181842";
  tablero.fillText(
    palabraSecreta[index],
    posicionX + 5 + ancho * index,
    posicionY + posicionY / 2 + 30
  );

  // letra
  tablero.font = "bold 65px Rubik Microbe";
  tablero.fillStyle = "#FFFFFF";
  tablero.fillText(
    palabraSecreta[index],
    posicionX + ancho * index,
    posicionY + posicionY / 2 + 30
  );
}

function escribirLetraIncorrecta(letra, errorsLeft) {
  //sintaxis: context.fillText(text,x,y,maxWidth);
  //tablero.font = 'bold 40px Inter';
  //tablero.font = 'bold 40px Rubik Microbe';

  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";

  tablero.font = "bold 55px Rubik Microbe";
  tablero.fillStyle = "#ffffffe8";
  tablero.fillText(letra, posicionX + 18 + 40 * (10 - errorsLeft), 750, 50);
  tablero.font = "bold 50px Rubik Microbe";
  tablero.fillStyle = "#df0707e8";
  tablero.fillText(letra, posicionX + 20 + 40 * (10 - errorsLeft), 750, 40); //tablero.fillText(letra, 535+(40*(10-errorsLeft)), 710,40)
}

function verificarLetraClicada(key) {
  // letras.length sirve para obtener el numero total de palabras
  // dentro del array.

  // letras.indexOf(key) sirve para poder obtener la posicion de
  // la letra dentro de la palabra dentro del array.

  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
    // false o true se usa para controlar la ejecucion del programa
  } else {
    letras.push(key);
    return true;
  }
}

function adicionarLetraCorrecta(i) {
  palabraCorrecta += palabraSecreta[i].toUpperCase();
}

function adicionarletraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    errores -= 1;
  }
}

function ganador() {
  console.log("palabraSecreta: " + palabraSecreta);
  console.log("palabraCorrecta: " + palabraCorrecta);

  if (palabraCorrecta.length === palabraSecreta.length) {
    abrirModal("ganador", "HAZ GANADO!!!", "Aceptar");
    agregarPalabra = "";
    resetJuego();
  }
}

function refrescarPagina(tiempo) {
  setInterval("location.reload()", tiempo);
}

function keylogger(e) {
  tecla = e.keyCode || e.which;

  if ((tecla > 64 && tecla < 91) || tecla == 164 || tecla == 165) {
    let letra = e.key.toUpperCase();

    if (intentos > 0 || intentos != 0) {
      if (!verificarLetraClicada(e.key)) {
        if (palabraSecreta.includes(letra)) {
          console.log("Letra: " + letra);
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              adicionarLetraCorrecta(palabraSecreta.indexOf(letra));
              escribirLetraCorrecta(i);
              console.log(
                "Escribir letra correcta: " + escribirLetraCorrecta(i)
              );
            }
          }
        } else {
          if (!verificarLetraClicada(e.key)) return;

          adicionarletraIncorrecta(letra);
          escribirLetraIncorrecta(letra, errores);
          intentos -= 1;
          escribirVidas();
          console.log("errores: " + errores);
          console.log("intentos: " + intentos);
          dibujarHorca(intentos);
        }
        ganador();
      }
    }
  }

  if (intentos <= 0) {
    abrirModal(
      "perdedor",
      "La palabra correcta era: " + palabraSecreta,
      "Aceptar"
    );
  }
}

function abrirModal(tipoMsg, mensaje, txtBoton) {
  // document.getElementById("myP").innerHTML = text;
  let titulo;
  let colorEstandar =
    "linear-gradient(to right, #2a5298, #1e3c72) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"; // Azul
  let colorGanador =
    "linear-gradient(to right, #a8e063, #56ab2f) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"; // Verde
  let colorPerdedor =
    "linear-gradient(to right, #FF4B2B, #FF416C) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"; // Rojo / Naranja
  let colorPerdedor2 = "linear-gradient(red, orange)";
  let colorError =
    "linear-gradient(to right, #190A05, #870000) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"; // Rojo
  let colorAlerta =
    "linear-gradient(to right, #f7b733, #fc4a1a) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"; // Amarillo

  switch (tipoMsg) {
    case "estandar":
      alertaModal.style.background = colorEstandar;
      titulo = "MENSAJE";
      break;
    case "ganador":
      alertaModal.style.background = colorGanador;
      titulo = "¡GANASTE!";
      break;
    case "perdedor":
      alertaModal.style.background = colorPerdedor;
      titulo = "¡PERDISTE!";
      break;
    case "perdedor2":
      alertaModal.style.background = colorPerdedor2;
      titulo = "¡PERDISTE!";
      break;
    case "error":
      alertaModal.style.background = colorError;
      titulo = "¡ERROR!";
      break;
    case "alerta":
      alertaModal.style.background = colorAlerta;
      titulo = "¡ALERTA!";
      break;
    default:
      alertaModal.style.background = colorEstandar;
      titulo = "AVISO";
      break;
  }

  tituloModal.innerText = titulo;
  mensajeModal.innerText = mensaje;
  botonModal.innerText = txtBoton;

  alertaModal.style.display = "block";
}

escribirVidas(); // Escribimos en el tablero las vidas disponibles para el juego.

dibujarLineas(escojerPalabraSecreta()); // Dibujamos el numero de lineas en el tablero correspondiente a la palabra seleccionada.

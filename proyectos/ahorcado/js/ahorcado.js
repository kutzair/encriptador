const menuPrincipal = document.getElementById("menuPrincipal");
const panelJuego = document.getElementById("juegoAhorcado");
const panelPalabra = document.getElementById("agregarPalabra");
const alertaModal = document.getElementById("alertaModal");
const tituloModal = document.getElementById("tituloAlertaModal");
const mensajeModal = document.getElementById("msgAlertaModal");
const botonModal = document.getElementById("btnAlertaModal");
const lienzo = document.getElementById("horca").getContext("2d");
const liencito = document.getElementById("horca");

lienzo.width = 1054;
lienzo.height = 800;

function inicioBtn() {
  panelJuego.style.display = "block";
  menuPrincipal.style.display = "none";
  nuevoJuegoBtn();
}

function limpiarVariables() {
  letras.length = 0;
  palabra = "";
  palabraCorrecta.length = 0;
  palabraSecreta.length = 0;
  palabraCorrecta = [];
  palabraSecreta = "";
  intentos = 9;
  errores = 9;
}

function nuevoJuegoBtn() {
  limpiarLienzo();
  limpiarVariables();
  escribirVidas();
  dibujarLineas(escojerPalabraSecreta());
  dibujarHorca();
  document.onkeydown = (e) => {
    keylogger(e);
  };
}

function cancelarJuegoBtn() {
  menuPrincipal.style.display = "block";
  panelJuego.style.display = "none";
}

function agregarPalabraBtn() {
  panelPalabra.style.display = "block";
  menuPrincipal.style.display = "none";
  document.getElementById("inputPalabra").focus();
}

function guardarPalabra() {
  // aqui se guarda el valor del cuadro de texto en una variable
  var agregarPalabra = document.getElementsByClassName("palabraInput")[0].value;

  if (agregarPalabra.length == 0) {
    abrirModal("error", "Ingresa una palabra para iniciar el juego", "cerrar");
  } else {
    limpiarLienzo();
    limpiarVariables();
    escribirVidas();
    dibujarLineas(escojerPalabraSecreta());
    dibujarHorca();
    document.onkeydown = (e) => {
      keylogger(e);
    };

    panelJuego.style.display = "block";
    panelPalabra.style.display = "none";
  }
}

function cerrarPalabraBtn() {
  menuPrincipal.style.display = "block";
  panelPalabra.style.display = "none";
}

function cerrarModalBtn() {
  alertaModal.style.display = "none";
  nuevoJuegoBtn();
}

function probarModal() {
  abrirModal("alerta", "La palabra era: hola", "Jugar de nuevo");
}

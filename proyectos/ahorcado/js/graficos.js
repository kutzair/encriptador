function limpiarLienzo() {
    if (lienzo) {
        lienzo.clearRect(0, 0, lienzo.width, lienzo.height);
        lienzo.beginPath();
    } else {
        abrirModal(
        "error",
        "El area de dibujo no existe favor de recargar la pagina nuevamente",
        "Aceptar"
    );
    }
}

function escribirTexto(texto, x, y, color) {
    if (lienzo) {
        lienzo.font = "bold 10px Arial";
        lienzo.fillStyle = color;
        lienzo.fillText(texto, x, y);
    }
}

function dibujarlineas(x, y, w, h, color, rotacion) {
    lienzo.beginPath();
    lienzo.fillStyle = color;
    lienzo.rotate((rotacion * Math.PI) / 180);
    lienzo.fillRect(x, y, w, h);
    lienzo.setTransform(1, 0, 0, 1, 0, 0);
    lienzo.closePath();
}

function dibujardiagonal(x1, y1, x2, y2, color, grosorLinea, tipoLinea) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;

    if (tipoLinea) {
        lienzo.lineCap = tipoLinea;
    } else {
        lienzo.lineCap = "square"; // "butt", "round", "square"
    }

    lienzo.lineWidth = grosorLinea;
    lienzo.moveTo(x1, y1);
    lienzo.lineTo(x2, y2);
    lienzo.stroke();
    lienzo.closePath();
}

function dibujarCirculo(x, y, radio, ap, af, color, grosor, relleno) {
  // dibujarCirculo(0,0,5,0, 2*Math.PI,'red',0, 'lleno');
    let aPartida;
    let aFinal;

    if (lienzo) {
        lienzo.beginPath();

        if (ap == 0 || af == 0) {
            aPartida = 0 * Math.PI;
            aFinal = 10 * Math.PI;
        } else if (ap != 0 || af != 0) {
            aPartida = (ap * Math.PI) / 180;
            aFinal = (af * Math.PI) / 180;
        }

        lienzo.fillStyle = color;
        lienzo.strokeStyle = color;
        lienzo.lineWidth = grosor;
        lienzo.arc(x, y, radio, aPartida, aFinal);

        if (relleno == "hueco") {
            lienzo.fillStyle = null;
            lienzo.stroke();
            lienzo.closePath();
        } else if (relleno == "lleno") {
            lienzo.fillStyle = color;
            lienzo.fill();
            lienzo.closePath();
        }
    }
}
function dibujarElipse(x, y, grosor, color) {
  // relleno = hueco / lleno
  //30,150, 200,150, 120,20
  // 30,150, 200,150, 120,20
  // 120, 20
    let cp1x = x - 80; //90
    let cp2x = x + 80; //80
    let cp1y = y + 90; //130
    let cp2y = cp1y;

    if (lienzo) {
        lienzo.beginPath();
        lienzo.strokeStyle = color;
        lienzo.lineWidth = grosor;
        lienzo.moveTo(x, y);
        lienzo.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
        lienzo.stroke();
        lienzo.closePath();
    }
}

function dibujarHorca(intentos) {
    var ajuste = posicionY;
  // Crear un switch para seleccionar la parte a mostrar
  // de acuerdo a los errores cometidos.

    if (lienzo) {
    switch (intentos) {
        case 8:
            dibujarlineas(20 + ajuste, 350, 200, 20, "brown", 0); // Base
            dibujarlineas(100 + ajuste, 50, 20, 300, "brown", 0); // Poste

            dibujardiagonal(450, 65, 500, 95, "brown", 20); // soporte izq.
            dibujardiagonal(570, 65, 520, 95, "brown", 20); // soporte der.
        break;

        case 7:
            dibujarlineas(30 + ajuste, 50, 280, 20, "brown", 0); // travesanio
            dibujarlineas(280 + ajuste, 50, 8, 80, "brown", 0); // cuerda
        break;

        case 6:
            dibujarlineas(277 + ajuste, 120, 15, 10, "brown", 0); // nudo
            dibujarElipse(285 + ajuste, 130, 8, "brown"); // horca
        break;

        case 5:
            dibujarCirculo(285 + ajuste, 175, 25, 0, 0, "black", 8, "lleno"); // Cabeza
        break;

        case 4:
            dibujarlineas(280 + ajuste, 150, 10, 150, "black", 0); // Cuerpo
        break;

        case 3:
            dibujardiagonal(690, 220, 740, 250, "black", 10, "round"); // brazo derecho
        break;

        case 2:
            dibujardiagonal(680, 220, 640, 250, "black", 10, "round"); // brazo izquierdo
        break;

        case 1:
            dibujardiagonal(690, 296, 740, 350, "black", 10, "round"); // pierna derecha
        break;

        case 0:
            dibujardiagonal(680, 296, 640, 350, "black", 10, "round"); // pierna izquierda
        break;

        default:
        break;
    }
        lienzo.setTransform(1, 0, 0, 1, 0, 0);
        lienzo.closePath();
    }
}
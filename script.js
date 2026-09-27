document.addEventListener("DOMContentLoaded", function () {

    const botonCarta = document.getElementById("botonCarta");
    const cerrarCarta = document.getElementById("cerrarCarta");
    const carta = document.getElementById("carta");

    const miMusica = document.getElementById("miMusica");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const barraProgreso = document.getElementById("barraProgreso");
    const tiempoActual = document.getElementById("tiempoActual");
    const tiempoTotal = document.getElementById("tiempoTotal");

    let reproduciendo = false;

    // Formatear tiempo en mm:ss
    function formatearTiempo(segundos) {
        if (isNaN(segundos)) return "0:00";
        const minutos = Math.floor(segundos / 60);
        const segs = Math.floor(segundos % 60);
        return `${minutos}:${segs < 10 ? "0" : ""}${segs}`;
    }

    // Función para reproducir música
    function reproducirMusica() {
        miMusica.play().then(() => {
            reproduciendo = true;
            playPauseBtn.innerHTML = "⏸️";
        }).catch(e => {
            console.log("Autoplay bloqueado por el navegador:", e);
        });
    }

    // Función para pausar música
    function pausarMusica() {
        miMusica.pause();
        reproduciendo = false;
        playPauseBtn.innerHTML = "▶️";
    }

    // Abrir carta -> Mostrar modal y AUTORREPRODUCIR MÚSICA
    botonCarta.addEventListener("click", function () {
        carta.classList.add("mostrar");
        reproducirMusica();
    });

    // Cerrar carta
    cerrarCarta.addEventListener("click", function () {
        carta.classList.remove("mostrar");
        pausarMusica();
    });

    // Cerrar dando clic fuera
    carta.addEventListener("click", function (evento) {
        if (evento.target === carta) {
            carta.classList.remove("mostrar");
            pausarMusica();
        }
    });

    // Botón Play/Pausa interno
    playPauseBtn.addEventListener("click", function () {
        if (reproduciendo) {
            pausarMusica();
        } else {
            reproducirMusica();
        }
    });

    // Cargar metadatos del audio
    miMusica.addEventListener("loadedmetadata", function () {
        barraProgreso.max = miMusica.duration;
        tiempoTotal.textContent = formatearTiempo(miMusica.duration);
    });

    // Actualizar barra de progreso y tiempo actual
    miMusica.addEventListener("timeupdate", function () {
        if (!isNaN(miMusica.duration)) {
            barraProgreso.max = miMusica.duration;
            tiempoTotal.textContent = formatearTiempo(miMusica.duration);
        }
        barraProgreso.value = miMusica.currentTime;
        tiempoActual.textContent = formatearTiempo(miMusica.currentTime);
    });

    // Adelantar/retroceder canción con la barra
    barraProgreso.addEventListener("input", function () {
        miMusica.currentTime = barraProgreso.value;
    });

});
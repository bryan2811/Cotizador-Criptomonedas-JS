class Interfaz {

    constructor() {
        this.init();
    }
    init() {
        this.construirSelect();
    }

    construirSelect() {
        cotizador.obtenerMonedasAPI()
            .then(monedas => {
                // Crear un select de opciones
                const select = document.querySelector('#criptomoneda');
                
                // iterar por los resultados de la API
                for( const [key, value] of Object.entries(monedas.monedas.Data)) {
                    // Añadir el Symbol y el Nombre como opciones
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion)
                }
            })
    }

    mostrarMensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        
        // Seleccionar mensajes
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        // Mostrar Contenido
        setTimeout(function () {
            document.querySelector('.mensajes div').remove();
        }, 3000)
    }

    // Imprime el resultado de la cotización
    mostrarResultado(resultado, moneda, crypto) {
        console.log(resultado[crypto][moneda]);
    }
}
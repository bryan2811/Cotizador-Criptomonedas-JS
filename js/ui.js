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
        const datosMoneda = resultado[crypto][moneda];

        // Recortar los digitos a 2 decimales
        let cripto = datosMoneda.FROMSYMBOL,
            divisa = datosMoneda.TOSYMBOL,
            precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX')

        // Template
        let templateHTML = /*html*/`
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El Precio de ${cripto} a divisa ${divisa} es de: $ ${precio}</p>
                    <p>Variación último día: % ${porcentaje}</p>
                    <p>Última actualización: ${actualizado}</p>
                </div>
            </div>
        `;
        
        // Insertar el resultado
        document.querySelector('#resultado').innerHTML = templateHTML;
    }
}
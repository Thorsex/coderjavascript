document.addEventListener('DOMContentLoaded', () => {
    const monedaOrigen = document.getElementById('monedaOrigen')
    const monedaDestino = document.getElementById('monedaDestino')
    const cantidadInput = document.getElementById('cantidad')
    const formularioConvertidor = document.getElementById('formularioConvertidor')
    const monedaCompra = document.getElementById('monedaCompra')
    const cantidadCompra = document.getElementById('cantidadCompra')
    const formularioCompra = document.getElementById('formularioCompra')
    const cbuInput = document.getElementById('cbu')
    const listaHistorial = document.getElementById('listaHistorial')
    const saldoCuenta = document.getElementById('saldoCuenta')
    const mensajeCompra = document.getElementById('mensajeCompra')

    let cuenta = JSON.parse(localStorage.getItem('cuenta')) || {}

    fetch('data/data.json')
        .then(response => response.json())
        .then(datos => {
            cargarOpcionesMonedas(datos.monedas)
            cargarSaldoInicial(datos.monedas)
        })
        .catch(error => console.error('Error al cargar datos:', error))

    formularioConvertidor.addEventListener('submit', e => {
        e.preventDefault()
        const de = monedaOrigen.value
        const a = monedaDestino.value
        const cantidad = parseFloat(cantidadInput.value)

        if (de && a && cantidad > 0) {
            fetch('data/data.json')
                .then(response => response.json())
                .then(datos => {
                    const tasa = obtenerTasaConversion(de, a, datos.tasas)
                    if (tasa) {
                        const resultado = (cantidad * tasa).toFixed(8)
                        const transaccion = { de, a, cantidad, resultado, tasa, tipo: 'Conversión', fecha: new Date() }
                        guardarHistorial(transaccion)
                        mostrarHistorial()
                        mostrarMensaje(mensajeCompra, `¡Conversión exitosa! ${cantidad} ${de} = ${resultado} ${a}`, 'success')
                    } else {
                        mostrarMensaje(mensajeCompra, 'Tasa de conversión no disponible', 'danger')
                    }
                })
        } else {
            mostrarMensaje(mensajeCompra, 'Datos de conversión no válidos', 'danger')
        }
    })

    formularioCompra.addEventListener('submit', e => {
        e.preventDefault()
        const moneda = monedaCompra.value
        const cantidad = parseFloat(cantidadCompra.value)
        const cbu = cbuInput.value

        if (moneda && cantidad > 0 && validarCBU(cbu)) {
            cuenta[moneda] = (cuenta[moneda] || 0) + cantidad
            localStorage.setItem('cuenta', JSON.stringify(cuenta))
            const transaccion = { moneda, cantidad, tipo: 'Compra', fecha: new Date() }
            guardarHistorial(transaccion)
            actualizarSaldoCuenta()
            mostrarHistorial()
            mostrarMensaje(mensajeCompra, `¡Compra exitosa! Ha comprado ${cantidad} ${moneda}.`, 'success')
            formularioCompra.reset()
        } else {
            mostrarMensaje(mensajeCompra, 'Datos de compra no válidos', 'danger')
        }
    })

    function cargarOpcionesMonedas(monedas) {
        monedas.forEach(moneda => {
            const opcionOrigen = document.createElement('option')
            const opcionDestino = document.createElement('option')
            const opcionCompra = document.createElement('option')
            opcionOrigen.value = opcionDestino.value = opcionCompra.value = moneda.codigo
            opcionOrigen.text = opcionDestino.text = opcionCompra.text = `${moneda.nombre} (${moneda.codigo})`
            monedaOrigen.appendChild(opcionOrigen)
            monedaDestino.appendChild(opcionDestino)
            monedaCompra.appendChild(opcionCompra)
        })
    }

    function cargarSaldoInicial(monedas) {
        monedas.forEach(moneda => {
            cuenta[moneda.codigo] = cuenta[moneda.codigo] || 0
        })
        actualizarSaldoCuenta()
    }

    function mostrarHistorial() {
        const historial = JSON.parse(localStorage.getItem('historialConversiones')) || []
        listaHistorial.innerHTML = ''
        historial.forEach(entrada => {
            const itemLista = document.createElement('li')
            itemLista.className = 'list-group-item'
            itemLista.textContent = `${entrada.tipo}: ${entrada.cantidad} ${entrada.de ? entrada.de : ''} ${entrada.a ? 'a ' + entrada.a : ''} ${entrada.resultado ? '= ' + entrada.resultado + ' ' + entrada.a : ''} (Fecha: ${new Date(entrada.fecha).toLocaleString()})`
            listaHistorial.appendChild(itemLista)
        })
    }

    function actualizarSaldoCuenta() {
        saldoCuenta.innerHTML = ''
        for (const [moneda, cantidad] of Object.entries(cuenta)) {
            const itemLista = document.createElement('li')
            itemLista.className = 'list-group-item'
            itemLista.textContent = `${moneda}: ${cantidad.toFixed(8)}`
            saldoCuenta.appendChild(itemLista)
        }
    }

    mostrarHistorial()
    actualizarSaldoCuenta()
})

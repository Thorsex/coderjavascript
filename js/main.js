document.addEventListener("DOMContentLoaded", function() {

let dineroRestante = parseFloat(localStorage.getItem("dineroRestante")) || 1000000.00

let criptomonedas = [
    { nombre: "Bitcoin", id: "bitcoin-buy", buttonId: "button-bitcoin0", precio: 57872.36, cantidadComprada: 0 },
    { nombre: "Ethereum", id: "ethereum-buy", buttonId: "button-bitcoin1", precio: 2446.17, cantidadComprada: 0 },
    { nombre: "Litecoin", id: "litecoin-buy", buttonId: "button-bitcoin2", precio: 64.78, cantidadComprada: 0 },
    { nombre: "Ripple", id: "ripple-buy", buttonId: "button-bitcoin3", precio: 0.56, cantidadComprada: 0 },
    { nombre: "Cardano", id: "cardano-buy", buttonId: "button-bitcoin4", precio: 0.32, cantidadComprada: 0 },
    { nombre: "Dogecoin", id: "dogecoin-buy", buttonId: "button-bitcoin5", precio: 0.06, cantidadComprada: 0 }
]
criptomonedas.forEach(function(crypto) {
    crypto.cantidadComprada = parseFloat(localStorage.getItem(crypto.nombre)) || 0
})

function actualizarDineroRestante() {
    let dineroElemento = document.getElementById("dinero-restante")
     dineroElemento.textContent = `$${dineroRestante.toFixed(2)} USD`
}
actualizarDineroRestante()


criptomonedas.forEach(function(crypto, index) {
    let button = document.getElementById(crypto.buttonId)
    button.addEventListener("click", function() {
        mostrarFormularioCompra(crypto)
    })
})

function mostrarFormularioCompra(crypto) {
    let form = document.querySelector(".compra-form")
    form.style.display = "block"

    let label = form.querySelector("label")
        label.textContent = `Cantidad a comprar de ${crypto.nombre}:`

    let input = form.querySelector("input")
    input.value = ""
    input.focus()

     let confirmarButton = form.querySelector("button")
    confirmarButton.onclick = function() {
        let cantidad = parseFloat(input.value)
    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarMensaje("Por favor, ingresa una cantidad válida.", "alert-danger")
        return
}

    let total = cantidad * crypto.precio

    if (total > dineroRestante) {
    mostrarMensaje("No tienes suficiente dinero para esta compra.", "alert-danger")
        return
}

dineroRestante -= total
    actualizarDineroRestante()
    localStorage.setItem("dineroRestante", dineroRestante)
    crypto.cantidadComprada += cantidad
     localStorage.setItem(crypto.nombre, crypto.cantidadComprada)

    mostrarMensaje(`Has comprado ${cantidad} ${crypto.nombre} por un total de $${total.toFixed(2)} USD. Dinero restante: $${dineroRestante.toFixed(2)} USD`, "alert-success")

    form.style.display = "none"
    }
}

function mostrarMensaje(mensaje, tipo) {
    let mensajesDiv = document.getElementById("mensajes")
        mensajesDiv.textContent = mensaje
        mensajesDiv.className = `alert ${tipo} mt-3`
        mensajesDiv.style.display = "block"
    }
})

document.addEventListener("DOMContentLoaded", function() {

    let reiniciarBtn = document.getElementById("reiniciar-btn")
    reiniciarBtn.addEventListener("click", function() {        reiniciarLocalStorage()
})

function reiniciarLocalStorage() {       
        localStorage.clear()
        location.reload()
    }
})


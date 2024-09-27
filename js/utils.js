function obtenerTasaConversion(de, a, tasas) {
    const tasaDe = tasas[de];
    const tasaA = tasas[a];
    return tasaDe && tasaA ? tasaA / tasaDe : null;
}

function guardarHistorial(transaccion) {
    const historial = JSON.parse(localStorage.getItem('historialConversiones')) || [];
    historial.push(transaccion);
    localStorage.setItem('historialConversiones', JSON.stringify(historial));
}

function validarCBU(cbu) {
    return /^[0-9]{22}$/.test(cbu);
}

function mostrarMensaje(container, mensaje, tipo) {
    container.innerHTML = `<div class="alert alert-${tipo}" role="alert">${mensaje}</div>`;
    setTimeout(() => {
        container.innerHTML = '';
    }, 3000);
}

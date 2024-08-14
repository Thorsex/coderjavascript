function calcularcrecimientoeconomico(poblacion, ubicacion, recurso) {
    let crecimiento = 0;

    if (poblacion > 10_000_000) {
        crecimiento += 50;
    } else if (poblacion > 1_000_000) {
        crecimiento += 30;
    } else {
        crecimiento += 10;
    }

    switch (ubicacion) {
        case 'Desierto':
            crecimiento -= 20;
            break;
        case 'Tropical':
            crecimiento += 30;
            break;
        case 'Tundra':
            crecimiento -= 10;
            break;
    }

    switch (recurso) {
        case 'Petroleo':
            crecimiento += 50;
            break;
        case 'Oro':
            crecimiento += 40;
            break;
        case 'Uranio':
            crecimiento += 60;
            break;
        case 'Ninguno':
            crecimiento += 0;
            break;
    }

    return crecimiento;
}

const poblacion = parseInt(prompt("Ingresa la población del país:"));
const ubicacion = prompt("Elige la ubicación (Desierto, Tropical, Tundra):");
const recurso = prompt("Elige el recurso natural (Petroleo, Oro, Uranio, Ninguno):");

const crecimientoeconomico = calcularcrecimientoeconomico(poblacion, ubicacion, recurso);

if(crecimientoeconomico > 50) {
    alert("El país está en crecimiento económico.");
}else {
    alert("El país no está en crecimiento económico.");
}

console.log(`Población: ${poblacion}`);
console.log(`Ubicación: ${ubicacion}`);
console.log(`Recurso Natural: ${recurso}`);
console.log(`Crecimiento Económico: ${crecimientoeconomico}`);

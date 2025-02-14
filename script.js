// Función para calcular el total del mes
function calcularTotal() {
    const mananas = parseInt(document.getElementById('mananasMes').value) || 0;
    const tardes = parseInt(document.getElementById('tardesMes').value) || 0;
    const noches = parseInt(document.getElementById('nochesMes').value) || 0;
    const adelantos = parseInt(document.getElementById('adelantosMes').value) || 0;
    const vacaciones = parseInt(document.getElementById('vacacionesMes').value) || 0;
    const flexibilidad = parseInt(document.getElementById('flexibilidadMes').value) || 0;

    const total = mananas + tardes + noches + adelantos + vacaciones + flexibilidad;
    document.getElementById('totalMes').textContent = total;
}

// Función para guardar los cambios en localStorage
function guardarCambios() {
    const data = {
        mananasMes: document.getElementById('mananasMes').value,
        tardesMes: document.getElementById('tardesMes').value,
        nochesMes: document.getElementById('nochesMes').value,
        adelantosMes: document.getElementById('adelantosMes').value,
        vacacionesMes: document.getElementById('vacacionesMes').value,
        flexibilidadMes: document.getElementById('flexibilidadMes').value,
        vacacionesRestantes: document.getElementById('vacacionesRestantes').textContent,
        finSemanaTrabajado: document.getElementById('finSemanaTrabajado').textContent,
        diasBaja: document.getElementById('diasBaja').textContent
    };

    // Guardar en localStorage
    localStorage.setItem('calendarioLaboral2025', JSON.stringify(data));

    // Mostrar mensaje de guardado
    document.getElementById('mensajeGuardado').style.display = 'block';
    setTimeout(() => {
        document.getElementById('mensajeGuardado').style.display = 'none';
    }, 3000);
}

// Función para cargar los datos desde localStorage
function cargarDatos() {
    const savedData = localStorage.getItem('calendarioLaboral2025');
    if (savedData) {
        const data = JSON.parse(savedData);
        document.getElementById('mananasMes').value = data.mananasMes || 0;
        document.getElementById('tardesMes').value = data.tardesMes || 0;
        document.getElementById('nochesMes').value = data.nochesMes || 0;
        document.getElementById('adelantosMes').value = data.adelantosMes || 0;
        document.getElementById('vacacionesMes').value = data.vacacionesMes || 0;
        document.getElementById('flexibilidadMes').value = data.flexibilidadMes || 0;
        document.getElementById('vacacionesRestantes').textContent = data.vacacionesRestantes || 22;
        document.getElementById('finSemanaTrabajado').textContent = data.finSemanaTrabajado || 0;
        document.getElementById('diasBaja').textContent = data.diasBaja || 0;

        calcularTotal();
    }
}

// Evento para calcular el total al cambiar cualquier campo
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', calcularTotal);
});

// Evento para guardar cambios
document.getElementById('guardarCambios').addEventListener('click', guardarCambios);

// Cargar datos al cargar la página
window.addEventListener('DOMContentLoaded', cargarDatos);
document.getElementById('saveButton').addEventListener('click', async () => {
    try {
        // Datos del calendario (pueden ser dinámicos)
        const data = {
            resumenMensual: {
                mañanas: 0,
                tardes: 0,
                noches: 0,
                adelantos: 0,
                vacaciones: 0,
                flexibilidad: 0,
                total: 0,
                diasVacacionesRestantes: 22,
                diasTrabajadosFinDeSemana: 0,
                diasBaja: 0
            },
            resumenAnual: {
                mañanas: 0,
                tardes: 0,
                noches: 0,
                adelantos: 0,
                vacaciones: 0,
                flexibilidad: 0,
                totalDiasTrabajados: 0,
                totalDiasVacacionesUsados: 0,
                totalDiasTrabajadosFinDeSemana: 0,
                totalDiasBaja: 0
            }
        };

        // Convertir los datos a JSON
        const jsonData = JSON.stringify(data, null, 2);

        // Crear un objeto Blob con los datos
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Usar showSaveFilePicker para guardar el archivo en iCloud
        const [fileHandle] = await window.showSaveFilePicker({
            suggestedName: 'calendario-laboral-2025.json',
            types: [{
                description: 'JSON File',
                accept: { 'application/json': ['.json'] }
            }]
        });

        // Crear un writable stream
        const writableStream = await fileHandle.createWritable();

        // Escribir los datos en el archivo
        await writableStream.write(blob);

        // Cerrar el stream
        await writableStream.close();

        // Mostrar mensaje de éxito
        document.getElementById('statusMessage').textContent = '✓ Guardado correctamente en iCloud';
    } catch (error) {
        // Mostrar mensaje de error
        document.getElementById('statusMessage').textContent = 'Error al guardar: ' + error.message;
    }
});
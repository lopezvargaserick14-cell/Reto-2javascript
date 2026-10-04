let nombres = [];
let notas = [];
let formulario = document.getElementById("formulario-alumno");
let contenedorResultados = document.getElementById("resultados");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (nombres.length >= 10) {
        alert("Ya se ingresaron los 10 alumnos del curso.");
        return;
    }
    let nombreIngresado = document.getElementById("nombre").value.trim();
    let n1 = Number(document.getElementById("nota1").value);
    let n2 = Number(document.getElementById("nota2").value);
    let n3 = Number(document.getElementById("nota3").value);

    if (nombreIngresado === "") {
        alert("Por favor, escribe el nombre del alumno.");
        return;
    }

    if (n1 < 0 || n1 > 100 || n2 < 0 || n2 > 100 || n3 < 0 || n3 > 100) {
        alert("Por favor, ingresa notas válidas entre 0 y 100.");
        return;
    }

    nombres.push(nombreIngresado);
    notas.push([n1, n2, n3]);
    formulario.reset();
    mostrarResultados();
});
function calcularPromedio(lista) {
    let suma = lista.reduce((total, valor) => total + valor, 0);
    return suma / lista.length;
}

function mostrarResultados() {
    let contenidoHTML = `<h2>Resultados del Curso (${nombres.length}/10 alumnos)</h2>`;

    let listaAlumnos = nombres.map(function (nombre, i) {
        let notasAlumno = notas[i];
        let promedio = calcularPromedio(notasAlumno);
        return {
            nombre: nombre,
            notas: notasAlumno,
            promedio: promedio
        };
    });

    listaAlumnos.forEach(function (alumno, i) {
        contenidoHTML += `<p><strong>Alumno ${i + 1}:</strong> ${alumno.nombre} | Notas: ${alumno.notas[0]}, ${alumno.notas[1]}, ${alumno.notas[2]} | <strong>Promedio:</strong> ${alumno.promedio.toFixed(1)}</p>`;
    });

    if (listaAlumnos.length > 0) {
        let promC1 = calcularPromedio(notas.map(n => n[0]));
        let promC2 = calcularPromedio(notas.map(n => n[1]));
        let promC3 = calcularPromedio(notas.map(n => n[2]));
        let promGeneral = calcularPromedio([promC1, promC2, promC3]);

        let aprobados = listaAlumnos.filter(a => a.promedio >= 55).length;
        let reprobados = listaAlumnos.filter(a => a.promedio < 55).length;

        contenidoHTML += `
            <hr>
            <h3>Estadísticas del Curso</h3>
            <p><strong>Promedio Certamen 1:</strong> ${promC1.toFixed(1)}</p>
            <p><strong>Promedio Certamen 2:</strong> ${promC2.toFixed(1)}</p>
            <p><strong>Promedio Certamen 3:</strong> ${promC3.toFixed(1)}</p>
            <p><strong>Promedio General:</strong> ${promGeneral.toFixed(1)}</p>
            <p><strong>Aprobados (>=55):</strong> ${aprobados} | <strong>Reprobados (<55):</strong> ${reprobados}</p>
            <hr>
            <h3>Ranking del Curso</h3>
            <ol>
        `;

        listaAlumnos.sort(function (alumnoA, alumnoB) {
            return alumnoB.promedio - alumnoA.promedio;
        });

        listaAlumnos.forEach(function (alumno) {
            contenidoHTML += `<li>${alumno.nombre} - Promedio: ${alumno.promedio.toFixed(1)}</li>`;
        });

        contenidoHTML += `</ol>`;
    }

    contenedorResultados.innerHTML = contenidoHTML;
}
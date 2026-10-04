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
    let nombreIngresado = document.getElementById("nombre").value;
    let n1 = Number(document.getElementById("nota1").value);
    let n2 = Number(document.getElementById("nota2").value);
    let n3 = Number(document.getElementById("nota3").value);
    nombres.push(nombreIngresado);
    notas.push([n1, n2, n3]);
    formulario.reset();
    mostrarResultados();
});
function mostrarResultados() {
    let contenidoHTML = `<h2>Resultados del Curso (${nombres.length}/10 alumnos)</h2>`;
    let sumaC1 = 0;
    let sumaC2 = 0;
    let sumaC3 = 0;
    let aprobados = 0;
    let reprobados = 0;
    let listaAlumnos = [];
    for (let i = 0; i < nombres.length; i++) {
        let n1 = notas[i][0];
        let n2 = notas[i][1];
        let n3 = notas[i][2];
        let promedio = (n1 + n2 + n3) / 3;
        sumaC1 += n1;
        sumaC2 += n2;
        sumaC3 += n3;
        if (promedio >= 55) {
            aprobados++;
        } else {
            reprobados++;
        }
        listaAlumnos.push({ nombre: nombres[i], promedio: promedio });
        contenidoHTML += `<p><strong>Alumno ${i + 1}:</strong> ${nombres[i]} | Notas: ${n1}, ${n2}, ${n3} | <strong>Promedio:</strong> ${promedio.toFixed(1)}</p>`;
    }
    if (nombres.length > 0) {
        let promC1 = sumaC1 / nombres.length;
        let promC2 = sumaC2 / nombres.length;
        let promC3 = sumaC3 / nombres.length;
        let promGeneral = (promC1 + promC2 + promC3) / 3;
        contenidoHTML += `<hr />`;
        contenidoHTML += `<h3>Estadísticas del Curso</h3>`;
        contenidoHTML += `<p><strong>Promedio Certamen 1:</strong> ${promC1.toFixed(1)}</p>`;
        contenidoHTML += `<p><strong>Promedio Certamen 2:</strong> ${promC2.toFixed(1)}</p>`;
        contenidoHTML += `<p><strong>Promedio Certamen 3:</strong> ${promC3.toFixed(1)}</p>`;
        contenidoHTML += `<p><strong>Promedio General:</strong> ${promGeneral.toFixed(1)}</p>`;
        contenidoHTML += `<p><strong>Aprobados (>=55):</strong> ${aprobados} | <strong>Reprobados (<55):</strong> ${reprobados}</p>`;
        listaAlumnos.sort((a, b) => b.promedio - a.promedio);
        contenidoHTML += `<hr />`;
        contenidoHTML += `<h3>Ranking del Curso</h3><ol>`;
        for (let j = 0; j < listaAlumnos.length; j++) {
            contenidoHTML += `<li>${listaAlumnos[j].nombre} - Promedio: ${listaAlumnos[j].promedio.toFixed(1)}</li>`;
        }
        contenidoHTML += `</ol>`;
    }
    contenedorResultados.innerHTML = contenidoHTML;
}
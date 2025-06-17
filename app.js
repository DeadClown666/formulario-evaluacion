// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmJMjqYWh1k7qQcUA2MsJazZuETj1nxZA",
  authDomain: "evaluacioninstructores-174b4.firebaseapp.com",
  projectId: "evaluacioninstructores-174b4",
  storageBucket: "evaluacioninstructores-174b4.appspot.com",
  messagingSenderId: "68173693264",
  appId: "1:68173693264:web:9f38ed69f44cebc2e6ac55",
  measurementId: "G-5H48Y83SV4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  // Referencias al DOM
  const programaSelect = document.getElementById('programa');
  const modalidadDiv = document.getElementById('div-modalidad');
  const modalidadSelect = document.getElementById('modalidad');
  const grupoDiv = document.getElementById('div-grupo');
  const grupoSelect = document.getElementById('grupo');
  const horarioDiv = document.getElementById('div-horario');
  const horarioSelect = document.getElementById('horario');
  const cursoDiv = document.getElementById('div-curso');
  const cursoSelect = document.getElementById('curso');
  const docenteDiv = document.getElementById('div-docente');
  const docenteSelect = document.getElementById('docente');
  const evaluacionDiv = document.getElementById('evaluacion-instructor');
  const btnSiguiente = document.getElementById('btn-siguiente');
  const bloque1 = document.getElementById('bloque-1');
  const bloque2 = document.getElementById('bloque-2');

  const datosProgramas = {
    "Nivelación Pedagógica": {
      modalidad: ["Sabatina", "Intersemanal"],
      grupos: ["NP01", "NP02"],
      horarios: ["10:00 - 12:30", "16:00 - 18:00"],
      cursos: ["Autonomía Profesional", "Normatividad Educativa", "Habilidades Docentes"],
      docentes: ["Ismael Ugalde", "Roberto Granados"]
    },
    "Capacitación Primaria": {
      modalidad: ["Intersemanal"],
      grupos: ["CP01", "CP02", "CP03"],
      horarios: ["8:00 - 10:00", "13:00 - 15:00", "17:00 - 19:00"],
      cursos: ["Ejes Articuladores I", "Ejes Articuladores II"],
      docentes: ["Paola Martinez", "Alberto Santana"]
    }
  };

  function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function limpiarSelect(selectElement) {
    selectElement.innerHTML = "";
  }

  function rellenarOpciones(selectElement, opciones) {
    const placeholder = document.createElement('option');
    placeholder.value = "";
    placeholder.textContent = "Seleccione una opción";
    selectElement.appendChild(placeholder);

    opciones.forEach(opcion => {
      const opt = document.createElement('option');
      opt.value = opcion;
      opt.textContent = opcion;
      selectElement.appendChild(opt);
    });
  }

  function ocultarTodo() {
    modalidadDiv.style.display = 'none';
    grupoDiv.style.display = 'none';
    horarioDiv.style.display = 'none';
    cursoDiv.style.display = 'none';
    docenteDiv.style.display = 'none';
    evaluacionDiv.style.display = 'none';

    limpiarSelect(modalidadSelect);
    limpiarSelect(grupoSelect);
    limpiarSelect(horarioSelect);
    limpiarSelect(cursoSelect);
    limpiarSelect(docenteSelect);
  }

  programaSelect.addEventListener('change', function () {
    const selectedPrograma = this.value;
    if (selectedPrograma && datosProgramas[selectedPrograma]) {
      ocultarTodo();
      limpiarSelect(modalidadSelect);
      rellenarOpciones(modalidadSelect, datosProgramas[selectedPrograma].modalidad);
      
      modalidadDiv.style.display = 'block';
      scrollToElement(modalidadDiv);
    } else {
      ocultarTodo();
    }
  });

  modalidadSelect.addEventListener('change', function () {
    const selectedPrograma = programaSelect.value;
    if (this.value && datosProgramas[selectedPrograma]) {
      limpiarSelect(grupoSelect);
      rellenarOpciones(grupoSelect, datosProgramas[selectedPrograma].grupos);
      grupoDiv.style.display = 'block';
      scrollToElement(grupoDiv);
    } else {
      grupoDiv.style.display = 'none';
    }
  });

  grupoSelect.addEventListener('change', function () {
    const selectedPrograma = programaSelect.value;
    if (this.value && datosProgramas[selectedPrograma]) {
      limpiarSelect(horarioSelect);
      rellenarOpciones(horarioSelect, datosProgramas[selectedPrograma].horarios);
      horarioDiv.style.display = 'block';
      scrollToElement(horarioDiv);
    } else {
      horarioDiv.style.display = 'none';
    }
  });

  horarioSelect.addEventListener('change', function () {
    const selectedPrograma = programaSelect.value;
    if (this.value && datosProgramas[selectedPrograma]) {
      limpiarSelect(cursoSelect);
      rellenarOpciones(cursoSelect, datosProgramas[selectedPrograma].cursos);
      cursoDiv.style.display = 'block';
      scrollToElement(cursoDiv);
    } else {
      cursoDiv.style.display = 'none';
    }
  });

  cursoSelect.addEventListener('change', function () {
    const selectedPrograma = programaSelect.value;
    if (this.value && datosProgramas[selectedPrograma]) {
      limpiarSelect(docenteSelect);
      rellenarOpciones(docenteSelect, datosProgramas[selectedPrograma].docentes);
      docenteDiv.style.display = 'block';
      scrollToElement(docenteDiv);
    } else {
      docenteDiv.style.display = 'none';
    }
  });

  docenteSelect.addEventListener('change', function () {
    if (this.value) {
      evaluacionDiv.style.display = 'block';
      scrollToElement(evaluacionDiv);
    } else {
      evaluacionDiv.style.display = 'none';
    }
  });

  btnSiguiente.addEventListener('click', () => {
    bloque1.style.display = 'none';
    bloque2.style.display = 'block';
    bloque2.scrollIntoView({ behavior: 'smooth' });
  });

  const form = document.getElementById("evaluacion-form");
  const mensaje = document.getElementById("mensaje-confirmacion");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      programa: programaSelect.value,
      modalidad: modalidadSelect.value,
      grupo: grupoSelect.value,
      horario: horarioSelect.value,
      curso: cursoSelect.value,
      docente: docenteSelect.value,
      manejoMateria: document.querySelector('input[name="manejo-materia"]:checked')?.value || "",
      claridadClase: document.querySelector('input[name="claridad-clase"]:checked')?.value || "",
      interes1: document.getElementById("interes1").value,
      interes2: document.getElementById("interes2").value,
      interes3: document.getElementById("interes3").value,
      comentarios: document.getElementById("comentarios").value,
      fecha: new Date()
    };

    try {
      await addDoc(collection(db, "evaluaciones"), data);
      form.style.display = "none";
      mensaje.style.display = "block";
      mensaje.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error al guardar en Firebase:", error);
      alert("Hubo un error al enviar tu evaluación. Intenta de nuevo.");
    }
  });

  // Hacer accesible la función cerrarPagina desde HTML
  window.cerrarPagina = function () {
    window.close();
    setTimeout(() => {
      alert("Puedes cerrar esta pestaña manualmente.");
    }, 100);
  };
});

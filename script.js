const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-receta');
  const toggleBtn = document.getElementById('btn-toggle-form');
  const contenedorRecetas = document.getElementById('recetas');

  toggleBtn.addEventListener('click', () => {
    formulario.style.display = formulario.style.display === 'none' ? 'block' : 'none';
  });

  // Mostrar recetas desde Firebase
  database.ref('recetas').on('child_added', (snapshot) => {
    const receta = snapshot.val();
    contenedorRecetas.insertAdjacentHTML('beforeend', generarHTMLReceta(receta));
  });

  // Guardar nueva receta
  document.getElementById('form-receta').addEventListener('submit', function (e) {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value.trim();
    const ingredientes = document.getElementById('ingredientes').value.trim();
    const instrucciones = document.getElementById('instrucciones').value.trim();

    const nuevaReceta = { titulo, ingredientes, instrucciones };

    database.ref('recetas').push(nuevaReceta);

    this.reset();
    formulario.style.display = 'none';
  });

  function generarHTMLReceta(receta) {
    const ingHTML = receta.ingredientes.split('\n').map(i => `<li>${i}</li>`).join('');
    const instrHTML = receta.instrucciones.split('\n').map(i => `<li>${i}</li>`).join('');

    return `
      <div class="receta">
        <h2>${receta.titulo}</h2>
        <h3>Ingredientes:</h3>
        <ul>${ingHTML}</ul>
        <h3>Instrucciones:</h3>
        <ol>${instrHTML}</ol>
      </div>
    `;
  }
});

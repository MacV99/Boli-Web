let $closeCurso = document.getElementById('close-curso');
let $vCurso = document.getElementById('v-curso');

// CERRAR CURSO
$closeCurso.addEventListener('click', () => {
  $vCurso.style.display = 'none';
});



// Cargar cursos desde el archivo JSON
fetch('../JSON/cursos.json')
  .then(response => response.json())
  .then(cursos => {
    const container = document.getElementById('cursos-container');
    container.innerHTML = ''; // Limpiar contenido

    cursos.forEach(curso => {
      // Crear el contenedor del curso
      const $divCurso = document.createElement('div');
      $divCurso.classList.add('curso', 'flex-column');

      // Insertar contenido dentro del div
      $divCurso.innerHTML = `
        <img src="${curso.image}" alt="Imagen de ${curso.name}">
        <h5>${curso.name}</h5>
      `;

      // Agregar evento a cada curso
      $divCurso.addEventListener('click', () => {
        $vCurso.querySelector('img').src = `${curso.image}`;
        $vCurso.querySelector('.name').textContent = `${curso.name}`;
        $vCurso.querySelector('.instructor').textContent = `${curso.instructor}`;
        $vCurso.querySelector('.description').textContent = `${curso.description}`;
        $vCurso.querySelector('.price').textContent = `Precio: ${curso.price}`;
        $vCurso.querySelector('.duration').textContent = `Duración: ${curso.duration}`;
        $vCurso.style.display = 'flex';
      });

      // Agregar el curso al contenedor
      container.appendChild($divCurso);
    });
  })
  .catch(error => {
    console.error('Error al cargar los cursos:', error);
  });

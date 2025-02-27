document.addEventListener('DOMContentLoaded', function() {
    // Define las estrellas y la calificación
    const starContainers = document.querySelectorAll('.stars');
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        let rating = 0;

        // Añadir eventos a las estrellas
        stars.forEach(star => {
            // Evento de hover para mostrar el resaltado de estrellas
            star.addEventListener('mouseover', () => {
                const value = star.getAttribute('data-value');
                highlightStars(stars, value);
            });

            // Evento de mouseout para restaurar el resaltado original
            star.addEventListener('mouseout', () => {
                resetHighlight(stars);
            });

            // Evento de click para calificar
            star.addEventListener('click', () => {
                rating = star.getAttribute('data-value');
                updateRating(container, stars, rating);
            });
        });
    });

    // Función para resaltar las estrellas según el valor del hover
    function highlightStars(stars, value) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= value) {
                star.classList.add('hover');
            } else {
                star.classList.remove('hover');
            }
        });
    }

    // Función para restaurar el estado original de las estrellas
    function resetHighlight(stars) {
        stars.forEach(star => {
            star.classList.remove('hover');
        });
    }

    // Función para actualizar la calificación seleccionada
    function updateRating(container, stars, rating) {
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= rating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });

        // Actualiza el promedio y el número de votos
        const averageSpan = container.parentElement.querySelector('.average span');
        const votesSpan = container.parentElement.querySelector('.votes span');
        
        // Obtener los votos actuales
        let currentVotes = parseInt(votesSpan.textContent);
        let currentAverage = parseFloat(averageSpan.textContent);

        // Calcular el nuevo promedio
        let newAverage = ((currentAverage * currentVotes) + parseInt(rating)) / (currentVotes + 1);
        averageSpan.textContent = newAverage.toFixed(1);
        
        // Actualizar el número de votos
        votesSpan.textContent = currentVotes + 1;
    }
});
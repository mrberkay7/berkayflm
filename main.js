document.addEventListener('DOMContentLoaded', () => {
    const movieGrid = document.getElementById('movie-grid');
    const searchInput = document.getElementById('search');
    const playerModal = document.getElementById('player-modal');
    const playerIframe = document.getElementById('player');
    const closeBtn = document.querySelector('.close-btn');

    let movies = [];

    // Filmleri JSON dosyasından yükle
    fetch('data/movies.json')
        .then(response => response.json())
        .then(data => {
            movies = data;
            displayMovies(movies);
        });

    // Filmleri görüntüle
    function displayMovies(movies) {
        movieGrid.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            movieCard.addEventListener('click', () => {
                playerIframe.src = movie.url;
                playerModal.style.display = 'block';
            });
            movieGrid.appendChild(movieCard);
        });
    }

    // Arama fonksiyonu
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(query));
        displayMovies(filteredMovies);
    });

    // Modalı kapatma
    closeBtn.addEventListener('click', () => {
        playerModal.style.display = 'none';
        playerIframe.src = '';
    });

    window.addEventListener('click', (event) => {
        if (event.target === playerModal) {
            playerModal.style.display = 'none';
            playerIframe.src = '';
        }
    });
});

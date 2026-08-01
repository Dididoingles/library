const API_URL = "https://script.google.com/macros/s/AKfycby3NxWcJZBdiej2WkZSEh2_gLTbaSN6xSM4zoqKFYRklxO5cuiq6JQ-QkNlNBws3sdb/exec";


async function loadLibrary() {
    const grid = document.getElementById('books-grid');
    const loading = document.getElementById('loading-message');
    const spinner = document.getElementById('counter-spinner');
    const counterNumber = document.getElementById('counter-number');
    
    // Mostra o spinner enquanto carrega
    if (spinner) {
        spinner.classList.remove('hidden');
    }
    
    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        if (loading) {
            loading.style.display = 'none';
        }

        // Atualiza contador e esconde spinner
        if (counterNumber) {
            counterNumber.textContent = books.length;
        }
        if (spinner) {
            spinner.classList.add('hidden');
        }

        for (let i = 0; i < books.length; i += 4) {
            const groupData = books.slice(i, i + 4);
            const groupDiv = document.createElement('div');
            groupDiv.className = 'book-group';

            groupData.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book-item';
                
                bookDiv.dataset.title = book.Título || '';
                bookDiv.dataset.author = book.Autor || '';
                bookDiv.dataset.category = book.Categoria || '';
                bookDiv.dataset.description = book.Descrição || '';

                const badge = document.createElement('div');
                badge.className = 'btn-reveal';
                badge.innerText = 'Conheça o ebook';

                const img = new Image();
                img.src = book.Capa;
                img.className = 'book-cover';
                img.alt = book.Título || 'Capa do livro';
                img.onload = () => {
                    img.classList.add('img-loaded');
                    bookDiv.classList.add('loaded-state');
                };

                bookDiv.appendChild(badge);
                bookDiv.appendChild(img);
                bookDiv.onclick = () => {
                    const params = new URLSearchParams(book).toString();
                    window.location.href = `details.html?${params}`;
                };
                groupDiv.appendChild(bookDiv);
            });

            grid.appendChild(groupDiv);
        }
        
        document.dispatchEvent(new Event('booksLoaded'));
        
    } catch (e) {
        if (loading) {
            loading.innerText = "Erro ao carregar materiais.";
        }
        if (spinner) {
            spinner.classList.add('hidden');
        }
        if (counterNumber) {
            counterNumber.textContent = '0';
        }
    }
}

loadLibrary();

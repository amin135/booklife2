document.getElementById('searchBtn').addEventListener('click', async () => {
    const title = encodeURIComponent(document.getElementById('title').value);
    const author = encodeURIComponent(document.getElementById('author').value);
    const genre = encodeURIComponent(document.getElementById('genre').value);

    console.log('Search parameters:', { title, author, genre });

    try {
        const response = await fetch(`http://localhost:4000/api/books?title=${title}&author=${author}&genre=${genre}`);
       
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('Search results:', data);

        const resultsContainer = document.getElementById('resultsContainer');
        resultsContainer.innerHTML = '';

        if (data.length > 0) {
            data.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.textContent = `Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}`;
                resultsContainer.appendChild(bookElement);
            });
        } else {
            resultsContainer.innerHTML = 'No matching results found.';
        }
    } catch (error) {
        console.error('Error occurred while fetching books:', error);
        document.getElementById('resultsContainer').innerHTML = 'Error occurred while fetching books.';
    }
});
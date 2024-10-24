document.addEventListener('DOMContentLoaded', () => {
    const flashcard = document.getElementById('flashcard');
    const cardFront = document.getElementById('card-front');
    const cardBack = document.getElementById('card-back');
    const totalCards = document.getElementById('total-cards');
    const completedCards = document.getElementById('completed-cards');
    const remainingCards = document.getElementById('remaining-cards');
    
    const understoodButton = document.getElementById('understood');
    const notUnderstoodButton = document.getElementById('not-understood');
    const resetButton = document.getElementById('reset');
    const addCardButton = document.getElementById('add-card');
    const questionInput = document.getElementById('question');
    const answerInput = document.getElementById('answer');

    // Array flashcards bawaan
    let flashcards = [
        { question: 'Insect-borne diseases', answer: 'Penyakit yang dibawa oleh serangga' },
        { question: 'Encephalitis', answer: 'Ensefalitis (peradangan otak)' },
        { question: 'Leishmaniasis', answer: 'Leishmaniasis (penyakit akibat parasit)' },
        { question: 'Urbanisation', answer: 'Urbanisasi' },
        { question: 'Microbes', answer: 'Mikroba' },
        { question: 'Countermeasures', answer: 'Tindakan pencegahan' },
        { question: 'Vulnerability', answer: 'Kerentanan' },
        { question: 'Interventions', answer: 'Intervensi' },
        { question: 'Brackish waters', answer: 'Air payau (campuran air tawar dan air laut)' },
        { question: 'Disease detection', answer: 'Deteksi penyakit' },
    ];
    

    let queue = [...flashcards];
    let completed = 0;

    totalCards.textContent = flashcards.length;
    updateCount();
    loadNextCard(); 
    displayVocabTable(); 

    function updateCount() {
        remainingCards.textContent = queue.length;
        completedCards.textContent = completed;
    }

    function loadNextCard() {
        if (queue.length === 0) {
            alert('Semua kartu selesai! Reset untuk mulai lagi.');
            return;
        }

        const currentCard = queue[0];
        cardFront.textContent = currentCard.question; 
        cardBack.textContent = currentCard.answer; 
        flashcard.classList.remove('flipped'); 
    }

    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped'); 
    });

    flashcard.addEventListener('transitionend', () => {
        if (!flashcard.classList.contains('flipped')) {  
            loadNextCard(); 
        }
    });

    understoodButton.addEventListener('click', () => {
        if (completed < flashcards.length) { 
            queue.shift(); 
            completed++;
            updateCount();
            flashcard.classList.remove('flipped'); 
            loadNextCard();
        } else {
            alert('Semua kartu sudah selesai! Reset untuk mulai lagi.');
        }
    });

    notUnderstoodButton.addEventListener('click', () => {
        queue.push(queue.shift()); 
        loadNextCard();
    });

    resetButton.addEventListener('click', () => {
        queue = [...flashcards]; 
        completed = 0;
        updateCount();
        loadNextCard();
    });

    addCardButton.addEventListener('click', () => {
        const newQuestion = questionInput.value;
        const newAnswer = answerInput.value;

        if (newQuestion && newAnswer) {
            flashcards.push({ question: newQuestion, answer: newAnswer });
            displayVocabTable(); 
            totalCards.textContent = flashcards.length; 
            questionInput.value = ''; 
            answerInput.value = ''; 
            queue.push({ question: newQuestion, answer: newAnswer }); 
            loadNextCard(); 
        } else {
            alert("Tolong isi kedua field.");
        }
    });

    function displayVocabTable() {
        const vocabList = document.getElementById('vocab-list').getElementsByTagName('tbody')[0];
        vocabList.innerHTML = ''; 
        flashcards.forEach((flashcard, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${flashcard.question}</td>  
                <td>${flashcard.answer}</td>
                <td><button class="delete-btn" data-index="${index}">Hapus</button></td>
            `;
            vocabList.appendChild(row);
        });

       
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToDelete = e.target.getAttribute('data-index');
                flashcards.splice(indexToDelete, 1); 
                queue = queue.filter((_, i) => i !== parseInt(indexToDelete)); 
                displayVocabTable(); ab
                totalCards.textContent = flashcards.length; 
                updateCount(); 
                loadNextCard(); 
            });
        });
    }
});

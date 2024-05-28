document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cardsArray = [
        { name: 'mickey1', img: 'mickey1.png' },
        { name: 'mickey2', img: 'mickey2.png' },
        { name: 'mickey3', img: 'mickey3.png' },
        { name: 'mickey4', img: 'mickey4.png' },
        { name: 'mickey1', img: 'mickey1.png' },
        { name: 'mickey2', img: 'mickey2.png' },
        { name: 'mickey3', img: 'mickey3.png' },
        { name: 'mickey4', img: 'mickey4.png' }
    ];

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    // Shuffle cards
    cardsArray.sort(() => 0.5 - Math.random());

    // Create the game board
    function createBoard() {
        cardsArray.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.setAttribute('class', 'card');
            cardElement.setAttribute('data-id', index);
            cardElement.addEventListener('click', flipCard);

            const frontFace = document.createElement('img');
            frontFace.setAttribute('src', card.img);

            const backFace = document.createElement('div');
            backFace.setAttribute('class', 'back');
            backFace.textContent = '?';

            cardElement.appendChild(frontFace);
            cardElement.appendChild(backFace);
            gameBoard.appendChild(cardElement);
        });
    }

    // Flip card
    function flipCard() {
        const cardId = this.getAttribute('data-id');
        cardsChosen.push(cardsArray[cardId].name);
        cardsChosenId.push(cardId);
        this.classList.add('flip');

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // Check for matches
    function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            cards[optionOneId].style.visibility = 'hidden';
            cards[optionTwoId].style.visibility = 'hidden';
            cardsWon.push(cardsChosen);
        } else {
            cards[optionOneId].classList.remove('flip');
            cards[optionTwoId].classList.remove('flip');
        }
        cardsChosen = [];
        cardsChosenId = [];
    }

    createBoard();
});

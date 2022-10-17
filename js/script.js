/*  -----------------------------------------------------------------------------------------------
    L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
    Ogni cella ha un numero progressivo, da 1 a 100.
    Ci saranno quindi 10 caselle per ognuna delle 10 righe.
    Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
    Bonus
    Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
    - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
    - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
    - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
--------------------------------------------------------------------------------------------------- */

// Prendo il bottone play
const playBUTTON = document.getElementById('play');

// Prendo il div che starà sopra il main dopo aver perso
const containeMsgHTML = document.getElementById('container-msg');

function play() {
    console.log('Inizio gioco...');
    const NUM_BOMB = 16;
    const bombsPosition = [];
    let numCell;
    const fieldGame = document.getElementById('field-game');
    fieldGame.innerHTML = '';
    
    // proprietà per aggiungere le classi ad ogni click del bottone play
    containeMsgHTML.className = 'container-pop-up invisible';
    const levelHTML = document.getElementById('livello');
    const level = levelHTML.value;
    switch(level) {
        case '0':
            alert('Devi selezionare un livello di difficoltà!');
            return;
        case '1':
            numCell = 100;
            break;
        case '2':
            numCell = 81;
            break;
        case '3':
            numCell = 49;
            break;
    }

    // Funzione per far sparire il titolo dopo aver cliccato play
    function titleDisappear() {
        const titleHTML = document.getElementById('title');
        titleHTML.classList = 'd-none';
    }


    // funzione che genera la cella
    function drawCell(num) {
        const cellPerSide = Math.sqrt(numCell);
        const cell = document.createElement('div');
        cell.className = 'square';
        cell.style.width = `calc(100% / ${cellPerSide})`;
        cell.style.height = `calc(100% / ${cellPerSide})`;
        cell.innerHTML = `
            <span></span>
        `;

        if(bombsPosition.includes(num)) {
            cell.classList.add('bomb');
            cell.addEventListener('click', function() {
                const arrBomb = document.querySelectorAll('.bomb');
                for(let i = 0; i < arrBomb.length; i++) {
                    arrBomb[i].classList.add('bomba');
                }
                // proprietà per far apparire il messaggio di Game Over
                containeMsgHTML.className = 'container-pop-up visible';
                document.getElementById('msg').innerHTML = 'Game Over! Riprova di nuovo!'
            });
            } else {
                cell.addEventListener('click', function() {
                    this.classList.add('right');
                });
            }
            return cell;
        }

    while(bombsPosition.length < NUM_BOMB) {
        const bomb = randomNumber(1, numCell);
        if(!bombsPosition.includes(bomb)) {
            bombsPosition.push(bomb);
        }
    }
    console.log(bombsPosition);

    // funzione che genera il campo di gioco
    function drawGrid() {
        const grid = document.createElement('div');
        grid.className = 'grid';
        for(let i = 1; i <= numCell; i++) {
            const cell = drawCell(i);
            grid.appendChild(cell);
        }
        fieldGame.appendChild(grid);
    }
    // chiamo la funzione
    drawGrid();
    titleDisappear();
}
// attacco event listener al bottono play
playBUTTON.addEventListener('click', play);
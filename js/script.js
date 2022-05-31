const statusDisplay = document.querySelector('.status');

let gameActive = true;
let currentPlayer = "🌘";
let gameState = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9,10,11],
    [12,13,14],
    [15,16,17],
    [18,19,20],
    [21,22,23],
    [24,25,26],    


    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [9,12,15],
    [10,13,16],
    [11,14,17],
    [18,21,24],
    [19,22,25],
    [20,23,26],

    
    [0,9,18],
    [1,10,19],
    [2,11,20],
    [3,12,21],
    [4,13,22],
    [5,14,23],
    [6,15,24],
    [7,16,25],
    [8,17,26],

    [0, 4, 8],
    [2, 4, 6],
    [9,13,17],
    [15,13,11],
    [18,22,26],
    [24,22,20],

    [0,12,24],
    [18,12,6],
    [1,13,25],
    [7,13,19],
    [2,14,26],
    [20,14,8],

    [0,10,20],
    [2,10,18],
    [3,13,23],
    [5,13,21],
    [6,16,26],
    [8,16,24],

    [0,13,26],
    [8,13,18],
    [2,13,24],
    [6,13,20]

];


function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    if(currentPlayer=="🌘")currentPlayer="📜";
    else if(currentPlayer=="📜")currentPlayer="✂";
    else if(currentPlayer=="✂")currentPlayer="🌘";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for(let i = 0; i <= 48; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if(a === '' || b === '' || c === '')
            continue;
        if(a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if(roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if(roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {
    
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if(gameState[clickedCellIndex] !== "" || !gameActive )
        return;
        
    // if((clickedCellIndex+1)%3!=0)
    // {
    //     if(gameState[clickedCellIndex+1]=="")
    //     return;
    // }    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}



  function handleRestartGame() {
    gameActive = true;
    currentPlayer = "🌘";
    gameState = ["", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", "","", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);

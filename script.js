//Query selectors
const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const xTurn = document.querySelector('#xTurn');
const oTurn = document.querySelector('#oTurn');
const announcer = document.querySelector('#announcer');
const content = document.querySelector('#content');
const btnReplay = document.querySelector('#btn-replay');
const btnPlayer = document.querySelector('#btn-player');
const btnAi = document.querySelector('#btn-ai');

const Player = (sign) =>
{
    return {sign};
};

const gameBoard = ( () =>
{
    let board = ['', '', '', '', '', '', '', '', ''];
    let turn = 1;
    let activePlayer = Player('X');
    
    const makeMove = (position, sign) =>
    {
        board[position] = sign;
    }

    const switchPlayer = (switchPlayer) =>
    {
        activePlayer = switchPlayer;
    }
    
    const getPlayer = () =>
    {
        return activePlayer;
    }

    const incrementTurn  = () =>
    {
        turn++;
    }

    const getTurn = () => 
    {
        return turn;
    }

    const restartGame = () =>
    {
        activePlayer = Player('X');
        turn = 1;
        board = ['', '', '', '', '', '', '', '', '']
        cells.forEach((cell) =>
        {
            cell.textContent = '';
        })

    }

    const winCondition = () => 
    {
        //Check rows
        if((board[0] == board[1] && board[1] == board[2] && board[0] != '') ||
           (board[3] == board[4] && board[4] == board[5] && board[3] != '') ||
           (board[6] == board[7] && board[7] == board[8] && board[6] != ''))
        {
            return true;
        }

    //Check cols
        else if((board[0] == board[3] && board[3] == board[6] && board[0] != '') ||
                (board[1] == board[4] && board[4] == board[7] && board[1] != '') ||
                (board[2] == board[5] && board[5] == board[8] && board[2] != ''))
        {
            return true;
        }

    //Check diagonals
        else if((board[0] == board[4] && board[4] == board[8] && board[0] != '') ||
                (board[2] == board[4] && board[4] == board[6] && board[2] != ''))
        {
            return true;
        }

        return false;
    }

    return{
        getPlayer,
        restartGame,
        switchPlayer,
        incrementTurn,
        getTurn,
        makeMove,
        winCondition
    }
})();

const Game = (gameMode) =>
{
    if(gameMode == 'Player')
    {
        const player1 = Player('X');
        const player2 = Player('O');

        //Add event listener to the squares
        board.addEventListener('click', function(e){
            if(e.target.textContent.length == 0) //Check if the current square is empty
            {
                gameBoard.incrementTurn();
                e.target.innerHTML = gameBoard.getPlayer().sign; // Place player's sign on the board
                gameBoard.makeMove(e.target.id, gameBoard.getPlayer().sign) // Place the sign in the array
    
                //Switch players
                if(gameBoard.getTurn() % 2 == 0 && gameBoard.winCondition() == false)
                {
                    gameBoard.switchPlayer(player2);
    
                    oTurn.style.color = 'white';
                    oTurn.style.backgroundColor = '#4e4d4d';
    
                    xTurn.style.color = '#4e4d4d';
                    xTurn.style.backgroundColor = 'white';
                }
    
                else if(gameBoard.getTurn() % 2 == 1 && gameBoard.winCondition() == false)
                {
                    gameBoard.switchPlayer(player1)
    
                    xTurn.style.color = 'white';
                    xTurn.style.backgroundColor = '#4e4d4d';
    
                    oTurn.style.color = '#4e4d4d';
                    oTurn.style.backgroundColor = 'white';
                }
            }
    
            if(gameBoard.getTurn() >= 5 && gameBoard.winCondition()) //First potential win condition comes at 5th turn
            {
                setTimeout(() => 
                {
                    announcer.style.display = 'block';
                    content.getElementsByTagName('h1')[0].innerHTML = `${gameBoard.getPlayer().sign} won!`;
                    gameBoard.restartGame();
                    xTurn.style = null;
                    oTurn.style = null;
                }, 250);
            }
            else if(gameBoard.getTurn() == 10) //Then we have a draw
            {
                setTimeout(() => 
                {
                    announcer.style.display = 'block';
                    content.getElementsByTagName('h1')[0].innerHTML = 'Draw!';
                    gameBoard.restartGame();
                    xTurn.style = null;
                    oTurn.style = null;
                }, 250);
            } 
        })
    }
}

Game('Player') 
//Event listeners

btnPlayer.addEventListener('click', () =>
{
    gameBoard.restartGame();
    xTurn.style = null;
    oTurn.style = null;
    Game('Player')
})

btnReplay.addEventListener('click', () => 
{
    announcer.style.display = 'none';  
})
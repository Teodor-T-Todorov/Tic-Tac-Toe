const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const xTurn = document.querySelector('#xTurn');
const oTurn = document.querySelector('#oTurn');
const announcer = document.querySelector('#announcer');
const overlay = document.querySelector('#overlay');
const content = document.querySelector('#content');

const gameBoard = ( () =>
{
    let board = ['', '', '', '', '', '', '', '', ''];

    const makeMove = (position, sign) =>
    {
        board[position] = sign;
    }

    const clearBoard = () =>
    {
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
        makeMove,
        clearBoard,
        winCondition
    }
})();

const Player = (name, sign) =>
{
    return {name, sign};
};

const Game = (() =>
{
    const player1 = Player('Player 1','x');
    const player2 = Player('Player 2','o');
    let turn = 1;

    let activePlayer = player1;

    //Add event listener to the squares
    board.addEventListener('click', function(e){
        if(e.target.textContent.length == 0) //Check if the current square is empty
        {
            turn++;
            e.target.innerHTML = activePlayer.sign; // Place player's sign on the board
            gameBoard.makeMove(e.target.id, activePlayer.sign) // Place the sign in the array

            //Switch players
            if(activePlayer == player1 && gameBoard.winCondition() == false)
            {
                activePlayer = player2;

                oTurn.style.color = 'white';
                oTurn.style.backgroundColor = '#4e4d4d';

                xTurn.style.color = '#4e4d4d';
                xTurn.style.backgroundColor = 'white';
            }

            else if(activePlayer == player2 && gameBoard.winCondition() == false)
            {
                activePlayer = player1;

                xTurn.style.color = 'white';
                xTurn.style.backgroundColor = '#4e4d4d';

                oTurn.style.color = '#4e4d4d';
                oTurn.style.backgroundColor = 'white';
            }
        }

        if(turn >= 5 && gameBoard.winCondition()) //First potential win condition comes at 5th turn
        {

            setTimeout(() => 
            {
                announcer.style.display = 'block';
                content.getElementsByTagName('h1')[0].innerHTML = `${activePlayer.name} won!`;
                gameBoard.clearBoard();
                turn = 1;
                activePlayer = player1;
                xTurn.style = null;
                oTurn.style = null;
            }, 500);
        }
        else if(turn == 9) //Then we have a draw
        {
            setTimeout(() => 
            {
                announcer.style.display = 'block';
                content.getElementsByTagName('h1')[0].innerHTML = 'Draw!';
                gameBoard.clearBoard();
                turn = 1;
                activePlayer = player1;
                xTurn.style = null;
                oTurn.style = null;
            }, 500);
        } 
    })
    
    return {};
})();

//Event listeners

overlay.addEventListener('click', (e) => 
{
    if(e.target.id == 'overlay' && e.target.id != 'content')
    {
        announcer.style.display = 'none';  
    }
})
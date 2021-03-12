//Query selectors
const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const xTurn = document.querySelector('#xTurn');
const oTurn = document.querySelector('#oTurn');
const announcer = document.querySelector('#announcer');
const announceContent = document.querySelector('#content');
const btnReplay = document.querySelector('#btn-replay');
const btnPlayer = document.querySelector('#btn-player');
const btnAI = document.querySelector('#btn-ai');

const Player = (sign) =>
{
    return {sign};
};

const playerX = Player('X');
const playerO = Player('O');

let gameModes = {
    vsPlayer: 'vsPlayer',
    vsAI: 'vsAI'
};

const game = ( () =>   
{
    let board = ['', '', '', '', '', '', '', '', ''];
    let turn = 1;
    let activePlayer = playerX; // X starts by default
    let gameMode = 'vsPlayer'; // vsPlayer mode by default

    const setGameMode = (mode) =>
    {
        gameMode = mode;
        restartGame();
    }

    const getGameMode = () =>
    {
        return gameMode;
    }
    
    const makeMove = (position, sign) =>
    {
        board[position] = sign;

        //Switch players
        if(turn % 2 == 1 && winCondition(activePlayer) == false) // Switch the player if there is no winner on the current turn
        {
            activePlayer = playerO;

            //Shows visually whose turn is now
            if(gameMode == 'vsPlayer') // We want to switch colors of current player only when we play vsPlayer
            {
                oTurn.style.color = 'white';
                oTurn.style.backgroundColor = '#4e4d4d';
                xTurn.style.color = '#4e4d4d';
                xTurn.style.backgroundColor = 'white';
            }
        }

        else if(turn % 2 == 0 && winCondition(activePlayer) == false) // Switch the player if there is no winner on the current turn
        {
            activePlayer = playerX;

            //Shows visually whose turn is now
            xTurn.style.color = 'white';
            xTurn.style.backgroundColor = '#4e4d4d';
            oTurn.style.color = '#4e4d4d';
            oTurn.style.backgroundColor = 'white';
        }

        turn++;

        if(turn >= 5 && winCondition(activePlayer)) //First potential win condition comes at 5th turn
        {
            game.announceWinner()
        }
        else if(turn == 10) //Then we have a draw
        {
            game.announceDraw();
        } 
    }

    const aiMakeMove = () =>
    {
        if(turn != 1 && board.includes(''))
        {
            let index = bestMove();
            board[index] = 'O';
            cells[index].textContent = 'O';

            turn++;
    
            if(turn >= 5 && winCondition(activePlayer)) //First potential win condition comes at 5th turn
            {
                announcer.style.display = 'block';
                announceContent.getElementsByTagName('h1')[0].innerHTML = 'AI won!' ;
            }
            else if(turn == 10) //Then we have a draw
            {
                announceDraw();
            } 
        } 
    }

    const bestMove = () =>
    {
        let bestScore = -10000;
        let bestMove;
        let score;
        for(let i = 0; i < board.length; i++)
        {
            if(board[i] == '')
            {
                board[i] = playerO.sign;
                turn++;
                score = minimax(false);
                board[i] = '';
                turn--;
                if(score > bestScore)
                {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    const minimax = (isMax) =>
    {
        if(winCondition(playerO))
        {
            return 10;
        }
        else if(winCondition(playerX))
        {
            return -10;
        }
        else if(turn == 10)
        {
            return 0;
        }

        if(isMax)
        {
            let bestScore = -10000;
            let score;
            for(let i = 0; i < board.length; i++)
            {
                if(board[i] == '')
                {
                    board[i] = playerO.sign;
                    turn++;
                    score = minimax(false);
                    board[i] = '';
                    turn--
                    bestScore = Math.max(score,bestScore);
                }
            }
            return bestScore;
        }
        else
        {
            let bestScore = 10000;
            let score;
            for(let i = 0; i < board.length; i++)
            {
                if(board[i] == '')
                {
                    board[i] = playerX.sign;
                    turn++;
                    score = minimax(true);
                    board[i] = '';
                    turn--;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
    
    const getActivePlayer = () =>
    {
        return activePlayer;
    }

    const restartGame = () =>
    {
        activePlayer = playerX;
        turn = 1;
        board = ['', '', '', '', '', '', '', '', '']
        cells.forEach((cell) =>
        {
            cell.textContent = '';
        })
        xTurn.style = null;
        oTurn.style = null;
    }

    const winCondition = (player) => 
    {
        //Check rows
        if((board[0] == player.sign && board[1] == player.sign && board[2] == player.sign) || //Check rows
           (board[3] == player.sign && board[4] == player.sign && board[5] == player.sign) ||
           (board[6] == player.sign && board[7] == player.sign && board[8] == player.sign) ||
           (board[0] == player.sign && board[3] == player.sign && board[6] == player.sign) || //Check cols
           (board[1] == player.sign && board[4] == player.sign && board[7] == player.sign) ||
           (board[2] == player.sign && board[5] == player.sign && board[8] == player.sign) ||
           (board[0] == player.sign && board[4] == player.sign && board[8] == player.sign) || //Check diagonals
           (board[2] == player.sign && board[4] == player.sign && board[6] == player.sign))
        {
            return true;
        }
  

        return false;
    }

    const announceWinner = () =>
    {
        announcer.style.display = 'block';
        announceContent.getElementsByTagName('h1')[0].innerHTML = `${game.getActivePlayer().sign} won!`;
    };

    const announceDraw = () =>
    {
        announcer.style.display = 'block';
        announceContent.getElementsByTagName('h1')[0].innerHTML = 'Draw!';
    };

    return{
        setGameMode,
        getGameMode,
        getActivePlayer,
        makeMove,
        minimax,
        bestMove,
        aiMakeMove,
        restartGame,
        announceWinner,
        announceDraw,
        winCondition
    }
})();
//Event listeners

board.addEventListener('click', function(e){ 

    // VS PLAYER
    if(e.target.textContent == '' && game.getGameMode() == 'vsPlayer') //Check if the current square is empty
    {
        e.target.textContent = game.getActivePlayer().sign; // Place player's sign on the board
        game.makeMove(e.target.id, game.getActivePlayer().sign) // Place the sign in the array
    }

    // VS AI
    if(e.target.textContent.length == 0 && game.getGameMode() == 'vsAI')
    {
        e.target.textContent = playerX.sign; // Place player's sign on the board
        game.makeMove(e.target.id, 'X')// Place the sign in the array
        game.aiMakeMove();

    }
})

// Set gamemode vs Player
btnPlayer.addEventListener('click', () =>
{
    game.setGameMode(gameModes.vsPlayer);
    btnPlayer.style.color = 'white';
    btnPlayer.style.backgroundColor = 'black'
    btnAI.style.color = 'black';
    btnAI.style.backgroundColor = 'white';
})

// Set gamemode vs AI
btnAI.addEventListener('click', () =>
{
    game.setGameMode(gameModes.vsAI);
    btnAI.style.color = 'white';
    btnAI.style.backgroundColor = 'black'
    btnPlayer.style.color = 'black'
    btnPlayer.style.backgroundColor = 'white';
})

btnReplay.addEventListener('click', () => 
{
    announcer.style.display = 'none';
    game.restartGame();
})
const gameBoard = ( () =>
{
    let board = ['', '', '', '', '', '', '', '', ''];
    const clearBoard = () => 
    board = ['', '', '', '', '', '', '', '', ''];

    return{
        clearBoard,
        board
    }
})();

//Distinguish players from the sign(x or o) they use
const Player = (sign) =>
{
    return {sign};
};

function makeMove(Player, position)
{
    gameBoard.board[position] = Player.sign;
}

function winCondition(Player)
{
    //Check rows
    if((gameBoard.board[0] == gameBoard.board[1] && gameBoard.board[1] == gameBoard.board[2] && gameBoard.board[0] != '') ||
       (gameBoard.board[3] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[5] && gameBoard.board[3] != '') ||
       (gameBoard.board[6] == gameBoard.board[7] && gameBoard.board[7] == gameBoard.board[8] && gameBoard.board[6] != ''))
    {
        console.log(`${Player.sign} wins!`)
    }

    //Check cols
    else if((gameBoard.board[0] == gameBoard.board[3] && gameBoard.board[3] == gameBoard.board[6] && gameBoard.board[0] != '') ||
            (gameBoard.board[1] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[7] && gameBoard.board[1] != '') ||
            (gameBoard.board[2] == gameBoard.board[5] && gameBoard.board[5] == gameBoard.board[8] && gameBoard.board[2] != ''))
    {
        console.log(`${Player.sign} wins!`)
    }

    //Check diagonals
    else if((gameBoard.board[0] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[8] && gameBoard.board[0] != '') ||
            (gameBoard.board[2] == gameBoard.board[4] && gameBoard.board[4] == gameBoard.board[6] && gameBoard.board[2] != ''))
    {
        console.log(`${Player.sign} wins!`)
    }
}

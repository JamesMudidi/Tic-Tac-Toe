/* main game functionality*/
function clickedCell(cell) {
    var button = document.getElementById("bnt-restart");
    button.disabled = true;
    var conditionToContinue = gameOverAll(board) == false && emptyCells(board).length > 0;

    if (conditionToContinue == true) {
        var x = cell.id.split("")[0];
        var y = cell.id.split("")[1];
        var move = setMove(x, y, HUMAN);
        if (move == true) {
            cell.innerHTML = "X";
            if (conditionToContinue)
                aiTurn();
        }
    }
    if (gameOver(board, COMP)) {
        var lines;
        var cell;
        var msg;

        if (board[0][0] == 1 && board[0][1] == 1 && board[0][2] == 1)
            lines = [[0, 0], [0, 1], [0, 2]];
        else if (board[1][0] == 1 && board[1][1] == 1 && board[1][2] == 1)
            lines = [[1, 0], [1, 1], [1, 2]];
        else if (board[2][0] == 1 && board[2][1] == 1 && board[2][2] == 1)
            lines = [[2, 0], [2, 1], [2, 2]];
        else if (board[0][0] == 1 && board[1][0] == 1 && board[2][0] == 1)
            lines = [[0, 0], [1, 0], [2, 0]];
        else if (board[0][1] == 1 && board[1][1] == 1 && board[2][1] == 1)
            lines = [[0, 1], [1, 1], [2, 1]];
        else if (board[0][2] == 1 && board[1][2] == 1 && board[2][2] == 1)
            lines = [[0, 2], [1, 2], [2, 2]];
        else if (board[0][0] == 1 && board[1][1] == 1 && board[2][2] == 1)
            lines = [[0, 0], [1, 1], [2, 2]];
        else if (board[2][0] == 1 && board[1][1] == 1 && board[0][2] == 1)
            lines = [[2, 0], [1, 1], [0, 2]];

        for (var i = 0; i < lines.length; i++) {
            cell = document.getElementById(String(lines[i][0]) + String(lines[i][1]));
            cell.style.color = "green";
        }

        msg = document.getElementById("message");
        msg.innerHTML = "You just lost, Keep practicing and try me again.";
    }
    if (emptyCells(board).length == 0 && !gameOverAll(board)) {
        var msg = document.getElementById("message");
        msg.innerHTML = "We just tied, I think we should play again";
    }
    if (gameOverAll(board) == true || emptyCells(board).length == 0) {
        button.value = "Restart";
        button.disabled = false;
    }
}

/* Restart the game*/
function restartBnt(button) {
    if (button.value == "AI Starts") {
        aiTurn();
        button.disabled = true;
    }
    else if (button.value == "Restart") {
        var htmlBoard;
        var msg;

        for (var x = 0; x < 3; x++) {
            for (var y = 0; y < 3; y++) {
                board[x][y] = 0;
                htmlBoard = document.getElementById(String(x) + String(y));
                htmlBoard.style.color = "#444";
                htmlBoard.innerHTML = "";
            }
        }
        button.value = "AI Starts";
        msg = document.getElementById("message");
        msg.innerHTML = "";
    }
}

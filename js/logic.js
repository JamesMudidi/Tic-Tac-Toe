/* minmax AI */
var board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

var HUMAN = -1;
var COMP = +1;

/* AI fuction to play the best move*/
function minimax(state, depth, player) {
    var best;

    if (player == COMP) {
        best = [-1, -1, -1000];
    }
    else {
        best = [-1, -1, +1000];
    }

    if (depth == 0 || gameOverAll(state)) {
        var score = evalute(state);
        return [-1, -1, score];
    }

    emptyCells(state).forEach(function (cell) {
        var first = cell[0];
        var second = cell[1];
        state[first][second] = player;
        var score = minimax(state, depth - 1, -player);
        state[first][second] = 0;
        score[0] = first;
        score[1] = second;

        if (player == COMP) {
            if (score[2] > best[2])
                best = score;
        }
        else {
            if (score[2] < best[2])
                best = score;
        }
    });

    return best;
}

/* AI's turn to play */
function aiTurn() {
    var x, y;
    var move;
    var cell;

    if (emptyCells(board).length == 9) {
        x = parseInt(Math.random() * 3);
        y = parseInt(Math.random() * 3);
    }
    else {
        move = minimax(board, emptyCells(board).length, COMP);
        x = move[0];
        y = move[1];
    }

    if (setMove(x, y, COMP)) {
        cell = document.getElementById(String(x) + String(y));
        cell.innerHTML = "O";
    }
}

/* winnig state */
function gameOver(state, player) {
    var win_state = [
        [state[0][0], state[0][1], state[0][2]],
        [state[1][0], state[1][1], state[1][2]],
        [state[2][0], state[2][1], state[2][2]],
        [state[0][0], state[1][0], state[2][0]],
        [state[0][1], state[1][1], state[2][1]],
        [state[0][2], state[1][2], state[2][2]],
        [state[0][0], state[1][1], state[2][2]],
        [state[2][0], state[1][1], state[0][2]],
    ];

    for (var i = 0; i < 8; i++) {
        var line = win_state[i];
        var filled = 0;
        for (var checked = 0; checked < 3; checked++) {
            if (line[checked] == player)
                filled++;
        }
        if (filled == 3)
            return true;
    }
    return false;
}

/* evaluation of state. */
function evalute(state) {
    var score = 0;

    if (gameOver(state, COMP)) {
        score = +1;
    }
    else if (gameOver(state, HUMAN)) {
        score = -1;
    } else {
        score = 0;
    }

    return score;
}

/* AI or human wins */
function gameOverAll(state) {
    return gameOver(state, HUMAN) || gameOver(state, COMP);
}

function emptyCells(state) {
    var cells = [];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (state[i][j] == 0)
                cells.push([i, j]);
        }
    }

    return cells;
}

/* validate moves */
function validMove(a, b) {
    try {
        if (board[a][b] == 0) {
            return true;
        }
        else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

/* play a move, if the coordinates are valid */
function setMove(i, j, player) {
    if (validMove(i, j)) {
        board[i][j] = player;
        return true;
    }
    else {
        return false;
    }
}

const board = document.getElementById("board");

if (board) {
    const cells = document.createDocumentFragment();

    for (let index = 0; index < 16; index += 1) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cells.appendChild(cell);
    }

    board.appendChild(cells);
}

export function showGameOverOverlay() {
    const overlay = document.getElementById("game-over-overlay");

    if (overlay) {
        overlay.hidden = false;
    }
}

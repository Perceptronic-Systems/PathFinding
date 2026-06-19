const canvas = document.getElementById('main-canvas');
let width = canvas.clientWidth;
let height = canvas.clientHeight;
canvas.width = width;
canvas.height = height;

const x_cells = 25;
const y_cells = 25;
let cell_size = width / x_cells;
let view_values = false;
// Grab the toggle switch element
const valueToggle = document.getElementById('value-toggle');

valueToggle.addEventListener('change', (event) => {
    view_values = event.target.checked;
    render(cells);
});

const context = canvas.getContext('2d');

let cells;

function initializeMaze() {
    cells = [];
    for (let y = 0; y < y_cells; y++) {
        let row = []
        for (let x = 0; x < x_cells; x++) {
            let random_state = Math.random() * 3 - 2;
            if (random_state < 0) random_state = 0.00;
            random_state = Math.round(random_state)
            row.push({state: random_state, value: 100000000});
        }
        cells.push(row);
    }
}

function render(cells_to_render) {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    cells_to_render.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell.state !== 0) {
                switch (cell.state) {
                    case 1:
                        context.fillStyle = "#aaaaaa";
                        break;
                    case 2:
                        context.fillStyle = "#1dF93d";
                        break;
                    case 3:
                        context.fillStyle = "#F91d1d";
                        break;
                }
                context.fillRect(x * cell_size, y * cell_size, cell_size, cell_size);
            } else {
                context.fillStyle = "#08090b";
                context.fillRect(x * cell_size, y * cell_size, cell_size, cell_size);
                if (cell.value < 100000000 && view_values) {
                    context.fillStyle = '#ffffff';
                    context.font = '10px Arial';
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillText(cell.value, x * cell_size + cell_size / 2, y * cell_size + cell_size / 2);
                }
            }
        });
    });
}

function determine_random_pos(cell_type) {
    let colliding = true;
    let cell_x = 0;
    let cell_y = 0;
    while (colliding) {
        cell_x = Math.round(Math.random() * x_cells - 1);
        cell_y = Math.round(Math.random() * y_cells - 1);
        cell_x = Math.min(Math.max(cell_x, 0), x_cells - 1);
        cell_y = Math.min(Math.max(cell_y, 0), y_cells - 1);
        if (cells[cell_y][cell_x] && cells[cell_y][cell_x].state === 0) {
            colliding = false;
            cells[cell_y][cell_x].state = cell_type;
            return [cell_x, cell_y];
        }
    }
}

function checkCell(x, y, checkValue) {
    const cell = cells[y]?.[x] ?? { state: 1, value: 100000000 };

    if (cell.state !== 1 && checkValue < cell.value) {
        return true;
    } else {
        return false;
    }
}

function checkLower(nextMove, check_x, check_y, checkValue) {
    const cell = cells[check_y]?.[check_x] ?? { state: 1, value: 100000000 };

    if (cell.state !== 1 && checkValue > cell.value) {
        nextMove = {x: check_x, y: check_y, value: cell.value};
    }
    return nextMove;
}

function generateMap(grid, x, y, p_x, p_y) {
    let map = [];
    let checkNodes = [{'x': x, 'y': y, 'value': 0}];
    let foundPlayer = false;
    while (checkNodes.length > 0) {
        let newNodes = []
        checkNodes.forEach(node => {
            if (foundPlayer || (node.x === p_x && node.y === p_y)) {
                foundPlayer = true;
                newNodes = [];
            } else {
                cells[node.y][node.x].value = node.value;
                if (checkCell(node.x, node.y + 1, node.value + 1)) newNodes.push({'x': node.x, 'y': node.y + 1, 'value': node.value + 1});
                if (checkCell(node.x, node.y - 1, node.value + 1)) newNodes.push({'x': node.x, 'y': node.y - 1, 'value': node.value + 1});
                if (checkCell(node.x + 1, node.y, node.value + 1)) newNodes.push({'x': node.x + 1, 'y': node.y, 'value': node.value + 1});
                if (checkCell(node.x - 1, node.y, node.value + 1)) newNodes.push({'x': node.x - 1, 'y': node.y, 'value': node.value + 1});
            }
        });
        checkNodes = newNodes;
    }
    return foundPlayer;
}

function move(origin_x, origin_y, dest_x, dest_y) {
    cells[dest_y][dest_x].state = 3;
    cells[origin_y][origin_x].state = 0;
}

let goal_x, goal_y, player_x, player_y, finished;

function restart() {
    finished = false;
    let solvable = false;
    while (solvable === false) {
        initializeMaze();
        [goal_x, goal_y] = determine_random_pos(2);
        [player_x, player_y] = determine_random_pos(3);
        solvable = generateMap(cells, goal_x, goal_y, player_x, player_y);
    }
}
restart();

function animate() {
    const player_value = cells[player_y][player_x].value;
    let nextMove = {player_x, player_y, value: player_value}
    nextMove = checkLower(nextMove, player_x, player_y + 1, nextMove.value);
    nextMove = checkLower(nextMove, player_x, player_y - 1, nextMove.value);
    nextMove = checkLower(nextMove, player_x + 1, player_y, nextMove.value);
    nextMove = checkLower(nextMove, player_x - 1, player_y, nextMove.value);

    if (player_x !== goal_x || player_y !== goal_y) {
        move(player_x, player_y, nextMove.x, nextMove.y);
        player_x = nextMove.x;
        player_y = nextMove.y;
    } else if (finished === false) {
        restart();
    }
    render(cells);
}

setInterval(() => {
    animate();
}, 200);
const canvas = document.getElementById('main-canvas');
let width = canvas.clientWidth;
let height = canvas.clientHeight;
canvas.width = width;
canvas.height = height;

const x_cells = 30;
const y_cells = 30;
let cell_size = width / x_cells;

const context = canvas.getContext('2d');

let cells = [];
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

function render(cells_to_render) {
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
        console.log(`X: ${cell_x} Y: ${cell_y}`);
        if (cells[cell_y][cell_x] && cells[cell_y][cell_x].state === 0) {
            colliding = false;
            cells[cell_y][cell_x].state = cell_type;
        }
    }
}

determine_random_pos(2);
determine_random_pos(3);
render(cells);
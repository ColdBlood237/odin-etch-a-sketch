const grid = document.getElementById("grid");


function makeRows(rows, cols) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.className = "grid-item";
        grid.appendChild(cell);
    };
};

makeRows(16, 16);

const cells = document.querySelectorAll(".grid-item");

cells.forEach(element => {
    element.addEventListener("mouseover", (e) => {
        e.target.style.backgroundColor = "black";
    });
});
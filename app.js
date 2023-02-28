const grid = document.getElementById("grid");
const changeLayoutButton = document.getElementById("change-layout");
const resetButton = document.getElementById("reset-button");


makeGrid(16, 16);
draws();


changeLayoutButton.addEventListener("click", () => {
    const sideValue = prompt("Enter the number of squares per side (max 100): ");
    if (sideValue > 1 && sideValue <= 100) {
        removeGrid();
        makeGrid(sideValue, sideValue);
        draws();
    }
});

resetButton.addEventListener("click", resetGrid);

function makeGrid(rows, cols) {
    grid.style.setProperty('--grid-rows', rows);
    grid.style.setProperty('--grid-cols', cols);
    for (c = 0; c < (rows * cols); c++) {
        let cell = document.createElement("div");
        cell.className = "grid-item";
        grid.appendChild(cell);
    };
};

function removeGrid() {
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach(cell => {
        cell.remove();
    })
};

function resetGrid() {
    const cells = document.querySelectorAll(".grid-item");
    console.log(cells);
    cells.forEach(element => {
        element.style.backgroundColor = "white";
    });
}

function draws() {
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach(element => {
        element.addEventListener("mouseover", (e) => {
            let pixelColor = e.target.style.backgroundColor;
            if (pixelColor === "") {
                var R = Math.round(Math.random() * 255);
                var G = Math.round(Math.random() * 255);
                var B = Math.round(Math.random() * 255);
                e.target.style.backgroundColor = `rgb(${R},${G},${B})`;
            }
            else if (pixelColor !== "" && pixelColor !== "rgb(0,0,0)") {
                console.log(pixelColor);
            }
        });
    });
}




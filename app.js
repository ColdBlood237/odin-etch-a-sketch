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
    cells.forEach(element => {
        element.style.backgroundColor = "white";
    });
}

function draws() {
    const cells = document.querySelectorAll(".grid-item");
    cells.forEach(element => {
        element.addEventListener("mouseover", (e) => {
            let pixelColor = e.target.style.backgroundColor;
            // if pixel is empty we add a color
            if (pixelColor === "") {
                e.target.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
            }
            // if there's already a color we darken it by 10%
            else if (pixelColor !== "" && pixelColor !== "#000000") {
                let RGBArray = rgbStringToRgbArray(pixelColor);
                let pixelColorHex = rgbToHex(RGBArray[0], RGBArray[1], RGBArray[2]);
                e.target.style.backgroundColor = darken(pixelColorHex, 10);
            }
        });
    });
}


// transform an rgb string of this format "rgb(xxx, xxx, xxx)" to an array of numerical values [xxx, xxx, xxx]
function rgbStringToRgbArray(rgbString) {
    let rgbArray = rgbString.slice(4, rgbString.length - 1).split(",");
    for (let i = 0; i < 3; i++) {
        rgbArray[i] = Number(rgbArray[i]);
    }
    return rgbArray;
}

function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}


function darken(color, amount) {
    color = (color.indexOf("#") >= 0) ? color.substring(1, color.length) : color;
    amount = parseInt((255 * amount) / 100);
    return color = `#${subtractLight(color.substring(0, 2), amount)}${subtractLight(color.substring(2, 4), amount)}${subtractLight(color.substring(4, 6), amount)}`;
}

function subtractLight(color, amount) {
    let cc = parseInt(color, 16) - amount;
    let c = (cc < 0) ? 0 : (cc);
    c = (c.toString(16).length > 1) ? c.toString(16) : `0${c.toString(16)}`;
    return c;
}



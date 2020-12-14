const sketchpadContainer = document.querySelector("#sketchpad");
const gridWidthSlider = document.querySelector("#grid-width-slider");
const gridElements = sketchpadContainer.getElementsByTagName("div");
const clearBtn = document.querySelector("#clear");
const whiteBtn = document.querySelector("#white-color");
const rainbowBtn = document.querySelector("#rainbow-color");
const grayScaleBtn = document.querySelector("#gray-scale-color");
const eraserBtn = document.querySelector("#eraser");
const colorPicker = document.querySelector("#color-picker");

/* Default white color */
let colorOption = "rgb(255,255,255)";
let isActive = false;
buildGrid();

gridWidthSlider.addEventListener("input", buildGrid, false);
sketchpadContainer.addEventListener("click", () => {
    isActive = !isActive;
}, false);
clearBtn.addEventListener("click", clearColor, false);
whiteBtn.addEventListener("click", () => {
    isActive = false;
    colorOption = "rgb(255,255,255)";
}, false);
rainbowBtn.addEventListener("click", () => {
    isActive = false;
    colorOption = "rainbow";
}, false);
grayScaleBtn.addEventListener("click", () => {
    isActive = false;
    colorOption = "gray-scale";
}, false);
eraserBtn.addEventListener("click", () => {
    isActive = false;
    colorOption = "eraser";
}, false);
colorPicker.addEventListener("change", () => {
    isActive = false;
    colorOption = colorPicker.value;
}, false);

function addEventListenerToCells() {
    for(i = 0; i < gridElements.length; ++i) {
        gridElements[i].addEventListener("mouseover", event => {
            if (isActive === true) {
                if (colorOption === "rainbow") {
                    randomColor = getRandomColor();
                    event.target.style["background-color"] = randomColor;
                }
                else if (colorOption === "gray-scale") {
                    darkerColor = getDarkerColor(event);
                    event.target.style["background-color"] = darkerColor;
                }
                else if (colorOption === "eraser") {
                    event.target.style.removeProperty("background-color");
                }
                else {
                    event.target.style["background-color"] = colorOption;
                }
            }
        }, false);
    };
}

function buildGrid() {
    isActive = false;

    let widthSliderValue = parseInt(gridWidthSlider.value);
    let oldSketchPadCells = sketchpadContainer.querySelectorAll("div");
    
    oldSketchPadCells.forEach( cell => cell.remove());

    numberCellsToCreate = widthSliderValue**2;

    for (i = 0; i < numberCellsToCreate; ++i) {
        let newSketchPadCell = document.createElement("div");
        sketchpadContainer.appendChild(newSketchPadCell);
    }

    styleGrid(widthSliderValue);
    addEventListenerToCells();
}

function clearColor () {
    isActive = false;
    for(i = 0; i < gridElements.length; ++i) {
        gridElements[i].style.removeProperty("background-color");
    }
}

function styleGrid(widthSliderValue) {
    sketchpadContainer.style["grid-template-columns"] = `repeat(${widthSliderValue}, 1fr)`;
    sketchpadContainer.style["grid-template-rows"] = `repeat(${widthSliderValue}, 1fr)`;
}

function getRandomColor () {
    let red, green, blue;
    
    red = Math.floor(Math.random()*255);
    green = Math.floor(Math.random()*255);
    blue = Math.floor(Math.random()*255);

    return `rgb(${red},${green},${blue})`
}

function getDarkerColor (event) {
    let cellToDarken = event.target;
    let currentCellColor = cellToDarken.style["background-color"];

    rgbString = currentCellColor ? currentCellColor.slice(4,-1) : "255,255,255";
    rgbArray = rgbString.split(",");

    
    let darkenSteps = cellToDarken.getAttribute("data-darken-steps") ? parseInt(cellToDarken.getAttribute("data-darken-steps")) : 0;

    let newRed, newGreen, neewBlue;

    newRed = rgbArray[0] - parseInt(rgbArray[0])/(10-darkenSteps);
    newGreen = rgbArray[1] - parseInt(rgbArray[1])/(10-darkenSteps);
    neewBlue = rgbArray[2] - parseInt(rgbArray[2])/(10-darkenSteps);

    cellToDarken.setAttribute("data-darken-steps", `${darkenSteps+1}`);

    return `rgb(${newRed},${newGreen},${neewBlue})`

}
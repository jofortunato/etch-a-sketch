const sketchpadContainer = document.querySelector("#sketchpad");
const gridWidthSlider = document.querySelector("#grid-width-slider");
const gridElements = sketchpadContainer.getElementsByTagName("div");
const clearBtn = document.querySelector("#clear");

let colorOption = "white";
let isActive = false;
buildGrid();

gridWidthSlider.addEventListener("input", buildGrid, false);
sketchpadContainer.addEventListener("click", () => {
    isActive = !isActive;
}, false);
clearBtn.addEventListener("click", clearColor, false);

function addEventListenerToCells() {
    for(i = 0; i < gridElements.length; ++i) {
        gridElements[i].addEventListener("mouseover", event => {
            if (isActive === true) {
                event.target.style["background-color"] = colorOption;
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
const sketchpadContainer = document.querySelector("#sketchpad");
const gridWidthSlider = document.querySelector("#grid-width-slider");
const gridElements = sketchpadContainer.getElementsByTagName("div");
const clearBtn = document.querySelector("#clear");

const testSlider = document.querySelector(".test-slider");
testSlider.innerHTML = gridWidthSlider.value;

let gridWidth = Math.sqrt(gridElements.length);
buildGrid();

let color = "white";

gridWidthSlider.addEventListener("input", buildGrid, false);

function addEventListenerToCells() {
    for(i = 0; i < gridElements.length; ++i) {
        gridElements[i].addEventListener("mouseover", event => {
            event.target.style["background-color"] = color;
        }, false);
    };
}

clearBtn.addEventListener("click", clearColor, false);

function buildGrid() {
    testSlider.innerHTML = gridWidthSlider.value;

    let sketchpadWidthSliderValue = parseInt(gridWidthSlider.value);

    if (sketchpadWidthSliderValue > gridWidth) {
        numberCellsToCreate = sketchpadWidthSliderValue**2 - gridWidth**2;

        for (let i = 0; i < numberCellsToCreate; ++i) {

            let sketchpadCell = document.createElement("div");
            sketchpadContainer.appendChild(sketchpadCell);
        }
        gridWidth = Math.sqrt(gridElements.length);
    }
    else if (sketchpadWidthSliderValue < gridWidth) {
        numberCellsToDelete = gridWidth**2 - sketchpadWidthSliderValue**2;
        for (let i = 0; i < numberCellsToDelete; ++i) {

            let sketchpadCell = sketchpadContainer.querySelector("div");
            sketchpadCell.remove();
        }
        gridWidth = Math.sqrt(gridElements.length);
    }

    sketchpadContainer.style["grid-template-columns"] = `repeat(${gridWidth}, 1fr)`;
    sketchpadContainer.style["grid-template-rows"] = `repeat(${gridWidth}, 1fr)`;

    clearColor();
    addEventListenerToCells()
}

function clearColor () {
    for(i = 0; i < gridElements.length; ++i) {
        gridElements[i].style.removeProperty("background-color");
    }
}
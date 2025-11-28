const rollDistancesChild = [
    [118.5, 12], // 12 frames total,  0 frames spacing
    [118.875, 13], // 13 frames total,  1 frame  spacing
    [134.25, 14], // 14 frames total,  2 frames spacing
    [149.625, 15], // 15 frames total,  3 frames spacing
    [161.625, 16], // 16 frames total,  4 frames spacing
    [169.875, 17], // 17 frames total,  5 frames spacing
    [178.125, 18], // 18 frames total,  6 frames spacing
    [186.375, 19], // 19 frames total,  7 frames spacing
    [194.625, 20], // 20 frames total,  8 frames spacing
    [202.875, 21], // 21 frames total,  9 frames spacing
    [211.125, 22], // 22 frames total, 10 frames spacing
    [219.375, 23], // 23 frames total, 11 frames spacing
];

const rollDistancesChildStandstill = [
    [104.25, 12], // 12 frames total,  0 frames spacing
    [104.25, 13], // 13 frames total,  1 frame  spacing
    [119.625, 14], // 14 frames total,  2 frames spacing
    [135.0, 15], // 15 frames total,  3 frames spacing
    [148.125, 16], // 16 frames total,  4 frames spacing
    [156.375, 17], // 17 frames total,  5 frames spacing
    [164.625, 18], // 18 frames total,  6 frames spacing
    [172.875, 19], // 19 frames total,  7 frames spacing
    [181.125, 20], // 20 frames total,  8 frames spacing
    [189.375, 21], // 21 frames total,  9 frames spacing
    [197.625, 22], // 22 frames total, 10 frames spacing
    [205.875, 23], // 23 frames total, 11 frames spacing
];

const rollDistancesAdult = [
    [132.0, 12], // 12 frames total, 0  frames spacing
    [133.5, 13], // 13 frames total, 1  frame  spacing
    [150.0, 14], // 14 frames total, 2  frames spacing
    [166.5, 15], // 15 frames total, 3  frames spacing
    [178.5, 16], // 16 frames total, 4  frames spacing
    [187.5, 17], // 17 frames total, 5  frames spacing
    [196.5, 18], // 18 frames total, 6  frames spacing
    [205.5, 19], // 19 frames total, 7  frames spacing
    [214.5, 20], // 20 frames total, 8  frames spacing
    [223.5, 21], // 21 frames total, 9  frames spacing
    [232.5, 22], // 22 frames total, 10 frames spacing
    [241.5, 23], // 23 frames total, 11 frames spacing
];

const rollDistancesAdultStandstill = [
    [111.0, 12], // 12 frames total, 0  frames spacing
    [111.0, 13], // 13 frames total, 1  frame  spacing
    [130.5, 14], // 14 frames total, 2  frames spacing
    [147.0, 15], // 15 frames total, 3  frames spacing
    [160.5, 16], // 16 frames total, 4  frames spacing
    [169.5, 17], // 17 frames total, 5  frames spacing
    [178.5, 18], // 18 frames total, 6  frames spacing
    [187.5, 19], // 19 frames total, 7  frames spacing
    [196.5, 20], // 20 frames total, 8  frames spacing
    [205.5, 21], // 21 frames total, 9  frames spacing
    [214.5, 22], // 22 frames total, 10 frames spacing
    [223.5, 23], // 23 frames total, 11 frames spacing
];

let spacing = 1;
let rollStrokeWidth = 2;
let rollStrokeColor = "#000000";
let textStrokeWidth = 3;
let textStrokeColor = "#000000";
let textFillColor = "#ffffff";
/* let textStrokeColor = "#ffffff";
let textFillColor = "#000000"; */
let canvasFont = "400 12px Arial";
let canvasHeight = 41;
let canvasWidth = 600;

const manualColorsArray = [
    "#a32727", // 0  spacing, red
    "#a34027", // 1  spacing is dogshit and will *almost* never occur
    "#a35b27", // 2  spacing, orange
    "#bfb836", // 3  spacing, yellow
    "#3aa327", // 4  spacing, green
    "#27a367", // 5  spacing, turquoise
    "#27a1a3", // 6  spacing, light blue
    "#276da3", // 7  spacing, cornflower blue
    "#273aa3", // 8  spacing, purpleish
    "#4827a3", // 9  spacing, purple
    "#6d27a3", // 10 spacing, purpler
    "#8d2e99", // 11 spacing, magenta
];

function drawRolls(rolls, context, canvas, stroke = false) {
    context.font = canvasFont;
    context.lineWidth = rollStrokeWidth;
    context.strokeStyle = rollStrokeColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = manualColorsArray[rolls[0]];
    let totalSpacing = rolls.reduce((a, b) => a + b, 0);
    let rollFrames = rolls.length * 12 + totalSpacing;
    let pxPerFrame = (canvas.width - 16 - spacing * (rolls.length - 1)) / rollFrames;
    let rollDrawnLength = (rolls[0] + 12) * pxPerFrame;
    if (stroke) {
        context.strokeRect(7, 7, rollDrawnLength + 2, 27);
    }
    context.fillRect(8, 8, rollDrawnLength, 25);
    let pushAlong = rollDrawnLength + spacing;
    let textPos = rollDrawnLength / 2 + 3;
    context.lineWidth = textStrokeWidth;
    context.strokeStyle = textStrokeColor;
    context.strokeText(rolls[0], textPos, 25);
    context.fillStyle = textFillColor;
    context.fillText(rolls[0], textPos, 25);
    for (let i = 1; i < rolls.length; i++) {
        context.lineWidth = rollStrokeWidth;
        context.strokeStyle = rollStrokeColor;
        context.fillStyle = manualColorsArray[rolls[i]];
        rollDrawnLength = (rolls[i] + 12) * pxPerFrame;
        if (stroke) {
            context.strokeRect(7 + pushAlong, 7, rollDrawnLength + 2, 27);
        }
        context.fillRect(8 + pushAlong, 8, rollDrawnLength, 25);
        pushAlong = pushAlong + rollDrawnLength + spacing;
        textPos = pushAlong - rollDrawnLength / 2 + 5 - spacing;
        context.lineWidth = textStrokeWidth;
        context.strokeStyle = textStrokeColor;
        context.strokeText(rolls[i], textPos, 25);
        context.fillStyle = textFillColor;
        context.fillText(rolls[i], textPos, 25);
    }
    canvas.classList.add("active");
}

function getDistance(x1, z1, x2, z2) {
    return Math.sqrt((x1 - x2) ** 2 + (z1 - z2) ** 2);
}

let unfilteredRollsResult = [];
let comboArray = [];
let lowestTime = Infinity;
let pureFilteredCombos = [];
let filteredCombosData = [];
let distances = [];
let rollsLeniency = 0;
let totalDistance = 0;

function findRolls(rolls, standstillRolls, target, currentDistance, currentCombo, currentTime, startIndex, result, standstill) {
    if (currentDistance >= target && currentDistance < target + 132) {
        result.push([currentDistance, [...currentCombo], currentTime]);
        if (currentTime < lowestTime) {
            lowestTime = currentTime;
        }
        return;
    }
    if (startIndex == rolls.length || currentCombo.length > Math.floor(target / rolls[0][0])) {
        currentCombo.pop();
        return;
    }
    for (let i = startIndex; i < rolls.length; i++) {
        newCombo = [...currentCombo];
        newCombo.push(i);
        if (standstill == true) {
            if (newCombo.length <= 1) {
                newDist = [...distances];
                newDist.push(standstillRolls[i][0]);
                findRolls(rolls, standstillRolls, target, currentDistance + standstillRolls[i][0], newCombo, currentTime + rolls[i][1], i, result, standstill);
            } else {
                findRolls(rolls, standstillRolls, target, currentDistance + rolls[i][0], newCombo, currentTime + rolls[i][1], i, result, standstill);
            }
        } else {
            findRolls(rolls, standstillRolls, target, currentDistance + rolls[i][0], newCombo, currentTime + rolls[i][1], i, result, standstill);
        }
    }
}

function resetArrays() {
    unfilteredRollsResult = [];
    comboArray = [];
    lowestTime = Infinity;
    pureFilteredCombos = [];
    filteredCombosData = [];
}

function filterRolls(leniency, exclusive = false) {
    pureFilteredCombos = [];
    filteredCombosData = [];
    if (!exclusive) {
        for (let [i, combo] of unfilteredRollsResult.entries()) {
            if (combo[2] <= lowestTime + leniency) {
                pureFilteredCombos.push(structuredClone(unfilteredRollsResult[i][1]));
                filteredCombosData.push(structuredClone(unfilteredRollsResult[i]));
            }
        }
    } else {
        for (let [i, combo] of unfilteredRollsResult.entries()) {
            if (combo[2] == lowestTime + leniency) {
                pureFilteredCombos.push(structuredClone(unfilteredRollsResult[i][1]));
                filteredCombosData.push(structuredClone(unfilteredRollsResult[i]));
            }
        }
    }
    pureFilteredCombos.reverse();
    filteredCombosData.reverse();
}

const visualizeRolls = (comboData, redOutline = false) => {
    const container = document.createElement("div");
    container.classList.add("rolls-container");

    if (redOutline) {
        container.classList.add("leniency-visualized");
    }

    const sum = comboData.reduce((acc, curr) => acc + curr + 12, 0);

    for (const roll of comboData) {
        const element = document.createElement("div");

        element.className = "roll-element";
        element.style.width = `${((roll + 12) / sum) * 100}%`;
        element.style.backgroundColor = manualColorsArray[roll];

        const inner = document.createElement("div");

        inner.innerText = roll;

        element.appendChild(inner);
        container.appendChild(element);
    }

    return container;
};

function calculateRolls(x1, z1, x2, z2, fromStandstill, isAdult) {
    totalDistance = getDistance(x1, z1, x2, z2);
    if (124.5 > totalDistance || totalDistance >= 1200) {
        setInputFields(false);
        if (totalDistance >= 1200) {
            backwalkPlease();
        }
        return;
    }
    setInputFields(true);
    console.log(`Input coordinates: [${x1}, ${z1}] [${x2}, ${z2}]`);
    let rolls = rollDistancesChild;
    let standstillRolls = rollDistancesChildStandstill;
    if (isAdult) {
        rolls = rollDistancesAdult;
        standstillRolls = rollDistancesAdultStandstill;
    }
    resetArrays();
    let startTime = performance.now();
    findRolls(rolls, standstillRolls, totalDistance, 0, comboArray, 0, 0, unfilteredRollsResult, fromStandstill);

    filterRolls(rollsLeniency);

    let endTime = performance.now();

    createRollVisualizations(filteredCombosData);

    console.log("Roll combo data: ", filteredCombosData);
    console.log("All combos: ", pureFilteredCombos);
    console.log(`Calculation took ${((endTime - startTime) / 1000).toFixed(3)}s`);
}

function validateInput() {
    let x1 = document.getElementById("startX").value;
    let z1 = document.getElementById("startZ").value;
    let x2 = document.getElementById("endX").value;
    let z2 = document.getElementById("endZ").value;
    let isAdult = document.getElementById("age").value === "1";
    let standstill = document.querySelector(".standstill").checked;

    let coords = [x1, z1, x2, z2];
    let elements = [document.getElementById("startX"), document.getElementById("startZ"), document.getElementById("endX"), document.getElementById("endZ")];
    for (let [i, j] of coords.entries()) {
        if (j === "") {
            elements[i].value = "0";
        }
    }

    if (coords.includes(NaN)) {
        for (let [i, j] of coords.entries()) {
            if (isNaN(j)) {
                elements[i].classList.add("invalid-input");
            }
        }
    } else {
        calculateRolls(x1, z1, x2, z2, standstill, isAdult);
    }
}

function setInputFields(enabled = false) {
    let elements = [document.getElementById("startX"), document.getElementById("startZ"), document.getElementById("endX"), document.getElementById("endZ")];
    for (let i of elements) {
        if (!enabled) {
            i.classList.add("invalid-input");
        } else {
            i.classList.remove("invalid-input");
        }
    }
}

document.querySelector("body").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        validateInput();
    }
});

const root = document.querySelector(":root");

let indevInvis = true;
let instructionsInvis = true;

const delay = (delayInMs) => {
    return new Promise((resolve) => setTimeout(resolve, delayInMs));
};

function toggleIndev(calledByOther = false) {
    classes = document.getElementById("coming").classList;
    indevInvis = !indevInvis;
    classes.toggle("display-none");
    displayNone(classes, indevInvis);
    if (!(instructionsInvis || calledByOther)) {
        toggleInstructions(true);
    }
}

function toggleInstructions(calledByOther = false) {
    classes = document.getElementById("instructions").classList;
    instructionsInvis = !instructionsInvis;
    classes.toggle("display-none");
    displayNone(classes, instructionsInvis);
    if (!(indevInvis || calledByOther)) {
        toggleIndev(true);
    }
}

function displayNone(classes, state) {
    if (state) {
        classes.add("display-none");
    }
}

function labelRolls(data, div, slower = false) {
    div.innerHTML = `${data[0].toFixed(3)} units in ${data[2]} frames / ${(data[2] / 20).toFixed(2)}s`;
    if (slower) {
        div.innerHTML += " (+1 frame)";
    }
}

function backwalkPlease() {
    let container = document.getElementById("canvas-container");
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(
        Object.assign(document.createElement("iframe"), {
            id: "ytembed",
            width: "600",
            height: "338",
            src: "https://www.youtube.com/embed/IjmeBBHVnTc",
        }),
    );
}

function createRollVisualizations(combos) {
    const container = document.getElementById("canvas-container");
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
    container.appendChild(Object.assign(document.createElement("div"), { id: "distancecontainer" }));
    const distContainer = document.getElementById("distancecontainer");
    distContainer.appendChild(Object.assign(document.createElement("div"), { id: "distance" }));
    document.getElementById("distance").innerText = `Distance to cover: ${totalDistance.toFixed(3)} units`;
    distContainer.appendChild(
        Object.assign(document.createElement("button"), {
            id: "leniency",
            type: "button",
            onclick: toggleLeniency,
        }),
    );
    document.getElementById("leniency").innerText = "Add 1 frame of leniency";
    if (totalDistance >= 850) {
        container.appendChild(Object.assign(document.createElement("div"), { id: "backwalksmall" }));
        document.getElementById("backwalksmall").innerText = "(You should probably backwalk this distance lol)";
    }
    if (rollsLeniency > 0) {
        for (let [i, value] of combos.entries()) {
            if (value[2] == lowestTime + rollsLeniency) {
                container.appendChild(Object.assign(document.createElement("canvaslabel"), { id: `label-${i}` }));
                container.appendChild(visualizeRolls(value[1], true));
                labelRolls(filteredCombosData[i], document.getElementById(`label-${i}`), true);
            }
        }
        container.appendChild(Object.assign(document.createElement("hr"), { id: "separator" }));
        for (let [i, value] of combos.entries()) {
            if (value[2] == lowestTime) {
                container.appendChild(Object.assign(document.createElement("canvaslabel"), { id: `label-${i + 99}` }));
                container.appendChild(container.appendChild(visualizeRolls(value[1], false)));
                labelRolls((data = filteredCombosData[i]), (div = document.getElementById(`label-${i + 99}`)));
            }
        }
    } else {
        for (let [i, value] of combos.entries()) {
            container.appendChild(Object.assign(document.createElement("canvaslabel"), { id: `label-${i}` }));
            container.appendChild(visualizeRolls(value[1], false));
            labelRolls((data = filteredCombosData[i]), (div = document.getElementById(`label-${i}`)));
        }
    }
}

function unrestrictInput(field) {
    field.classList.remove("invalid-input");
}

function toggleLeniency() {
    if (rollsLeniency == 0) {
        rollsLeniency = 1;
    } else {
        rollsLeniency = 0;
    }
    filterRolls(rollsLeniency, false);
    createRollVisualizations(filteredCombosData);
    toggleLeniencyClass();
}

function toggleLeniencyClass() {
    let element = document.getElementById("leniency");
    if (rollsLeniency == 1) {
        element.classList.add("on");
        element.innerText = "Remove 1 frame of leniency";
    } else {
        element.classList.remove("on");
    }
}

function scaleElements() {
    let root = document.querySelector(":root");
    if (window.innerWidth < 640) {
        if (lowestTime < 999) {
            canvasWidth = window.innerWidth - 40;
            createRollVisualizations(filteredCombosData);
        }
        root.style.setProperty("--canvas-width", `${window.innerWidth - 40}px`);
        root.style.setProperty("--overlay-width", `${window.innerWidth - 44}px`);
        root.style.setProperty("--button-container-margin", `${116 - (640 - window.innerWidth) / 2}px`);
    } else {
        root.style.setProperty("--canvas-width", "600px");
        root.style.setProperty("--overlay-width", "588px");
        root.style.setProperty("--button-container-margin", "116px");
        canvasWidth = 600;
    }
}

window.addEventListener("resize", function () {
    scaleElements();
});

window.addEventListener("load", (event) => {
    scaleElements();
});

/*
TODO LIST

Metronome
    Audio file with click/tap whatever sound
    Assign each combo a per roll value and loop on a button press
    Play button next to canvases created through loop with ID equivalent of combo position in sorted list (tricky with the 1 frame leniency ones)


Memoization
    ???


Individual frame data for each roll distance (zzzz)
    Not hard, just tedious af to collect and I am piss lazy lol


Initial speed input
    This depends on individual frame data for each roll distance to work properly, so I need to finish that before I do this


Slope calculation
    I need to port all the trig the game does on in-game slopes to calculate exactly how much Link is slowed down by each frame
    This also depends on individual frame data for each roll distance to work properly


Code cleanup
    Very messy rn, I want to rearrange functions into relevant sections, as well as add comments throughout my code so it's easier to read


Theme switcher??
    Light mode, potentially color blind friendly options for visualization. Not really a priority.


- Torje

*/

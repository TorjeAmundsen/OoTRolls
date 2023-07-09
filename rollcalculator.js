const rollDistancesChild = [
    [118.500, 12], // 12 frames total, 0 frames spacing
    [118.875, 13], // 13 frames total, 1 frame  spacing
    [134.250, 14], // 14 frames total, 2 frames spacing
    [149.625, 15], // 15 frames total, 3 frames spacing
    [161.625, 16], // 16 frames total, 4 frames spacing
    [169.875, 17], // 17 frames total, 5 frames spacing
    [178.125, 18], // 18 frames total, 6 frames spacing
    [186.375, 19], // 19 frames total, 7 frames spacing
    [194.625, 20], // 20 frames total, 8 frames spacing
    [202.875, 21], // 21 frames total, 9 frames spacing
];

const rollDistancesChildStandstill = [
    [116.625, 12], // 0 frames of walking roll 12f
    [116.625, 13], // 1 frame  of walking roll 13f
    [132.000, 14], // 2 frames of walking roll 14f
    [147.375, 15], // 3 frames of walking roll 15f
    [160.500, 16], // 4 frames of walking roll 16f
    [168.750, 17], // 5 frames of walking roll 17f
    [177.000, 18], // 6 frames of walking roll 18f
    [185.250, 18], // 7 frames of walking roll 19f
    [193.500, 18]  // 8 frames of walking roll 20f
];

const rollDistancesAdult = [
    [132.000, 12], // 12 frames total, 0 frames spacing
    [133.500, 13], // 13 frames total, 1 frame  spacing
    [150.000, 14], // 14 frames total, 2 frames spacing
    [166.500, 15], // 15 frames total, 3 frames spacing
    [178.500, 16], // 16 frames total, 4 frames spacing
    [187.500, 17], // 17 frames total, 5 frames spacing
    [196.500, 18], // 18 frames total, 6 frames spacing
    [205.500, 19], // 19 frames total, 7 frames spacing
    [214.500, 20], // 20 frames total, 8 frames spacing
    [223.500, 21]  // 21 frames total, 9 frames spacing
];

const rollDistancesAdultStandstill = [
    // Coming
];

let allPossibleCombos = [];
let allPossibleCombosEven = [];

let rollsDistMatrix = Array(10).fill().map(() => Array(10).fill(0));
let rollsTimeMatrix = Array(10).fill().map(() => Array(10).fill(0));

let memoTime = Array(10).fill().map(() => Array(10).fill(999));
let memoDist = Array(10).fill().map(() => Array(10).fill(null));

let mainCanvas = document.getElementById("main-canvas");
let mainContext = mainCanvas.getContext("2d");

let evenCanvas = document.getElementById("even-canvas");
let evenContext = evenCanvas.getContext("2d");

let spacing             = 1;
let rollStrokeWidth     = 2;
let rollStrokeColor     = "#000000";
let textStrokeWidth     = 2;
let textStrokeColor     = "#ffffff"
let textFillColor       = "#000000"

mainCanvas.height = 25+16;
mainCanvas.width = 600;

mainCanvas.style.background = "#12161c";

mainContext.font = "bold 12px arial, sans-serif"

evenCanvas.height = 25+16;
evenCanvas.width = 600;

evenCanvas.style.background = "#12161c";

evenContext.font = "bold 12px arial, sans-serif"

const manualColorsArray = [
    "#c22929", // 0 spacing, red
    "#c25729", // 1 spacing is dogshit and will never occur
    "#c26929", // 2 spacing, orange
    "#c2c229", // 3 spacing, yellow
    "#29c229", // 4 spacing, green
    "#29c2ab", // 5 spacing, turquoise
    "#29b0c2", // 6 spacing, light blue
    "#2964c2", // 7 spacing, cornflower blue
    "#2936c2", // 8 spacing, purpleish
    "#4529c2"  // 9 spacing, purple
]

function drawRolls(rolls, context, canvas, stroke = false) {
    context.lineWidth = rollStrokeWidth;
    context.strokeStyle = rollStrokeColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = manualColorsArray[rolls[0]];
    let totalSpacing = rolls.reduce((a, b) => a + b, 0);
    let rollFrames = (rolls.length * 12) + totalSpacing;
    let pxPerFrame = (canvas.width - 16 - (spacing * (rolls.length-1))) / rollFrames;
    let rollDrawnLength = (rolls[0]+12) * pxPerFrame;
    if (stroke) {
        context.strokeRect(7, 7, rollDrawnLength + 2 , 27);
    };
    context.fillRect(8, 8, rollDrawnLength, 25);
    let pushAlong = rollDrawnLength + spacing;
    let textPos = (rollDrawnLength/2) + 3;
    context.lineWidth = textStrokeWidth;
    context.strokeStyle = textStrokeColor;
    context.strokeText(rolls[0], textPos, 25);
    context.fillStyle = textFillColor;
    context.fillText(rolls[0], textPos, 25);
    for (let i = 1; i < rolls.length; i++) {
        context.lineWidth = rollStrokeWidth;
        context.strokeStyle = rollStrokeColor;
        context.fillStyle = manualColorsArray[rolls[i]];
        rollDrawnLength = (rolls[i]+12) * pxPerFrame;
        if (stroke) {
            context.strokeRect(7 + pushAlong, 7, rollDrawnLength + 2 , 27);
        };
        context.fillRect(8 + pushAlong, 8, rollDrawnLength, 25);
        pushAlong = pushAlong + rollDrawnLength + spacing;
        textPos = (pushAlong-((rollDrawnLength/2))) + 3;
        context.lineWidth = textStrokeWidth;
        context.strokeStyle = textStrokeColor;
        context.strokeText(rolls[i], textPos, 25);
        context.fillStyle = textFillColor;
        context.fillText(rolls[i], textPos, 25);
    };
    canvas.classList.add("active");
};

function fillMatrixes(isAdult = false) {
    if (!isAdult) {
        for (let i = 0; i < rollsDistMatrix.length; i++) {
            for (let j = 0; j < rollsDistMatrix[i].length; j++) {
                rollsDistMatrix[i][j] = rollDistancesChild[i][0] + rollDistancesChild[j][0];
                rollsTimeMatrix[i][j] = rollDistancesChild[i][1] + rollDistancesChild[j][1];
            };
        };
    } else {
        for (let i = 0; i < rollsDistMatrix.length; i++) {
            for (let j = 0; j < rollsDistMatrix[i].length; j++) {
                rollsDistMatrix[i][j] = rollDistancesAdult[i][0] + rollDistancesAdult[j][0];
                rollsTimeMatrix[i][j] = rollDistancesAdult[i][1] + rollDistancesAdult[j][1];
            };
        };
    };
    console.log("Distance matrix: ", rollsDistMatrix);
};

function resetArrays() {
    allPossibleCombos = [];
    allPossibleCombosEven = [];

    rollsDistMatrix = Array(10).fill().map(() => Array(10).fill(0));
    rollsTimeMatrix = Array(10).fill().map(() => Array(10).fill(0));

    memoTime = Array(10).fill().map(() => Array(10).fill(999));
    memoDist = Array(10).fill().map(() => Array(10).fill(null));
};

function getDistance(x1, z1, x2, z2) {
    distance = Math.sqrt(((x1 - x2) ** 2) + ((z1 - z2) ** 2));
    return distance;
};

function calculateRolls(x1, z1, x2, z2, fromStandstill = true, isAdult = false) {
    console.log(`Input coordinates: [${x1}, ${z1}] [${x2}, ${z2}]`)
    
    resetArrays();
    fillMatrixes(isAdult);

    let totalDistance = getDistance(x1, z1, x2, z2);
    if (totalDistance > 15000) {
        invalidateInput(false);
        return;
    }
    let timeList1D = [];
    let distList1D = [];

    if (!isAdult) {
        optimalRollDist = rollDistancesChild[4][0];
        standstillRollDist = rollDistancesChildStandstill[4][0];
    } else {
        console.log("Adult from standstill data coming, using moving data for now.");
        optimalRollDist = rollDistancesAdult[4][0];
        standstillRollDist = optimalRollDist;
    };
    let goodRolls = Math.floor(totalDistance / optimalRollDist) - 2;
    remainderDistance = (totalDistance % optimalRollDist) + (2 * optimalRollDist);
    if (fromStandstill) {
        goodRolls = Math.floor(totalDistance / (optimalRollDist - ((Math.floor(totalDistance / optimalRollDist)) / standstillRollDist))) - 2;
        remainderDistance = remainderDistance + (optimalRollDist - standstillRollDist);
    };
    if (remainderDistance > rollsDistMatrix[9][9]) {
        remainderDistance -= optimalRollDist;
        goodRolls += 1;
    };
    if (goodRolls < 0) {
        invalidateInput();
        return;
    };
    invalidateInput(true);
    let rollComboArray = [];
    rollComboArray = Array(goodRolls).fill(4);
    console.log(`Initial roll combo: ${rollComboArray}`)

    let initialTraversed = optimalRollDist * goodRolls;
    if (fromStandstill) {
        initialTraversed = optimalRollDist * goodRolls - (optimalRollDist - standstillRollDist);
    };

    let traversedArray = [];

    for (let [i, row] of rollsTimeMatrix.entries()) {
        for (let [j, value] of row.entries()) {
            if (rollsDistMatrix[i][j] >= remainderDistance) {
                if ((timeList1D.length === 0) && (rollsTimeMatrix[i][j] <= Math.min(...timeList1D))) {
                    memoTime[i][j] = rollsTimeMatrix[i][j];
                    timeList1D.push(memoTime[i][j]);
                } else if (!(timeList1D.length === 0)) {
                    memoTime[i][j] = rollsTimeMatrix[i][j];
                    timeList1D.push(memoTime[i][j]);
                };
            };
        };
    };

    let lowestTime = Math.min(...timeList1D);

    for (let [i, row] of memoTime.entries()) {
        for (let [j, value] of row.entries()) {
            if (value == lowestTime) {
                memoDist[i][j] = rollsDistMatrix[i][j];
                distList1D.push(memoDist[i][j]);
            };
        };
    };

    let highestDist = Math.max(...distList1D);
    let lowestDist = Math.min(...distList1D);
    console.log("Highest remainder dist: ", highestDist);
    console.log("Lowest remainder dist: ", lowestDist);

    for (let [i, row] of memoDist.entries()) {
        for (let [j, value] of row.entries()) {
            if (value == highestDist) {
                if (rollComboArray.length == goodRolls) {
                    rollComboArray.push(i, j);
                } else {
                    rollComboArray.pop();
                    rollComboArray.pop();
                    rollComboArray.push(i, j);
                };
                allPossibleCombos.push(JSON.parse(JSON.stringify(rollComboArray)));
                let sortedRolls = [i, j]
                sortedRolls.sort((a, b) => Math.abs(4 - a) - Math.abs(4 - b))[0];
                rollComboArray.pop();
                rollComboArray.pop();
                rollComboArray.push(...sortedRolls);
                currentTraversed = initialTraversed + memoDist[i][j];
                traversedArray.push(currentTraversed);
            };
        };
    };

    let numLowestDist = 0;
    let lowestDistComboArray = [];

    if (lowestDist != highestDist) {
        lowestDistComboArray = Array(goodRolls).fill(4);
        for (let [i, row] of memoDist.entries()) {
            for (let [j, value] of row.entries()) {
                if (value == lowestDist) {
                    if (lowestDistComboArray.length == goodRolls) {
                        lowestDistComboArray.push(i, j);
                    } else {
                        lowestDistComboArray.pop();
                        lowestDistComboArray.pop();
                        lowestDistComboArray.push(i, j);
                    };
                    allPossibleCombos.push(JSON.parse(JSON.stringify(lowestDistComboArray)));
                    let sortedRolls = [i, j]
                    sortedRolls.sort((a, b) => Math.abs(4 - a) - Math.abs(4 - b))[0];
                    lowestDistComboArray.pop();
                    lowestDistComboArray.pop();
                    lowestDistComboArray.push(...sortedRolls);
                    currentTraversed = initialTraversed + memoDist[i][j];
                    traversedArray.push(currentTraversed);
                    numLowestDist++;
                };
            };
        };
        console.log("Lowest dist combo: ", lowestDistComboArray);
    };
    let comboLength = rollComboArray.length;
    for (let [i, j] of allPossibleCombos.entries()) {
        if (j[comboLength - 2] == 4) {
            rollComboArray = allPossibleCombos[i];
        };
    };

    let total = 0;

    for(let i = 0; i < comboLength; i++) {
        total += rollComboArray[i];
    }
    let remainder = total % comboLength;
    let avg = Math.floor(total / comboLength);
    if (avg > 4 || (avg == 4 && remainder > 1)) {
        let evenlySpacedCombo = Array(comboLength).fill(avg);
        if (remainder != 0) {
            for (let i = comboLength - 1; i > comboLength - 1 - remainder; i--) {
                evenlySpacedCombo[i] += 1
            };
        };
        drawRolls(evenlySpacedCombo, evenContext, evenCanvas, true);
    } else {
        evenCanvas.classList.remove("active")
    };
    
    drawRolls(rollComboArray, mainContext, mainCanvas, true);
    console.log("Preferred roll combo: ", rollComboArray);
    console.log("All combos: ", allPossibleCombos);
    console.log("Distances traversed: ", traversedArray);
    console.log("Lowest distance combos: ", numLowestDist);
};

function restrictInput(input) {
    let regex = /^-?\d+(\.\d+)?$/;
    let userInput = input.value;
    if (!regex.test(userInput)) {
        input.value = userInput.replace(new RegExp(`[${regex.source}]`, "g"), "");
    } else {
        input.classList.remove("invalid-input")
    }
};

function validateInput() {
    x1          = document.getElementById("startX").value;
    z1          = document.getElementById("startZ").value;
    x2          = document.getElementById("endX").value;
    z2          = document.getElementById("endZ").value;
    let coords = [
        x1,
        z1,
        x2,
        z2
    ];
    let elements = [
        document.getElementById("startX"),
        document.getElementById("startZ"),
        document.getElementById("endX"),
        document.getElementById("endZ")
    ];
    for (let [i, j] of coords.entries()) {
        if (j === "") {
            elements[i].value = "0";
        };
    };
    isAdult     = (document.getElementById("age").value === "1");
    standstill  = document.querySelector('.standstill').checked;

    if (coords.includes(NaN)) {
        for (let [i, j] of coords.entries()) {
            console.log(j)
            if (isNaN(j)) {
                elements[i].classList.add("invalid-input");
            };
        };
    } else {
        calculateRolls(x1, z1, x2, z2, standstill, isAdult);
    };
};

function invalidateInput(state = false) {
    let elements = [
        document.getElementById("startX"),
        document.getElementById("startZ"),
        document.getElementById("endX"),
        document.getElementById("endZ")
    ];
    for (let i of elements) {
        if (!state) {
            i.classList.add("invalid-input");
        } else {
            i.classList.remove("invalid-input");
        }
    };
};

document.querySelector("body").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        validateInput();
    }
});

let invis = true;
function toggleIndev(button) {
    document.getElementById("coming").classList.toggle("invis");
    invis = !invis;
    console.log("Invis: ", invis);
    if (invis) {
        button.innerHTML = "Show upcoming features"
    } else {
        button.innerHTML = "Hide upcoming features"
    }
}
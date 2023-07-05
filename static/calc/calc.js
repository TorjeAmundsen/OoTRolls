const rollComboArray = JSON.parse(document.getElementById("data").dataset.rollcombo);
const allRollCombosArray = JSON.parse(document.getElementById("data").dataset.allcombos);

let selectedRolls = rollComboArray;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let spacing             = 1;
let rollStrokeWidth     = 2;
let rollStrokeColor     = "#000000";
let textStrokeWidth     = 2;
let textStrokeColor     = "#ffffff"
let textFillColor       = "#000000"

canvas.height = 25+16;
canvas.width = 600;

canvas.style.background = "#12161c";

context.font = "bold 12px arial, sans-serif"


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


function generateHslaColors (saturation, lightness, alpha, amount) {
    let colors = [];
    let huedelta = Math.trunc(360 / amount);
    for (let i = 0; i < amount; i++) {
      let hue = i * huedelta;
      colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`);
    };
    return colors;
};

let drawnColorsArray = generateHslaColors(70, 70, 1.0, 25);

function nextColor(shiftBy) {
    factor = 1;
    if (shiftBy == 0) {
        console.log(drawnColorsArray);
        return;
    } else if (shiftBy > 0) {
        for (i = 0; i < (shiftBy*factor); i++) {
            color = drawnColorsArray.shift();
            drawnColorsArray.push(color);
        };
    } else if (shiftBy < 0) {
        for (i = 0; i > (shiftBy*factor); i--) {
            drawnColorsArray.unshift(drawnColorsArray[9]);
            drawnColorsArray.pop();
        };
    };
    context.fillStyle = drawnColorsArray[0];
    console.log(drawnColorsArray);
};

//nextColor(8);

function drawRolls(rolls, stroke = false) {
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
};

drawRolls(selectedRolls, true);

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


let allPossibleCombos = [];

let rollsDistMatrix = Array(10).fill().map(() => Array(10).fill(0));
let rollsTimeMatrix = Array(10).fill().map(() => Array(10).fill(0));

let memoTime = Array(10).fill().map(() => Array(10).fill(999));
let memoDist = Array(10).fill().map(() => Array(10).fill(null));

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
};

function getDistance(x1, z1, x2, z2) {
    distance = Math.sqrt(((x1 - x2) ** 2) + ((z1 - z2) ** 2));
    console.log(`Calculated distance: ${distance}`);
    return distance;
};

function calculateRolls(x1, z1, x2, z2, fromStandstill = true, isAdult = false) {
    let totalDistance = getDistance(x1, z1, x2, z2);
    let timeList1D = [];
    let distList1D = [];
    fillMatrixes(isAdult);
    if (!isAdult) {
        optimalRollDist = rollDistancesChild[4][0];
        standstillRollDist = rollDistancesChildStandstill[4][0];
    } else {
        console.log("Adult standstill data coming, using moving data for now.");
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
    let rollComboArray = Array(goodRolls).fill(4);
    console.log(`Initial roll combo: ${rollComboArray}`)
    for (let [i, row] of rollsTimeMatrix.entries()) {
        for (let [j, value] of row.entries()) {
            if (rollsDistMatrix[i][j] >= remainderDistance) {
                if ((timeList1D.length === 0) && (rollsTimeMatrix[i][j] <= Math.min(...timeList1D))) {
                    memoTime[i][j] = rollsTimeMatrix[i][j];
                    timeList1D.push(memoTime[i][j]);
                } else if (!(timeList1D.length === 0)) {

                };
            };
        };
    };
};

calculateRolls(12, 12, 60, 999)
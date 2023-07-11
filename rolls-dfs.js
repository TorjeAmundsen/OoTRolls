// Unused file, this is just where I developed the algorithm in isolation from the rest of the code! - Torje

const rollDistancesChild = [
    [118.500, 12], // 12 frames total,  0 frames spacing
    [118.875, 13], // 13 frames total,  1 frame  spacing
    [134.250, 14], // 14 frames total,  2 frames spacing
    [149.625, 15], // 15 frames total,  3 frames spacing
    [161.625, 16], // 16 frames total,  4 frames spacing
    [169.875, 17], // 17 frames total,  5 frames spacing
    [178.125, 18], // 18 frames total,  6 frames spacing
    [186.375, 19], // 19 frames total,  7 frames spacing
    [194.625, 20], // 20 frames total,  8 frames spacing
    [202.875, 21], // 21 frames total,  9 frames spacing
    [211.125, 22], // 22 frames total, 10 frames spacing
    [219.375, 23]  // 23 frames total, 11 frames spacing
];

const rollDistancesChildStandstill = [
    [103.625, 12], // 12 frames total,  0 frames spacing
    [103.625, 13], // 13 frames total,  1 frame  spacing
    [119.625, 14], // 14 frames total,  2 frames spacing
    [135.000, 15], // 15 frames total,  3 frames spacing
    [148.125, 16], // 16 frames total,  4 frames spacing
    [156.375, 17], // 17 frames total,  5 frames spacing
    [164.625, 18], // 18 frames total,  6 frames spacing
    [172.875, 19], // 19 frames total,  7 frames spacing
    [181.125, 20], // 20 frames total,  8 frames spacing
    [189.375, 21], // 21 frames total,  9 frames spacing
    [197.625, 22], // 22 frames total, 10 frames spacing
    [205.875, 23]  // 23 frames total, 11 frames spacing
];

const rollDistancesAdult = [
    [132.000, 12], // 12 frames total, 0  frames spacing
    [133.500, 13], // 13 frames total, 1  frame  spacing
    [150.000, 14], // 14 frames total, 2  frames spacing
    [166.500, 15], // 15 frames total, 3  frames spacing
    [178.500, 16], // 16 frames total, 4  frames spacing
    [187.500, 17], // 17 frames total, 5  frames spacing
    [196.500, 18], // 18 frames total, 6  frames spacing
    [205.500, 19], // 19 frames total, 7  frames spacing
    [214.500, 20], // 20 frames total, 8  frames spacing
    [223.500, 21], // 21 frames total, 9  frames spacing
    [232.500, 22], // 22 frames total, 10 frames spacing
    [241.500, 23]  // 23 frames total, 11 frames spacing
];

const rollDistancesAdultStandstill = [
    [111.000, 12], // 12 frames total, 0  frames spacing
    [111.000, 13], // 13 frames total, 1  frame  spacing
    [130.500, 14], // 14 frames total, 2  frames spacing
    [147.000, 15], // 15 frames total, 3  frames spacing
    [160.500, 16], // 16 frames total, 4  frames spacing
    [169.500, 17], // 17 frames total, 5  frames spacing
    [178.500, 18], // 18 frames total, 6  frames spacing
    [187.500, 19], // 19 frames total, 7  frames spacing
    [196.500, 20], // 20 frames total, 8  frames spacing
    [205.500, 21], // 21 frames total, 9  frames spacing
    [214.500, 22], // 22 frames total, 10 frames spacing
    [223.500, 23]  // 23 frames total, 11 frames spacing
];

let unfilteredRollsResult = [];
let comboArray = [];
let lowestTime = Infinity;
let calculationsDone = 0;

async function findRolls(rolls, standstillRolls, target, currentDistance, currentCombo, currentTime, startIndex, result, standstill) {
    calculationsDone++;
    if ((currentDistance >= target) && (currentDistance < target + 25)) {
        result.push([currentDistance, JSON.parse(JSON.stringify(currentCombo)), currentTime]);
        if (currentTime < lowestTime) {
            lowestTime = currentTime;
        };
    };
    if (startIndex == rolls.length || currentCombo.length > Math.floor(target / rolls[0][0])) {
        currentCombo.pop();
        return;
    };
    for (let i = startIndex; i < rolls.length; i++) {
        newCombo = JSON.parse(JSON.stringify(currentCombo));
        newCombo.push(i);
        if (standstill == true) {
            if (newCombo.length <= 1) {
                findRolls(
                    rolls, standstillRolls, target,
                    currentDistance + standstillRolls[i][0],
                    newCombo, currentTime + rolls[i][1], i, result,
                    standstill
                );
            } else {
                findRolls(
                    rolls, standstillRolls, target,
                    currentDistance + rolls[i][0],
                    newCombo, currentTime + rolls[i][1], i, result,
                    standstill
                );
            };
        } else {
            findRolls(
                rolls, standstillRolls, target,
                currentDistance + rolls[i][0],
                newCombo, currentTime + rolls[i][1], i, result,
                standstill
            );
        };
    };
};

const startTime = performance.now()

// Replace the "target" value with the nr. of units you want to travel

findRolls(
           rolls = rollDistancesAdult,   standstillRolls = rollDistancesAdultStandstill,
          target = 800,                 currentDistance = 0,
    currentCombo = comboArray,               currentTime = 0,
      startIndex = 0,                             result = unfilteredRollsResult,
      standstill = true
);
let filteredCombos = [];
let pureFilteredCombos = [];
for (let [i, combo] of unfilteredRollsResult.entries()) {
    if (combo[2] == lowestTime) {
        filteredCombos.push(unfilteredRollsResult[i]);
        pureFilteredCombos.push(unfilteredRollsResult[i][1]);
    };
};

const endTime = performance.now()

console.log(`Roll calculator recursion took ${((endTime - startTime) / 1000).toFixed(4)}s`);
console.log(filteredCombos);
console.log(pureFilteredCombos);
console.log(`Calculations done: ${calculationsDone}`);

function restrictInput(input) {
    let regex = /^-?\d+(\.\d+)?$/;
    let userInput = input.value;
    if (!regex.test(userInput)) {
        input.value = userInput.replace(new RegExp(`[${regex.source}]`, "g"), "");
    };
};

function validateInput() {
    x1 = document.getElementById("startX").value;
    z1 = document.getElementById("startZ").value;
    x2 = document.getElementById("endX").value;
    z2 = document.getElementById("endZ").value;
    console.log(x1, z1, x2, z2);
}
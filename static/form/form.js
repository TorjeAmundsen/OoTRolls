// Handle form submission
document.getElementById('coordinate-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    // Get form values
    var X1 = document.getElementById('X1').value;
    var Z1 = document.getElementById('Z1').value;
    var X2 = document.getElementById('X2').value;
    var Z2 = document.getElementById('Z2').value;
    var age = document.getElementById('age').value;
    var standstill = document.getElementById('standstill').checked;

    // Do something with the form values
    console.log('X1:', X1);
    console.log('Z1:', Z1);
    console.log('X2:', X2);
    console.log('Z2:', Z2);
    console.log('Age:', age);
    console.log('Standstill:', standstill);
  });
document.getElementById('coordinate-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var X1 = document.getElementById('X1').value;
    var Z1 = document.getElementById('Z1').value;
    var X2 = document.getElementById('X2').value;
    var Z2 = document.getElementById('Z2').value;
    var age = document.getElementById('age').value;
    var standstill = document.getElementById('standstill').checked;

    //http://localhost:5000/calc?x1=955.5?z1=-1091.86?x2=1500.86?z2=-693.457?age=child?standstill=true
    window.location.href = "http://localhost:5000/calc?x1=" + X1 + "&z1=" + Z1 + "&x2=" + X2 + "&z2=" + Z2 + "&age=" + age + "&standstill=" + standstill;
});
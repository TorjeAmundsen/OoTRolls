from flask import Flask, render_template, request
from link import Link

app = Flask(__name__)

@app.route("/")
def form():
    return render_template("form.html")


# Example url: http://localhost:5000/calc?x1=955.5?z1=-1091.86?x2=1500.86?z2=-693.457?age=child?standstill=true
@app.route("/calc/")
def calc():
    x1 = float(request.args.get("x1"))
    z1 = float(request.args.get("z1"))

    x2 = float(request.args.get("x2"))
    z2 = float(request.args.get("z2"))

    age = request.args.get("age").lower()

    standstill = request.args.get("standstill").lower()

    if all([x1, z1, x2, z2, age, standstill]) and (age in ["child", "adult"]):
        if standstill == "true":
            standstill = True
        else:
            standstill = False
        if age == "child":
            is_adult = False
        else:
            is_adult = True
        link = Link(is_adult, x1, z1, x2, z2)
        roll_combo, all_combos = link.calculate(standstill)
        distance = f"{link.distance: .3f}"
        print(f"Distance returned: {distance}")
        return render_template("calc.html", start_coords=link.start, end_coords=link.end, total_distance=distance, roll_combo=roll_combo, all_combos=all_combos)
    else:
        print("error")

if __name__ == "__main__":
    app.run(debug=True)

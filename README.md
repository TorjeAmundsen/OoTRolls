# Ocarina of Time Roll Spacing Calculator
### [Link to Webapp (GitHub Pages)](torjeamundsen.github.io/OoTRolls/)
# What is this?
In a lot of situations, Ocarina of Time speedruns rely on rolling to travel from point A to point B as fast as possible.

![lw](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/d0136e95-ecf1-4a95-84df-4907f6cbc110)
![ganon](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/a263c9ef-050b-429c-813a-08ef9359433b)



However, the way Link accelerates varies quite a bit depending on how you space your rolls, aka how many frames you spend walking inbetween each individual roll.

This calculator solves the challenge of figuring out optimal roll spacing combinations for your current situation by using a depth-first search algorithm to perform an exhaustive search on what roll combinations are possible to travel your desired distance, and then filters the resulting combos to only include the ones that travel your desired distance or more in the shortest possible time.

![chrome_qSO2L1Vl1T](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/e19901f0-b8e9-413f-92a8-8244d1015fca)

# Instructions

Input X and Z coordinates (Y/elevation is not relevant) for your starting position, and your ending position into the calculator. If you don't know how to do this, look at the instructions at the top of the webapp itself.

If your starting position is from a standstill, check the "From Standstill" option to make sure the calculator uses correct acceleration values for your first roll.

If you enter from a loading zone and Link is already accelerated you'll want to roll instantly, and use your coordinates on the frame *before* Link's velocity drops off at the end of the roll.

The calculator also includes an option to add 1 frame of leniency to your result.

This is in case the optimal result is a "toxic" roll combo such as [0, 0, 3, 3] or something, and you'd prefer a more lenient combo (or set of combos).

![chrome_VqDPFvn3Za](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/3f98ac71-305a-4bb7-9cf0-96bee5c85afe)
![XVVB78SNXQ](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/81d298a3-bd37-4f8d-9b98-23f0bfd469f5)

# Ocarina of Time Roll Spacing Calculator

In a lot of situations, Ocarina of Time speedruns rely on rolling to travel from point A to point B as fast as possible.

![lw](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/8e4b81eb-47b9-4afe-add7-cf717bc1be6f)
![ganon](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/0a412983-243e-4eb7-a079-369acbad45e3)

However, the way Link accelerates varies quite a bit depending on how you space your rolls, aka how many frames you spend walking inbetween each individual roll.

This calculator solves the challenge of figuring out optimal roll spacing combinations for your current situation by using a depth-first search algorithm to perform an exhaustive search on what roll combinations are possible to travel your desired distance, and then filters the resulting combos to only include the ones that travel your desired distance or more in the shortest possible time.

![chrome_qSO2L1Vl1T](https://github.com/TorjeAmundsen/OoTRolls/assets/14235956/e19901f0-b8e9-413f-92a8-8244d1015fca)

The calculator also includes an option to add 1 frame of leniency to your result, in case the optimal result is a "toxic" roll combo such as [0, 0, 3, 3] or something.

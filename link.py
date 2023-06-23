import math

# Test whatever 123

class Link:
    age: str = None
    distance: float = 0
    roll_distances_adult = [
        (132.0, 12), # 12 frames total, 0 frames spacing
        (133.5, 13), # 13 frames total, 1 frame  spacing
        (150.0, 14), # 14 frames total, 2 frames spacing
        (166.5, 15), # 15 frames total, 3 frames spacing
        (178.5, 16), # 16 frames total, 4 frames spacing
        (187.5, 17), # 17 frames total, 5 frames spacing
        (196.5, 18), # 18 frames total, 6 frames spacing
        (205.5, 19), # 19 frames total, 7 frames spacing
        (214.5, 20), # 20 frames total, 8 frames spacing
        (223.5, 21)  # 21 frames total, 9 frames spacing
    ]

    roll_distances_child = [
        (118.500, 12), # 12 frames total, 0 frames spacing
        (118.875, 13), # 13 frames total, 1 frame  spacing
        (134.250, 14), # 14 frames total, 2 frames spacing
        (149.625, 15), # 15 frames total, 3 frames spacing
        (161.625, 16), # 16 frames total, 4 frames spacing
        (169.875, 17), # 17 frames total, 5 frames spacing
        (178.125, 18), # 18 frames total, 6 frames spacing
        (186.375, 19), # 19 frames total, 7 frames spacing
        (194.625, 20), # 20 frames total, 8 frames spacing
        (202.875, 21)  # 21 frames total, 9 frames spacing
    ]
# (0, 3, 6, 8.25, 8.25,   8.25,   8.25,   8.25,   8.25,   8.25,   8.25,   8.25) walking data
    from_standstill_child = [
                             (116.625, 12), # 0 frames of walking roll 12f
                             (116.625, 13), # 1 frame  of walking roll 13f
                             (132.000, 14), # 2 frames of walking roll 14f
                             (147.375, 15), # 3 frames of walking roll 15f
                             (160.500, 16), # 4 frames of walking roll 16f
                             (168.750, 17), # 5 frames of walking roll 17f
                             (177.000, 18), # 6 frames of walking roll 18f
                             (185.250, 18), # 7 frames of walking roll 19f
                             (193.500, 18)  # 8 frames of walking roll 20f
    ] 
    rolls_dist_matrix = [
        [0 for x in range(10)] for y in range(10)
    ]

    rolls_time_matrix = [
        [0 for x in range(10)] for y in range(10)
    ]

    memo_time = [
        [999 for x in range(10)] for y in range(10)
    ]

    memo_dist = [
        [None for x in range(10)] for y in range(10)
    ]

    def __init__(self, age: str, start_coord: list, end_coord: list, threshold=0):
        self.start = start_coord
        self.end = end_coord
        self.age = age
        self.distance = self.calculate_distance(start_coord, end_coord)
        self.threshold = threshold
    
    def roll_combos(self):
        for i, row in enumerate(self.rolls_dist_matrix):
            for j, value in enumerate(row):
                self.rolls_dist_matrix[i][j] = self.roll_distances_child[i][0] + self.roll_distances_child[j][0]
                
        for i, row in enumerate(self.rolls_time_matrix):
            for j, value in enumerate(row):
                self.rolls_time_matrix[i][j] = self.roll_distances_child[i][1] + self.roll_distances_child[j][1]
                
        
    def calculate_distance(self, start_coord, end_coord):
        self.distance = math.sqrt(((start_coord[0]-end_coord[0])**2) + ((start_coord[1]-end_coord[1])**2))
        print(start_coord, end_coord)
        print(f"Distance to cover: {self.distance} units")
        return self.distance
    
    def child_recursion(self, target_distance, from_standstill: bool = True):
        print(f"From standstill: {from_standstill}")
        current_roll = self.roll_distances_child[4][0]
        standstill_roll = self.from_standstill_child[4][0]
        good_rolls = math.floor(target_distance / current_roll) - 2
        remainder = (target_distance % current_roll) + current_roll + current_roll
        if from_standstill:
            good_rolls = math.floor(target_distance / (current_roll - ((math.floor(target_distance / current_roll)) / standstill_roll))) - 2
            remainder = remainder + (current_roll - standstill_roll)
        if remainder > self.rolls_dist_matrix[9][9]:
            remainder -= current_roll
            good_rolls += 1
        print(f"Remainder distance: {remainder}")
        time_list_1D = []
        dist_list_1D = []
        for i, row in enumerate(self.rolls_time_matrix):
            for j, value in enumerate(row):
                if self.rolls_dist_matrix[i][j] >= remainder:
                    if time_list_1D and self.rolls_time_matrix[i][j] <= min(time_list_1D):
                        self.memo_time[i][j] = self.rolls_time_matrix[i][j]
                        time_list_1D.append(self.memo_time[i][j])
                    elif not time_list_1D:
                        self.memo_time[i][j] = self.rolls_time_matrix[i][j]
                        time_list_1D.append(self.memo_time[i][j])
                    print(time_list_1D)
#                    print(self.memo_time)

        lowest_time = min(time_list_1D)
        
        print(f"Lowest time: {lowest_time}")
        for i, row in enumerate(self.memo_time):
            for j, value in enumerate(row):
                if value == lowest_time:
                    self.memo_dist[i][j] = self.rolls_dist_matrix[i][j]
                    dist_list_1D.append(self.memo_dist[i][j])
                    print(dist_list_1D)
#                    print(self.memo_dist)
        if not self.threshold:
            highest_dist = max(dist_list_1D)
        else:
            pass
        lowest_dist = min(dist_list_1D)
        print(f"Highest distance: {highest_dist}")
        for i, row in enumerate(self.memo_dist):
            for j, value in enumerate(row):
                if value == highest_dist:
                    print(f"Do {good_rolls} good rolls, then space the next rolls by {i} frames then {j} frames.")
        if lowest_dist != highest_dist:
            for i, row in enumerate(self.memo_dist):
                for j, value in enumerate(row):
                    if value == lowest_dist:
                        print(f"To avoid bonking, do {good_rolls} good rolls, then space the next rolls by {i} frames then {j} frames.")
            print(f"All of these combinations travel your desired distance in {lowest_time} frames.\nDo the first option(s) if you want to cover as much distance as possible in those {lowest_time} frames.\nDo the second option(s) if you want to avoid bonking on something in front of you.")
        if not from_standstill:
            traversed_high = current_roll * good_rolls + highest_dist
            traversed_low = current_roll * good_rolls + lowest_dist
        else:
            traversed_high = current_roll * good_rolls + highest_dist - (current_roll - standstill_roll)
            traversed_low = current_roll * good_rolls + lowest_dist - (current_roll - standstill_roll)
        print(f"Finished calculating optimal rolls from {self.start} to {self.end}. Distance to cover: {self.distance:.2f}. Highest distance covered: {traversed_high}. Lowest distance covered: {traversed_low}")
    def calculate(self, from_standstill: bool = True):
        self.roll_combos()
        if self.age == "child":
            self.child_recursion(self.distance, from_standstill)
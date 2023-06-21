import math

class Link:
    age: str = None
    distance: float = 0
#    roll_distances_adult = [
#        ("placeholder", "weewoo")
#    ]

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

    rolls_dist_matrix = [
        [0 for x in range(10)] for y in range(10)
    ]

    rolls_time_matrix = [
        [0 for x in range(10)] for y in range(10)
    ]

    memo_time = [
        [1000 for x in range(10)] for y in range(10)
    ]

    memo_dist = [
        [None for x in range(10)] for y in range(10)
    ]

    def __init__(self, age, start_coord, end_coord):
        self.age = age
        self.distance = self.calculate_distance(start_coord, end_coord)
    
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
    
    def child_recursion(self, target_distance):
        current_roll = self.roll_distances_child[4][0]
        
        good_rolls = math.floor(target_distance / current_roll) - 2
        remainder = (target_distance % current_roll) + current_roll + current_roll
        if remainder > 405.75:
            remainder -= current_roll
            good_rolls += 1
        time_list_1D = []
        dist_list_1D = []
        for i, row in enumerate(self.rolls_time_matrix):
            for j, value in enumerate(row):
                if self.rolls_dist_matrix[i][j] >= remainder:
                    self.memo_time[i][j] = self.rolls_time_matrix[i][j]
                    time_list_1D.append(self.memo_time[i][j])
#                    print(time_list_1D)

        lowest_time = min(time_list_1D)
        
        print(f"Lowest time: {lowest_time}")
        for i, row in enumerate(self.memo_time):
            for j, value in enumerate(row):
                if value == lowest_time:
                    self.memo_dist[i][j] = self.rolls_dist_matrix[i][j]
                    dist_list_1D.append(self.memo_dist[i][j])
#                    print(dist_list_1D)

        highest_dist = max(dist_list_1D)

        print(f"Highest distance: {highest_dist}")
        for i, row in enumerate(self.memo_dist):
            for j, value in enumerate(row):
                if value == highest_dist:
                    self.best_rolls = [i, j]
                    print(f"Do {good_rolls} good rolls, then space the next rolls by {i} frames then {j} frames.")

    def calculate(self):
        self.roll_combos()
        if self.age == "child":
            self.child_recursion(self.distance)
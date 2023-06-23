from link import Link

#9f spacing roll example: [955.5, -1091.86], [1500.86, -693.457]
#start_coord = [1196.5, -1091.86], end_coord = [1500.86, -693.457]

def get_user_input():
    is_adult = input("Enter 1 for adult or 0 for child: ")
    if is_adult == "1":
        print("Age is set to adult.")
        is_adult: bool = 1
    elif is_adult == "0":
        print("Age is set to child.")
        is_adult: bool = 0
    startX = input("Enter your starting X coordinate: ")
    startZ = input("Enter your starting Z coordinate: ")
    endX = input("Enter your ending X coordinate: ")
    endZ = input("Enter your ending Z coordinate: ")

    return is_adult, startX, startZ, endX, endZ

is_adult, startX, startZ, endX, endZ = get_user_input()

rollcalc = Link(is_adult, startX, startZ, endX, endZ)

rollcalc.calculate(from_standstill = True)
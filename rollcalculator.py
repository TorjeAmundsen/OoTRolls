from link import Link

#9f spacing roll example: [955.5, -1091.86], [1500.86, -693.457]

rollcalc = Link(is_adult = True, start_coord = [1196.5, -1091.86], end_coord = [1500.86, -693.457])

rollcalc.calculate(from_standstill = True)
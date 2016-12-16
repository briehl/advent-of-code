import math

infile = "input.txt"
f = open(infile, 'r')
steps = f.read().rstrip().split(', ')

loc = [0, 0]
facing = [0, 0]
facing_deg = 90

RIGHT = -90
LEFT = 90


def change_direction(new_dir):
    global facing_deg
    global facing
    facing_deg = (new_dir + facing_deg) % 360
    facing = [int(math.cos(math.radians(facing_deg))),
              int(math.sin(math.radians(facing_deg)))]

for step in steps:
    print(loc)
    print(step)
    dir_change = step[0]
    if dir_change == 'R':
        change_direction(RIGHT)
    else:
        change_direction(LEFT)
    blocks = int(step[1:])
    loc[0] += facing[0]*blocks
    loc[1] += facing[1]*blocks

print(abs(loc[0]) + abs(loc[1]))

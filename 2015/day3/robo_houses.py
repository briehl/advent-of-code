"""
Visiting houses.

Some drunken elf is telling Santa where to go. We figure out how many
unique positions he goes.

The inputs look like this: <>^v etc. Where:
< = move west
> = move east
^ = move north
v = move south

He starts by dropping a present at the house he's at, then follows directions.
"""

from __future__ import print_function
import os
import sys
import argparse

# Be lazy and init the house sets with the key format.
santa_houses = dict({'0_0':1})
robo_houses = dict({'0_0':1})

def num_unique_houses(route):
    """
    This treats the route as a bunch of pairs, essentially.
    The first direction of each pair is given to santa, and the second direction
    to his robo-pal.

    Those coords are then updated with the update_route function, and the dict of
    houses (which are global) are also updated.

    Yeah. This is sloppy as can be. Really, there oughta be a struct for each 'actor'
    and that struct should be told to move in some direction.... but this works and
    I don't care. Whee lazy unmaintainable code!
    """
    santa_x = 0
    santa_y = 0

    robo_x = 0
    robo_y = 0

    for i in xrange(0, len(route), 2):
        (santa_x, santa_y) = update_route(santa_x, santa_y, santa_houses, route[i])
        if (i+1 < len(route)): # check if we run off the end of the route
            (robo_x, robo_y) = update_route(robo_x, robo_y, robo_houses, route[i+1])

    return len(set(santa_houses.keys()).union(set(robo_houses.keys())))

def update_route(x, y, houses, dir):
    """
    Like before, update the coord position, and the houses dict.
    """
    if dir is '^':
        y+=1
    elif dir is 'v':
        y-=1
    elif dir is '<':
        x-=1
    elif dir is '>':
        x+=1
    key = "{}_{}".format(x, y)
    if key in houses:
        houses[key] += 1
    else:
        houses[key] = 1

    return (x, y)


def parse_args():
    """
    Go go gadget simple arg parser!
    """
    p = argparse.ArgumentParser(description=__doc__.strip())
    p.add_argument("-f", "--input-file", default='', dest="in_file", help="Input parentheses file")
    return p.parse_args()

if __name__ == '__main__':
    args = parse_args()
    if args.in_file:
        route = open(args.in_file).read().strip()
        print(num_unique_houses(route))
        sys.exit(0)
    else:
        print("No input file!")
        sys.exit(1)
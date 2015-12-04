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


def num_unique_houses(route):
    """
    We're rolling around a map, right? Seems apropos to use a dict.
    Start at (x,y) = (0, 0) with one house there.
    Then, iterate over the route and update the houses
    map as needed.
    """
    houses = dict()
    x = 0
    y = 0
    key = "{}_{}".format(x, y)
    houses[key] = 1

    for d in route:
        if d is '^':
            y+=1
        elif d is 'v':
            y-=1
        elif d is '<':
            x-=1
        elif d is '>':
            x+=1
        key = "{}_{}".format(x, y)
        if key in houses:
            houses[key] += 1
        else:
            houses[key] = 1

    return len(houses.keys())


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
"""
Wrapping Paper area.

Day 2 of Advent of Code procrastination fun!

Elves gotta wrap things. We get inputs that look like this:
LxWxH
on each line, all in integers with units of feet.

Elves only work with boxes, so that's what those are.
If they need a little extra for each package - just the area of the smallest
side - how much total area of wrapping paper do they need?
"""

from __future__ import print_function
import os
import sys
import argparse

def calculate_area(box_list):
    total_area = 0
    for box in box_list:
        total_area += calc_box(box)
    return total_area

def calc_box(dim_line):
    """
    Expects dim_line to be something like "1x2x3", all integers.
    Assume that the game makers aren't dicks who put in negative
    values or non-integers or whatever.
    """
    # get the int version of a single line
    dims = map(int, dim_line.split('x'))

    # get the surface area of the box (I'm being cheeky here and not assuming
    # it's a 3D box)
    sides = []
    for i in range(0, len(dims)):
        for j in range(i+1, len(dims)):
            sides.append(dims[i]*dims[j])

    # It's a regular old rectangular box, so multiply each side by 2
    # Also, we need an extra one of the smallest side, so add the min value in
    # that list.
    return sum([x*2 for x in sides]) + min(sides)

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
        dimensions = open(args.in_file).read().strip().split('\n')
        print(calculate_area(dimensions))
        sys.exit(0)
    else:
        print("No input file!")
        sys.exit(1)
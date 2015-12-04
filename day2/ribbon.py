"""
Ribbon length.

Day 2 of Advent of Code procrastination fun!

Elves gotta wrap things. We get inputs that look like this:
LxWxH
on each line, all in integers with units of feet.

Elves only work with boxes, so that's what those are.

This script finds out how much ribbon they need, which is the 
shortest distance around its sides (boring - they only tie a single
loop around it?), + the volume of the package in feet for a bow.

So if one box is 2x3x4, they need:
2+2+3+3 feet for the ribbon.
and
2*3*4 feet for the bow.
"""

from __future__ import print_function
import os
import sys
import argparse

def calculate_length(box_list):
    total_length = 0
    for box in box_list:
        total_length += calc_box(box)
    return total_length

def calc_box(dim_line):
    """
    Expects dim_line to be something like "1x2x3", all integers.
    Assume that the game makers aren't dicks who put in negative
    values or non-integers or whatever.
    """
    # get the int version of a single line
    dims = map(int, dim_line.split('x'))

    bow = 1
    length = 0
    for side in dims:
        bow *= side
        length += side
    length -= max(dims)

    return bow + length*2



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
        print(calculate_length(dimensions))
        sys.exit(0)
    else:
        print("No input file!")
        sys.exit(1)
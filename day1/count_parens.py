"""
count_parens
------------
Given a file as input, treat each '(' as 1, and each ')' as -1. Print out the sum.

Day 1 of the 2015 Advent of Code game!
"""

from __future__ import print_function
import os
import sys
import argparse

def count_parens(paren_str):
    """
    Follows the Advent of Code day 1 parameters to return a number based on open/closed parentheses.
    I.e.:
    ( = 1
    ) = -1
    all other characters are ignored
    """
    count = 0
    for c in paren_str:
        if c is '(':
            count += 1
        elif c is ')':
            count -= 1
    return count

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
        parens = open(args.in_file).read()
        print(count_parens(parens))
        sys.exit(0)
    else:
        print("No input file!")
        sys.exit(1)
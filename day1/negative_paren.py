"""
negative_paren
--------------
Given a file as input, treat each '(' as 1, and each ')' as -1. Print out 
position when the running sum becomes negative.

Day 1 of the 2015 Advent of Code game!
"""

from __future__ import print_function
import os
import sys
import argparse

def find_neg_paren(paren_str):
    """
    Follows the Advent of Code day 1 parameters to return a number based on 
    open/closed parentheses.
    I.e.:
    ( = 1
    ) = -1
    All other characters are ignored.

    The number returned is the **position** when the running total becomes < 0.
    This is not the index, but the position in the string!
    """
    count = 0
    for (i, c) in enumerate(paren_str):
        if c is '(':
            count += 1
        elif c is ')':
            count -= 1
        if count < 0:
            return i+1
    raise ValueError('Sum never becomes negative!')

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
        try:
            parens = open(args.in_file).read()
            print(find_neg_paren(parens))
            sys.exit(0)
        except ValueError as e:
            print(e)
            sys.exit(1)
    else:
        print("No input file!")
        sys.exit(1)
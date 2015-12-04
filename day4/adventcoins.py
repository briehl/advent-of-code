"""
Given a token string, find a *ahem* AdventCoin that satisfies the following:
1. is a sequence of decimal numbers appended to the end of the token
2. is the smallest numerical sequence such that the MD5 hash of the combined
   token and seq has five zeros at the beginning.

So if we start with abcde, and putting the number 1095 on the end does this:
MD5(abcde1095) = 00000blahblahblah,

then the answer is 1095.

Usage:
python adventcoints.py -f input_file_with_token -n num_prepend_zeros

E.g.
input_file_with_token contains just the token string to seed the hash
num_prepend_zeros = number of zeros to look for at the start of the hexified hash
(5 in the example above)
"""

from __future__ import print_function
import os
import sys
import argparse
import hashlib

def find_coin(token, num_zeros):
    """
    Don't really see any other way than BRUTE FORCE AWWW YEAH.
    """
    val = 0
    pre_str = '0'*num_zeros

    while not test_hash(token + str(val), pre_str):
        val+=1

    return val

def test_hash(s, pre_str):
    hex_hash = hashlib.md5(s).hexdigest()
    return hex_hash.startswith(pre_str)

def parse_args():
    """
    Go go gadget simple arg parser!
    """
    p = argparse.ArgumentParser(description=__doc__.strip())
    p.add_argument("-f", "--input-file", default='', dest="in_file", help="Input file")
    p.add_argument("-n", "--num-zeros", default=5, type=int, dest="num_zeros", help="Num zeros at the start of the output hash")
    return p.parse_args()

if __name__ == '__main__':
    args = parse_args()
    if args.in_file:
        token = open(args.in_file).read().strip()
        print(find_coin(token, args.num_zeros))
        sys.exit(0)
    else:
        print("No input file!")
        sys.exit(1)
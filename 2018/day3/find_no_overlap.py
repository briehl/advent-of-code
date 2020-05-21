import os
from collections import (
    namedtuple,
    defaultdict
)
from typing import List

infile_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'input.txt')

class Coord:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f'{self.x},{self.y}'

    def __hash__(self):
        return hash(repr(self))

"""
Claims are int-based regions that are effectively
pixels on a screen (though the program says inches, they're
all integers so the unit doesn't really matter).

When each claim is loaded, compare it to every other claim
and find the overlapping region. This should be returned
as a set of coordinates. These are added to a growing
set. The total region of overlap of 2 or more regions is the
number of pixels (coordinates, square inches, whatever)
in that set.

There's probably a really snazzy graphics algorithm to explore
here, but let's just get it done and move on.
"""

class Claim:
    def __init__(self, claim: str):
        # #1 @ 265,241: 16x26
        # id = 1
        # 265 in from left
        # 241 in from top
        # 16 wide
        # 26 tall
        #
        # split on ' ' ->
        # [#1, @, 265,241:, 16x26]
        info = claim.split()
        self.claim_id = int(info[0][1:])
        (self.left, self.top) = info[2][:-1].split(',')
        self.left = int(self.left)
        self.top = int(self.top)
        (self.width, self.height) = info[3].split('x')
        self.width = int(self.width)
        self.height = int(self.height)
        self.right = self.left + self.width - 1
        self.bottom = self.top + self.height - 1

    def coords(self) -> List[Coord]:
        coords = list()
        for i in range(self.width):
            for j in range(self.height):
                coords.append(Coord(i+self.left, j+self.top))
        return coords

    def get_overlap(self, other) -> set:
        overlap = set()
        for c in other.coords():
            if self.is_in_claim(c):
                overlap.add(c)
        return overlap

    def is_in_claim(self, p: Coord) -> bool:
        return p.x >= self.left and p.x <= self.right and \
            p.y >= self.top and p.y <= self.bottom

    def __repr__(self):
        return f'{self.claim_id} {self.left} {self.top} {self.width} {self.height}'

    def coord_size(self):
        return self.width * self.height


all_overlaps = set()
total = 0

all_coords = defaultdict(set)
overlap_claims = defaultdict(set)

with open(infile_path) as infile:
    for line in infile.readlines():
        new_claim = Claim(line)
        total += 1
        for c in new_claim.coords():
            all_coords[c].add(new_claim.claim_id)
        # print(total)

# total_overlapping = 0
# for k,v in all_coords.items():
#     if v > 1:
#         total_overlapping += 1

# print(total_overlapping)
for coord, overlapping in all_coords.items():
    for cid in overlapping:
        overlap_claims[cid].update(overlapping - {cid})

for k,v in overlap_claims.items():
    if len(v) == 0:
        print(k)
    # print(f'{k} : {v}')
# print(overlap_claims)

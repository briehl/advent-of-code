# puzzle's simple enough, just sum together all numerical lines
# in the input.
#
# they're all numbers, so I'm not gonna error-correct. SO LAZY.

import os
total = 0

infile_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'input.txt')

with open(infile_path) as infile:
    for line in infile.readlines():
        total += int(line.strip())

print(total)

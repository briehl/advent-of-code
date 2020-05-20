# find the first time that the string of inputs
# results in the same number twice, starting at 0.
#
# if inputs are 1, 2, 3, -1, 1
# then the total is 0, 1, 3, 6, 5, 6
# And the output should be 6

import os

total = 0   # the running total
seen_values = set({total})  # update this whenever we total gets updated

infile_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'input.txt')

all_freqs = list()
with open(infile_path) as infile:
    for line in infile.readlines():
        all_freqs.append(int(line.strip()))

# keep looping over the list until we find it.
while True:
    for f in all_freqs:
        total += f
        if total in seen_values:
            print(total)
            print("DONE")
            exit(0)
        else:
            seen_values.add(total)

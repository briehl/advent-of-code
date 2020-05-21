import os
import re

def react_polymer(polymer):
    pairs_to_remove = list()
    for i in range(len(polymer)-1):
        if polymer[i] != polymer[i+1] and polymer[i].lower() == polymer[i+1].lower():
            # remove i and i+1
            if i == 0:
                return polymer[2:]
            elif i == len(polymer)-1:
                return polymer[:-2]
            else:
                return polymer[:i] + polymer[i+2:]
    return polymer

infile_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'input.txt')
with open(infile_path) as infile:
    polymer = infile.readline().strip()

monomers = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
monomered = list()
for m in monomers:
    print(m)
    removed = polymer.replace(m, '')
    removed = removed.replace(m.upper(), '')

    reacted = react_polymer(removed)
    while reacted != removed:
        removed = reacted
        reacted = react_polymer(removed)

    monomered.append((m, len(reacted)))

monomered.sort(key=lambda m: m[0])
print(monomered)


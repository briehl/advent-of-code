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

reacted = react_polymer(polymer)
while reacted != polymer:
    polymer = reacted
    reacted = react_polymer(polymer)

print(len(polymer))

import os
from collections import defaultdict
infile_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'input.txt')

def has_exact_letters(box: str, count:int=2) -> bool:
    """
    Returns True if the box str has at least one letter
    with exactly count number of repetitions.
    E.g.
    abbaaa, count=2 returns True (2 b)
    abcdef, count=2 returns False
    """
    letters = defaultdict(int)
    for letter in box:
        letters[letter] += 1
    for k,v in letters.items():
        if v == count:
            return True
    return False

twos = 0
threes = 0
with open(infile_path) as infile:
    boxes = infile.readlines()

for box in boxes:
    if has_exact_letters(box, 2):
        twos += 1
    if has_exact_letters(box, 3):
        threes += 1

print(twos * threes)



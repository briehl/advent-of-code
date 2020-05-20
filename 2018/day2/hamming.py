import os
infile_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'input.txt')

with open(infile_path) as infile:
    boxes = infile.readlines()

def hamming(s1, s2):
    if len(s1) != len(s2):
        return -1
    dist = 0
    for i in range(len(s1)):
        if s1[i] != s2[i]:
            dist += 1
    return dist

def get_diff(s1, s2):
    new_str = ''
    for i in range(len(s1)):
        if s1[i] == s2[i]:
            new_str += s1[i]
    return new_str


# SO LAZY. Just gonna brute force it. Comp each string vs. each other string.
for i in range(len(boxes)):
    for j in range(len(boxes)):
        if i==j:
            continue
        box1 = boxes[i]
        box2 = boxes[j]
        if hamming(box1, box2) == 1:
            print(get_diff(box1, box2))

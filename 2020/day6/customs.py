def calc_unique_answers(custom_group):
    unique_answers = set()
    for person in custom_group:
        unique_answers = unique_answers.union(set(person))
    return len(unique_answers)

def calc_overlap_answers(custom_group):
    if len(custom_group) == 0:
        return 0
    overlap_answers = set(custom_group.pop())
    for person in custom_group:
        overlap_answers = overlap_answers.intersection(person)
    return len(overlap_answers)


unique_answer_counts = list()
overlap_answer_counts = list()
with open("./input.txt") as infile:
    custom_group = list()
    for line in infile.readlines():
        line = line.strip()
        if len(line):
            custom_group.append(line)
        else:
            unique_answer_counts.append(calc_unique_answers(custom_group))
            overlap_answer_counts.append(calc_overlap_answers(custom_group))
            custom_group = list()
    if len(custom_group):
        unique_answer_counts.append(calc_unique_answers(custom_group))
        overlap_answer_counts.append(calc_overlap_answers(custom_group))

print('part 1 solution:')
print(sum(unique_answer_counts))
print('part 2 solution:')
print(sum(overlap_answer_counts))
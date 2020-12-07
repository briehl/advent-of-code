import re

INPUT_REGEX = r"^(?P<min_count>\d+)-(?P<max_count>\d+)\s(?P<ch>[a-z])\:\s(?P<pw>.+)$"

num_valid = 0

# Suppose you have the following list:
# 1-3 a: abcde
# 1-3 b: cdefg
# 2-9 c: ccccccccc
# Each line gives the password policy and then the password.
# The password policy indicates the lowest and highest number of times a given
# letter must appear for the password to be valid. For example, 1-3 a means that
# the password must contain a at least 1 time and at most 3 times.



def parse_password(line: str):
    m = re.match(INPUT_REGEX, line)
    return(
        int(m.group('min_count')),
        int(m.group('max_count')),
        m.group('ch'),
        m.group('pw')
    )

def is_valid_password(line):
    (min_count, max_count, char, password) = parse_password(line)
    count = 0
    for c in password:
        if c == char:
            count += 1
    return count >= min_count and count <= max_count

with open("./input.txt") as infile:
    for line in infile.readlines():
        if is_valid_password(line):
            num_valid += 1

print(num_valid)

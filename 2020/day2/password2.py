import re

INPUT_REGEX = r"^(?P<pos1>\d+)-(?P<pos2>\d+)\s(?P<ch>[a-z])\:\s(?P<pw>.+)$"

num_valid = 0

# Each policy actually describes two positions in the password, where 1
# means the first character, 2 means the second character, and so on.
# (Be careful; Toboggan Corporate Policies have no concept of "index zero"!)
#
# Exactly one of these positions must contain the given letter. Other
# occurrences of the letter are irrelevant for the purposes of policy
# enforcement.

# 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
# 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
# 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.



def parse_password(line: str):
    m = re.match(INPUT_REGEX, line)
    return(
        int(m.group('pos1')),
        int(m.group('pos2')),
        m.group('ch'),
        m.group('pw')
    )

def is_valid_password(line):
    (pos1, pos2, char, password) = parse_password(line)
    return (password[pos1-1] == char) ^ (password[pos2-1] == char)

with open("./input.txt") as infile:
    for line in infile.readlines():
        if is_valid_password(line):
            num_valid += 1

print(num_valid)

import re

# The automatic passport scanners are slow because they're having trouble
# detecting which passports have all required fields. The expected fields
# are as follows:

# byr (Birth Year)
# iyr (Issue Year)
# eyr (Expiration Year)
# hgt (Height)
# hcl (Hair Color)
# ecl (Eye Color)
# pid (Passport ID)
# cid (Country ID)

REQUIRED_FIELDS = [
    'byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'
]
ALLOW_IF_MISSING = [
    'cid'
]

class Passport:
    def __init__(self, data):
        self._data = dict()
        # data should be a single line
        fields = data.split(" ")
        for f in fields:
            kvp = f.split(':')
            self._data[kvp[0]] = kvp[1]

    def is_valid(self, optional_fields):
        for f in REQUIRED_FIELDS:
            if f not in self._data and f not in optional_fields:
                return False
        return True

    def is_valid2(self):
        for f in REQUIRED_FIELDS:
            if f not in self._data and f not in ALLOW_IF_MISSING:
                return False
            else:
                if not self._validate_field(f):
                    return False
        return True

    def _validate_field(self, f) -> bool:
        if f == 'cid':
            return True
        d = self._data[f]
        if f == 'pid':
            return re.match("^\d{9}$", d)
        elif f == 'ecl':
            return d in ['amb','blu','brn','gry','grn','hzl','oth']
        elif f == 'hcl':
            return re.match("^#[0-9a-f]{6}$", d)
        elif f == 'hgt':
            m = re.match("^(?P<v>\d+)(?P<u>in|cm)$", d)
            if not m:
                return False
            v = int(m.group('v'))
            if m.group('u') == 'cm':
                return v >= 150 and v <= 193
            else:
                return v >= 59 and v <= 76
        else:
            try:
                v = int(d)
            except:
                return False
            if f == 'byr':
                return v >= 1920 and v <= 2002
            elif f == 'iyr':
                return v >= 2010 and v <= 2020
            elif f == 'eyr':
                return v >= 2020 and v <= 2030
            else:
                return False  # don't know the field


passports = list()
with open("./input.txt") as infile:
    pp_data = list()
    for line in infile.readlines():
        line = line.strip()
        if len(line):
            pp_data.append(line)
        else:
            passports.append(Passport(" ".join(pp_data)))
            pp_data = list()
    if len(pp_data):
        passports.append(Passport(" ".join(pp_data)))

# Part 1
valid_pps = sum([1 if p.is_valid(ALLOW_IF_MISSING) else 0 for p in passports])
print("Part 1:")
print(f"{valid_pps} of {len(passports)}")

# Part 2
valid_pps = sum([1 if p.is_valid2() else 0 for p in passports])
print("\nPart 2:")
print(f"{valid_pps} of {len(passports)}")

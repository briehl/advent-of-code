
values = set()

with open("./input.txt") as infile:
    for line in infile.readlines():
        values.add(int(line))

print("2020 in two values:")
for v in values:
    if (2020 - v) in values:
        print(f"{v} {2020-v}")
        print((v * (2020-v)))
        break

print("2020 in 3 values:")
# a + b + c = 2020
for a in values:
    # d = b + c = 2020 - a
    d = 2020 - a
    for c in values:
        if (d - c) in values:
            print(f"{a} {d-c} {c}")
            print(a * (d-c) * c)
            break

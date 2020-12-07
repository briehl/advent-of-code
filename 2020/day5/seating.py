def process_seat(line):
    assert len(line) == 10
    row_bits = list()
    col_bits = list()
    for i in range(7):
        bit = '1' if line[i] == 'B' else '0'
        row_bits.append(bit)
    for i in range(7, 10):
        bit = '1' if line[i] == 'R' else '0'
        col_bits.append(bit)
    row = int(''.join(row_bits), 2)
    col = int(''.join(col_bits), 2)
    return (row, col)

highest_id = 0
seat_ids = list()
with open("./input.txt") as infile:
    for line in infile.readlines():
        (row, col) = process_seat(line.strip())
        seat_id = row * 8 + col
        if seat_id > highest_id:
            highest_id = seat_id
        seat_ids.append(seat_id)

print("part 1 solution:")
print(highest_id)
print("----------------")
print("part 2 solution:")

seat_ids = sorted(seat_ids)
last_seen = seat_ids[0]
for i in range(1, len(seat_ids)):
    if seat_ids[i] != last_seen + 1:
        print(last_seen+1)
        break
    else:
        last_seen = seat_ids[i]

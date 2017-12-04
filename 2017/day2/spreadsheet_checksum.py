INPUT_FILE = "input"


def _read_input(in_file):
    data = list()
    with open(in_file, 'r') as f:
        datalines = f.readlines()

    for line in datalines:
        data.append([int(d) for d in line.strip().split('\t')])
    f.close()
    return data


def calc_checksum(ss):
    checksum = 0
    for line in ss:
        checksum += max(line) - min(line)
    return checksum


def get_pairs(arr):
    i = 0
    j = 1
    while i < len(arr):
        while j < len(arr):
            yield (arr[i], arr[j])
            j += 1
        i += 1
        j = i + 1


def even_division(pair):
    x = max(pair)
    y = min(pair)
    div = x/y
    if int(div) == div:
        return int(div)
    return -1


def even_divisor_sum(ss):
    total = 0
    for line in ss:
        for pair in get_pairs(line):
            val = even_division(pair)
            if val > 0:
                total += val
                break
    return total


if __name__ == "__main__":
    ss = _read_input(INPUT_FILE)
    print(calc_checksum(ss))
    print(even_divisor_sum(ss))

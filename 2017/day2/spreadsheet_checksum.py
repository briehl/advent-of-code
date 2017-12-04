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

if __name__ == "__main__":
    ss = _read_input(INPUT_FILE)
    print(calc_checksum(ss))

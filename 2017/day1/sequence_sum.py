INPUT_FILE = "input"


def _read_input(in_file):
    f = open(in_file, 'r')
    sequence = f.read().strip()
    f.close()
    return sequence


def get_next(idx, seq):
    """
    Peeks ahead one value forward from idx.
    if idx+1 > len(seq), wrap around.

    Returns as an int
    """
    next_idx = idx+1
    if next_idx >= len(seq):
        next_idx = next_idx - len(seq)
    return int(seq[next_idx])


def calc_seq_sum(sequence):
    total = 0
    for i in range(len(sequence)):
        cur_val = int(sequence[i])
        next_val = get_next(i, sequence)
        if cur_val == next_val:
            total += cur_val
    return total


if __name__ == "__main__":
    print(calc_seq_sum(_read_input(INPUT_FILE)))

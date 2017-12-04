INPUT_FILE = "input"


def _read_input(in_file):
    f = open(in_file, 'r')
    sequence = f.read().strip()
    f.close()
    return sequence


def get_next(idx, n, seq):
    """
    Peeks ahead n steps forward from idx. n should be > 1.
    if idx+n > len(seq), wrap around.

    Returns as an int
    """
    next_idx = idx+n
    if next_idx >= len(seq):
        next_idx = next_idx - len(seq)
    return int(seq[next_idx])


def calc_step_seq_sum(sequence, step_size):
    total = 0
    for i in range(len(sequence)):
        cur_val = int(sequence[i])
        next_val = get_next(i, step_size, sequence)
        if cur_val == next_val:
            total += cur_val
    return total


if __name__ == "__main__":
    sequence = _read_input(INPUT_FILE)
    print(calc_step_seq_sum(sequence, 1))
    print(calc_step_seq_sum(sequence, int(len(sequence)/2)))

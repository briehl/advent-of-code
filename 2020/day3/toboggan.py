from collections import defaultdict

class TobogganMap:
    def __init__(self):
        self._map_struct = defaultdict(set)
        self._width = 0
        self._height = 0
        cur_h = 0
        with open("./input.txt") as infile:
            for line in infile.readlines():
                # map_struct should be Dict of Sets, like:
                # {
                #   1: {5, 9}
                # }
                # would mean positions (1,5) and (1,9) have a tree
                self._width = len(line.strip())
                for i, c in enumerate(line):
                    if c == '#':
                        self._map_struct[cur_h].add(i)
                cur_h += 1
            self._height = cur_h

    def has_tree(self, row, col):
        # cols wrap, rows do not
        if row < 0 or row >= self._height:
            raise ValueError(f"row {row} is out of bounds")
        if col < 0:
            raise ValueError(f"col {col} is out of bounds")
        col = col % self._width
        return col in self._map_struct[row]

    def count_trees_in_run(self, row_slope, col_slope):
        cur_row = 0
        cur_col = 0
        trees = 0
        while cur_row < self._height:
            if self.has_tree(cur_row, cur_col):
                trees += 1
            cur_row += row_slope
            cur_col += col_slope
        return trees

tobo_map = TobogganMap()

# part 1 solution
print(tobo_map.count_trees_in_run(1, 3))

# part 2 solution
# Determine the number of trees you would encounter if, for each of the following
# slopes, you start at the top-left corner and traverse the map all the way to the
# bottom:

# Right 1, down 1.
# Right 3, down 1. (This is the slope you already checked.)
# Right 5, down 1.
# Right 7, down 1.
# Right 1, down 2.

# In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s)
# respectively; multiplied together, these produce the answer 336.

slopes = [  # down, right (or rows, cols)
    (1, 1),
    (1, 3),
    (1, 5),
    (1, 7),
    (2, 1)
]
mult_trees = 1
for s in slopes:
    mult_trees *= tobo_map.count_trees_in_run(s[0], s[1])
print(mult_trees)

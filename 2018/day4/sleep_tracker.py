import os
from collections import (
    namedtuple,
    defaultdict,
)
from typing import List

infile_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'input.txt')

class Guard:
    def __init__(self, guard_id: int, events: list):
        self.guard_id = guard_id
        self.sleeps = list()
        self.events = events
        # self.calc_sleep_schedule(events)

    def calc_sleep_schedule(self):
        # init the list
        timeline = [0 for i in range(60)]
        # events should be sorted. we don't really
        # care about date, just get the minute
        # interval and increment numbers in each minute
        for i in range(0, len(self.events), 2):
            start = int(self.events[i].split(':')[1][:2])
            end = int(self.events[i+1].split(':')[1][:2])
            for j in range(start, end):
                timeline[j] += 1
        self.timeline = timeline
        self.total_sleep = sum(self.timeline)
        self.most_sleep = self.timeline.index(max(self.timeline))

def organize_data(lines) -> dict:
    # Sorts the data by date and time
    # returns list indexed on date (YYYY-MM-DD string)
    lines.sort()
    data = defaultdict(list)

    shifts = list()
    cur_shift = list()
    for i in range(len(lines)):
        if "Guard" in lines[i]:
            if len(cur_shift):
                shifts.append(cur_shift)
            cur_shift = [lines[i]]
        else:
            cur_shift.append(lines[i])
    shifts.append(cur_shift)
    total_lines = 0
    for shift in shifts:
        guard_id = int(shift[0].split()[3][1:])
        data[guard_id].extend(shift[1:])
    return data

guards = list()

with open(infile_path) as infile:
    data = organize_data(infile.readlines())
    for guard_id in data:
        new_guard = Guard(guard_id, data[guard_id])
        new_guard.calc_sleep_schedule()
        guards.append(new_guard)

guards.sort(key=lambda g: g.total_sleep)
g = guards[-1]
print(g.guard_id * g.most_sleep)

guards.sort(key=lambda g: max(g.timeline))
g = guards[-1]
print(g.guard_id * g.most_sleep)

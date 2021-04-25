# gameOfLife

# Game of Life Project

## Live Cells
1. a live cell with zero or one live neighbours will die.
1. a live cell with two or three live neighbours will remain alive
1. a live cell with four or more live neighbours will die.

## Dead cells:
1. a dead cell with exactly three live neighbours becomes alive
in all other cases a dead cell will stay dead.

## Init
We start with a pattern on the grid (generation 0) and we apply the rules simultaneously on all cells. This action results in a new pattern (generation 1). We then apply the rules again on all the cells, which creates another pattern (generation 2), and so on, and so on.


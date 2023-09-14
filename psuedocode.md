## How might I create this app.

### Step 1

- I've imported ChakraUI and configured an auto-responsive grid using simple grid, whenvever a timer box is added to the page, it'll be added to the grid, and the grid will adjust based on how many boxes (up to 3 can be added) are on the screen.

### Step 2

- Now that that boxes can be added to responsive grid, I need to create a component that when clicked can add another box to the screen - this will be the basis for a future "add timer" button.

### Step 3

- I've set the count of boxes to state. I now need to seperate and import a box component that has it's own states, probably an enum object with the stages of the timer (setup, run, expire).
- I also need a way to locate the index that the box is in the array, and create a handleDelete function that removes that box at the it's index from the array.

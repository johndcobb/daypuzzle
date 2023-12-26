# The Whole Year Puzzle Solver

The Whole Year Puzzle is a nifty little mind-tickler consisting of a board with labeled squares: one labeled square for every month and another set of squares labeled 1-31 representing days. The goal of the puzzle is to arrange 9 total uniquely shaped pieces in such a way that all pieces fit on the board and reveal ONLY the current month and current day.

This project contains a [python program](daypuzzle.py) for auto-solving that puzzle given any date. The one and only [John Cobb](https://github.com/johndcobb) and I built it during a random 5+ hour collaborative Christmas coding sesh.

Despite being mostly math-driven, the Python program makes the solution quite visual by representing the board as a matrix and the puzzle pieces as named, smaller matrices (e.g., L for an L-shaped piece, L2 for a longer L-shaped piece... what can I say? we're creative). The initial board is populated with just `1`s and `0`s, with `0`s representing cells that cannot be used and `1`s representing cells that MUST be used. When a solution is reached, each `1` cell must have been replaced with the name of one of the pieces to represent their placement in the solution.
For example, the solution for `December 22` looks like this:

```
   L    L    L    P    P    P    0
   L    S    S    P    P    0    0
   S    S    Z   L2   L2   L2   L2
   Z    Z    Z   L2    X    U    U
   Z    O    O    X    X    X    U
   0    O    O    T    X    U    U
   0    0    T    T    T    0    0
```

where `Dec` and `22` are the only squares that are left open in the puzzle, which is the goal. To clarify, these are the location of those specific squares in the board:

```
   L    L    L     P    P    P    0
   L    S    S     P    P    Dec  0
   S    S    Z     L2   L2   L2   L2
   Z    Z    Z     L2   X    U    U
   Z    O    O     X    X    X    U
   22    O   O     T    X    U    U
   0    0    T     T    T    0    0
```

Note that the board is not a full 7x7 grid of open squares which is why some of the edge squares are 0s instead of 1s.

# Reactifying

Following the completion of that Python program, I got a little obsessed with "Reactifying" it to make it even more visual and interactive. This meant translating that program into JavaScript, and re-thinking it a bit to leverage React component states. For instance, we know from the Python program that some solutions are reached after attempting 5 million (or more) states, and we don't want to re-render for each of those, but we do want to re-render once the solution is reached so we can view the correct piece placement.

A video is included below of the app in action!

![demo video of calendar puzzle solver](puzzlesolver.mp4)

It's not hosted anywhere but you can run it locally:

1. Clone the repo
2. Install the node modules `npm i`
3. Start the development server: `npm run start`
4. Play around with it!

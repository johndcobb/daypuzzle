class PieceUtility {
  constructor(pieceMatrix, name) {
    this.name = name;
    this.orientations = this.generateOrientations(pieceMatrix);
  }

  rotate90(piece) {
    // Rotate a matrix 90 degrees clockwise (return a new matrix)
    // https://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array
    return piece[0].map((val, index) =>
      piece.map((row) => row[index]).reverse()
    );
  }

  fliplr(piece) {
    // Flip a matrix from left to right (return a new matrix)
    // https://stackoverflow.com/questions/784929/what-is-the-best-way-to-reverse-an-array-in-javascript
    return piece.map((row) => row.reverse());
  }

  arraysEqual(a, b) {
    // Implement a function to check if two 2D arrays are equal
    // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
    return JSON.stringify(a) === JSON.stringify(b);
  }
  generateOrientations(pieceMatrix) {
    // Generate all possible orientations of a piece
    // https://stackoverflow.com/questions/42519/how-do-you-rotate-a-two-dimensional-array
    const orientations = [];
    orientations.push(pieceMatrix);
    orientations.push(this.rotate90(pieceMatrix));
    orientations.push(this.rotate90(this.rotate90(pieceMatrix)));
    orientations.push(this.rotate90(this.rotate90(this.rotate90(pieceMatrix))));
    orientations.push(this.fliplr(pieceMatrix));
    orientations.push(this.rotate90(this.fliplr(pieceMatrix)));
    orientations.push(this.rotate90(this.rotate90(this.fliplr(pieceMatrix))));
    orientations.push(
      this.rotate90(this.rotate90(this.rotate90(this.fliplr(pieceMatrix))))
    );
    const uniqueOrientations = [];
    orientations.forEach((orientation) => {
      if (!uniqueOrientations.some((o) => this.arraysEqual(o, orientation))) {
        uniqueOrientations.push(orientation);
      }
    });
    return uniqueOrientations;
  }
}

class BoardUtility {
  constructor({ month = null, day = null }) {
    this.pieces = [
      new PieceUtility(
        [
          [1, 1, 1],
          [1, 0, 0],
        ],
        "L"
      ),
      new PieceUtility(
        [
          [0, 0, 1],
          [1, 1, 1],
          [1, 0, 0],
        ],
        "Z"
      ),
      new PieceUtility(
        [
          [1, 1],
          [1, 1],
        ],
        "O"
      ),
      new PieceUtility(
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0],
        ],
        "X"
      ),
      new PieceUtility(
        [
          [1, 0, 1],
          [1, 1, 1],
        ],
        "U"
      ),
      new PieceUtility(
        [
          [1, 1, 1],
          [1, 1, 0],
        ],
        "P"
      ),
      new PieceUtility(
        [
          [0, 1, 1],
          [1, 1, 0],
        ],
        "S"
      ),
      new PieceUtility(
        [
          [1, 1, 1],
          [0, 1, 0],
        ],
        "T"
      ),
      new PieceUtility(
        [
          [1, 1, 1, 1],
          [0, 0, 0, 1],
        ],
        "L2"
      ),
    ];
    this.size = [7, 7];
    this.attemptedStates = 0;
    this.board = [
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 0, 0],
    ];
    if (month && day) {
      this.resetDate(month, day);
    } else {
      const today = new Date();
      this.resetDate(today.getMonth() + 1, today.getDate());
    }
  }

  getBoardIndexOfMonth(month) {
    // return coordinates of a specific month (month is 1-12 for jan-december)
    // (x, y) where x is column, y is row
    return {
      1: [0, 0],
      2: [0, 1],
      3: [0, 2],
      4: [0, 3],
      5: [0, 4],
      6: [0, 5],
      7: [1, 0],
      8: [1, 1],
      9: [1, 2],
      10: [1, 3],
      11: [1, 4],
      12: [1, 5],
    }[month];
  }

  getBoardIndexOfDay(day) {
    // get the index of a day location on the board
    return {
      1: [2, 0],
      2: [2, 1],
      3: [2, 2],
      4: [2, 3],
      5: [2, 4],
      6: [2, 5],
      7: [2, 6],
      8: [3, 0],
      9: [3, 1],
      10: [3, 2],
      11: [3, 3],
      12: [3, 4],
      13: [3, 5],
      14: [3, 6],
      15: [4, 0],
      16: [4, 1],
      17: [4, 2],
      18: [4, 3],
      19: [4, 4],
      20: [4, 5],
      21: [4, 6],
      22: [5, 0],
      23: [5, 1],
      24: [5, 2],
      25: [5, 3],
      26: [5, 4],
      27: [5, 5],
      28: [5, 6],
      29: [6, 2],
      30: [6, 3],
      31: [6, 4],
    }[day];
  }

  fits(orientation, placement) {
    this.attemptedStates += 1;
    const [pieceWidth, pieceHeight] = [
      orientation.length,
      orientation[0].length,
    ];
    const [xPlace, yPlace] = placement;

    for (let x = 0; x < pieceWidth; x++) {
      for (let y = 0; y < pieceHeight; y++) {
        if (
          orientation[x][y] === 1 &&
          this.board[xPlace + x][yPlace + y] !== 1
        ) {
          return false;
        }
      }
    }
    return true;
  }

  place(piece, orientation, placement, unplace = false) {
    const [pieceWidth, pieceHeight] = [
      orientation.length,
      orientation[0].length,
    ];
    const [xPlace, yPlace] = placement;
    for (let x = 0; x < pieceWidth; x++) {
      for (let y = 0; y < pieceHeight; y++) {
        if (orientation[x][y] === 1) {
          this.board[xPlace + x][yPlace + y] = unplace ? 1 : piece.name;
        }
      }
    }
  }

  unplace(piece, orientation, placement) {
    this.place(piece, orientation, placement, true);
  }

  getAllowedPlacementsOfPieceOrientation(orientation) {
    const placements = [];
    const [pieceWidth, pieceHeight] = [
      orientation.length,
      orientation[0].length,
    ];
    for (let x = 0; x < this.size[0] - pieceWidth + 1; x++) {
      for (let y = 0; y < this.size[1] - pieceHeight + 1; y++) {
        placements.push([x, y]);
      }
    }
    return placements;
  }

  resetDate(month, day) {
    // clear board first
    this.board = [
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 0, 0],
    ];
    this.month = this.getBoardIndexOfMonth(month);
    this.day = this.getBoardIndexOfDay(day);
    this.board[this.day[0]][this.day[1]] = 0;
    this.board[this.month[0]][this.month[1]] = 0;
  }

  getBoardMatrix() {
    return this.board;
  }
  getPieces() {
    return this.pieces;
  }

  getAttemptedStates() {
    // pretty print with commas
    return this.attemptedStates
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  solve(pieces = this.pieces) {
    // print attempted states if attempted states mod 10000 is 0
    if (this.attemptedStates % 10000 === 0) {
      console.log(`Attempted states: ${this.attemptedStates}`);
    }
    if (pieces.length === 0) {
      return true;
    }
    const piece = pieces[0];
    for (let orientation of piece.orientations) {
      const allowedPlacements =
        this.getAllowedPlacementsOfPieceOrientation(orientation);
      for (let placement of allowedPlacements) {
        if (this.fits(orientation, placement)) {
          this.place(piece, orientation, placement);
          if (this.solve(pieces.slice(1))) {
            return true;
          } else {
            this.unplace(piece, orientation, placement);
          }
        }
      }
    }
    return false;
  }
}

export { PieceUtility, BoardUtility };

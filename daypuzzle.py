import numpy as np
import datetime
import time


class Board:
    def __init__(self, date: str = "Dec 21", debug=False):
        self.debug = debug
        date_object = datetime.datetime.strptime(date, "%b %d")
        self.day = self._get_board_index_of_day(date_object.day)
        self.month = self._get_board_index_of_month(date_object.month)
        self.attempted_states = 0
        self.grid_size = (7, 7)
        # represent pieces
        self.navigator = (0, 0)
        self.board = [
            [1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 0, 0],
        ]

        # make the day and month spots inadmissable.
        self.board[self.day[0]][self.day[1]] = 0
        self.board[self.month[0]][self.month[1]] = 0

    def _fits(self, orientation, placement):
        self.attempted_states += 1
        piece_width, piece_height = orientation.shape
        x_place, y_place = placement
        for x in range(piece_width):
            for y in range(piece_height):
                # If there is a current piece in the orientation doesnt fit on the board....

                # print(f'x: {x}, y: {y}, x_place: {x_place}, y_place: {y_place}')
                if orientation[x][y] == 1 and self.board[x_place + x][y_place + y] != 1:
                    return False
        return True

    def _place(self, piece, orientation, placement, unplace=False):
        piece_width, piece_height = orientation.shape
        x_place, y_place = placement
        for x in range(piece_width):
            for y in range(piece_height):
                # If the the square in the orientation is 1 (so that it is part of the piece), then I should save it to the board.
                if orientation[x][y] == 1:
                    self.board[x_place + x][y_place + y] = 1 if unplace else piece.name

    def _unplace(self, piece, orientation, placement):
        self._place(piece, orientation, placement, unplace=True)

    def _get_board_index_of_month(self, month: 12):
        """ " return coordinates of a specific month (month is 1-12 for jan-december)"""

        # (x, y) where x is column, y is row
        return {
            1: (0, 0),
            2: (0, 1),
            3: (0, 2),
            4: (0, 3),
            5: (0, 4),
            6: (0, 5),
            7: (1, 0),
            8: (1, 1),
            9: (1, 2),
            10: (1, 3),
            11: (1, 4),
            12: (1, 5),
        }[month]

    def _get_board_index_of_day(self, day: 21):
        """get the index of a day location on the board"""
        return {
            1: (2, 0),
            2: (2, 1),
            3: (2, 2),
            4: (2, 3),
            5: (2, 4),
            6: (2, 5),
            7: (2, 6),
            8: (3, 0),
            9: (3, 1),
            10: (3, 2),
            11: (3, 3),
            12: (3, 4),
            13: (3, 5),
            14: (3, 6),
            15: (4, 0),
            16: (4, 1),
            17: (4, 2),
            18: (4, 3),
            19: (4, 4),
            20: (4, 5),
            21: (4, 6),
            22: (5, 0),
            23: (5, 1),
            24: (5, 2),
            25: (5, 3),
            26: (5, 4),
            27: (5, 5),
            28: (5, 6),
            29: (6, 2),
            30: (6, 3),
            31: (6, 4),
        }[day]

    def get_allowed_placements(self, orientation):
        """ "
        Return a list of 2-tuples representing
        the top left coord of an allowed placement for a
        given orientation of a piece

        args:
        orientation - current orientation of piece

        """
        placements = []
        piece_width, piece_height = orientation.shape
        for row in range(self.grid_size[0] - piece_width + 1):
            for column in range(self.grid_size[1] - piece_height + 1):
                placements.append((row, column))
        if self.debug:
            print(
                f"Found {len(placements)} placements for piece {orientation}: {placements}"
            )
        return placements

    def solve(self, pieces: list = []):
        # check if board is solved
        if len(pieces) == 0:
            print(f"Attempted {self.attempted_states} states")
            return True
        piece = pieces[0]
        for orientation in piece.orientations:
            for placement in self.get_allowed_placements(orientation):
                if self._fits(orientation, placement):
                    # if it fits, place it. This updates the board state.
                    self._place(piece, orientation, placement)
                    if self.debug:
                        print(
                            f"Placed piece {piece.name} in orientation {orientation}  at {placement}, new board state:\n"
                        )
                        print(self)
                        x = input("Press enter to continue to next piece :) ")

                    # Now, recurse but with the smaller piece list!
                    if self.solve(pieces=pieces[1:]):
                        return True
                    else:
                        # if it doesn't work, remove the piece and try again.
                        self._unplace(piece, orientation, placement)
                        if self.debug:
                            print(
                                f"Removed piece {piece.name} in orientation {orientation}  at {placement}, new board state:\n"
                            )
                            print(self)
                            input("Press enter to continue to next piece :) ")

        return False

    def __str__(self):
        # pretty print the board matrix with consistent spacing
        return "\n".join(
            [" ".join(["{:>4}".format(item) for item in row]) for row in self.board]
        )


class Piece:
    def __init__(self, piece, name=None):
        self._generate_orientations(
            piece
        )  # generate all orientations into self.orientations
        self.name = name

    def _generate_orientations(self, piece):
        self.orientations = []
        self.orientations.append(piece)
        self.orientations.append(np.rot90(piece))
        self.orientations.append(np.rot90(piece, 2))
        self.orientations.append(np.rot90(piece, 3))
        self.orientations.append(np.fliplr(piece))
        self.orientations.append(np.rot90(np.fliplr(piece)))
        self.orientations.append(np.rot90(np.fliplr(piece), 2))
        self.orientations.append(np.rot90(np.fliplr(piece), 3))
        unique = []
        for matrix in self.orientations:
            if not any(
                np.array_equal(matrix, unique_matrix) for unique_matrix in unique
            ):
                unique.append(matrix)
        self.orientations = [np.array(matrix) for matrix in unique]

    def __str__(self):
        return str(self.orientations)


def main():
    myBoard = Board("Dec 22")

    pieces = [
        Piece([[1, 1, 1], [1, 0, 0]], "L"),
        Piece([[0, 0, 1], [1, 1, 1], [1, 0, 0]], "Z"),
        Piece([[1, 1], [1, 1]], "O"),
        Piece([[0, 1, 0], [1, 1, 1], [0, 1, 0]], "X"),
        Piece([[1, 0, 1], [1, 1, 1]], "U"),
        Piece([[1, 1, 1], [1, 1, 0]], "P"),
        Piece([[0, 1, 1], [1, 1, 0]], "S"),
        Piece([[1, 1, 1], [0, 1, 0]], "T"),
        Piece([[1, 1, 1, 1], [0, 0, 0, 1]], "L2"),
    ]

    myBoard.solve(pieces)
    print("done!")
    print(myBoard)


main()

# chorus-lapilli
web-based implementation of a variation of the classic Tic-Tac-Toe game using React.
The game allows two players to take turns marking spaces in a 3x3 grid with their respective symbols (either 'X' or 'O'). The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game. The project implements React concepts such as components, state management, and event handling.

Key Features:
  - Interactive 3x3 Game Board:
    The board is composed of nine squares that players can click to mark their symbol. The board dynamically updates to reflect the current state of the game
    after each move.

  - Turn-Based Gameplay:
    The game alternates turns between two players, starting with 'X'. It ensures that each player has an equal opportunity to make their move.

  - Win Detection:
    The game includes logic to check for a win condition after each move. It evaluates the board to determine if a player has aligned three of their symbols
    horizontally, vertically, or diagonally.

  - Strategic Piece Movement:
    After each player has placed three pieces on the board, they gain the ability to move one of their existing pieces to an empty square during their turn.
    This rule adds a layer of strategy as players must decide between blocking their opponent or positioning themselves for a win.

  - Center Square Rule: after a player has placed 3 pieces, if the player occupies the center square, they must move that piece out of the center on their next
    turn unless they can win the game by either moving the center piece or another piece. This rule prevents players from overly dominating the game by
    controlling the center square, resulting in a more balanced and dynamic gameplay experience.

  - State Management:
    The game utilizes React's useState hook for state management, tracking the current player, the state of the board, the number of moves made by each
    player, and the selection of a piece for movement after all 3 pieces have been placed.


Technical Components:
  - Square Component:
    Represents each square on the board. It's a functional component that displays either an 'X', 'O', or remains blank based on player interaction.

  - Board Component:
    Manages the game's state, including the board's current layout, which player's turn it is, and the game's status (e.g., in progress, win, or draw). It renders
    the Square components and handles click events to update the game state.

  - Game Logic:
    Includes functions to handle player actions (placing and moving pieces) and to check for win conditions. It ensures the game follows Tic-Tac-Toe rules and
    determines the outcome of the game.

  - User Interface:
    Provides feedback to the players about the current game state, including whose turn it is, if a player has won, or if the game is a draw.

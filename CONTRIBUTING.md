Contribution by Francesca Ricter

In my contribution to the TicTacToe exercise I have taken a few consiredations into account:
- the winning sequence must be '>0' 
- the status matrix must follow the rule : width x height 
- the parameter 'next_player' must always indicate the correct next player (also in a 'tie' configuration of the board), in other case the output for that given input will be 'invalid'
- two or more players cannot create a winning sequence on the game-board, therefore a similar configuration is considered 'invalid'
- the maximum length of a possible single winning sequence must be : winning_sequence x 2 (if the sequence length exceedes this number the game must have ened previously, I consider this an 'invalid' configuration)
- the winner can create up to three winning sequences on the same board (these must be created by the last move taken by the player),    these sequences must follow some rules, in addition to the ones written above, in order to create a valid status for the game:
     *TWO WINNING SEQUENCES must intersect and each sequence must have less than 'the winning sequence' cells between the begging position of the sequence and the intersection cell and betweeen the intersection cell and the end of the sequence position;
     *THREE WINNING SEQUENCES must intersect in one cell and follow the same rule as the 'two winning sequences' case
- each turn follows the order from 0 to the players_number-1  
- no numbers equal or above 'players_number' can be present on the status matrix        

I have added a few tests that show some examples for these rules. 


_________________________________________________________________________________________________________________________________________

To test your software and problem solving skills, we ask you to implement some logic for a tictactoe game.

If you don't know the game, you can find more information [here](https://en.wikipedia.org/wiki/Tic-tac-toe).

What is particular about this TicTacToe is that the dimension of the board can be different from 3X3, more than two players can play and the sequence of symbol needed to win can vary depending on the game.

The function we are asking you to implement takes as an input a game with it's current state and gives as an output the status of the game (won, tie, invalid, ongoing).

You can find some documentation about the format of the input and output of the game inside the interfaces folder.

To help you we also created a few tests that you can run to verify your solution.

If you feel that more tests could be needed to cover your code, don't hesitate to write them.

Once you have finished, send us a repo with your solution and tests.

Good luck!

## How to contribute to tictactoe

#### **Do you intend to add a new feature or change an existing one?**

* **Do not open up a GitHub PR**.
* **Do not open up a GitHub issue**.
* Clone privately and create a new public repo inside your GitHub account.
* When you finish the development send us the link.

Thanks! :heart: :heart: :heart:

Foorban Team
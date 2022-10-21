Contribution by Francesca Ricter

In my contribution to the TicTacToe exercise I have taken a few consiredations into account:
- the winning sequence must be '>0' 
- the status matrix must follow the rule : width x height 
- the parameter 'next_player' must always indicate the correct next player (also in a 'tie' configuration of the board), if not so the output for that given input will be 'invalid'
- two or more players cannot create a winning sequence on the game-board, therefore a similar configuration is considered 'invalid'
- the maximum length of a possible single winning sequence must be : winning_sequence x 2 (if the sequence length exceedes this number the game must have ended previously, I consider this an 'invalid' configuration)
- the winner can create up to three winning sequences on the same board (these must be created by the last move taken by the player),    these sequences must follow some rules, in addition to the ones written above, in order to create a valid status for the game:
     *TWO WINNING SEQUENCES must intersect and each sequence must have less than 'the winning sequence' cells between the beginning position of the sequence and the intersection cell and betweeen the intersection cell and the end of the sequence position;
     *THREE WINNING SEQUENCES must intersect in one cell and follow the same rule as the 'two winning sequences' case
- each turn follows the order from 0 to the players_number-1  
- no numbers equal or above 'players_number' can be present on the status matrix        

I have added a few tests that show some examples for the rules above. 

_________________________________________________________________________________________________________________________________________




Install and start commands
------------
```bash
npm install
```
```bash
npm run test
```

Requirements
------------

tictactoe requires the following to run:

  * [Node.js][node] 14+
  * [npm][npm] (normally comes with Node.js)


[node]: https://nodejs.org/
[npm]: https://www.npmjs.com/

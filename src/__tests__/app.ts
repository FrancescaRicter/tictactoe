import { status } from '../app';

describe('game', () => {


    it('tie 1', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 3,
                    height: 2,
                },
                status:[
                    [0,1,1],
                    [0,0,1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'tie',
            winningPlayer: null,
        });
    })

    

    test('tie 2', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 3,
                    height: 3,
                },
                status:[
                    [0,1,0],
                    [0,1,1],
                    [1,0,0]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'tie',
            winningPlayer: null,
        });
    })
    
    
    test('tie 3', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [0, 1, 0, 0],
                    [1, 1, 0, 1],
                    [0, 0, 1, 1],
                    [1, 0, 1, 0]
                ],
            },
            players_number: 2,
            winning_sequence_length: 4,
        });
        expect(result).toEqual({
            status: 'tie',
            winningPlayer: null,
        });
    })

    
    test('invalid 1', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 3,
                    height: 2,
                },
                status:[
                    [0,0,1],
                    [0,0,1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })


    test('invalid 2', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 3,
                    height: 3,
                },
                status:[
                    [1,1,1],
                    [0,1,0],
                    [1,1,1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })
    test('invalid 3', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [1,0,1,0],
                    [0,0,0,0],
                    [1,0,0,0],
                    [0,0,1,0],
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
   })
   
    test('won 1', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 3,
                    height: 2,
                },
                status:[
                    [1,1,-1],
                    [0,0,0]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'won',
            winningPlayer: 0,
        });
     })
   test('won 2', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 3,
                    height: 3,
                },
                status:[
                    [0,0,1],
                    [0,1,-1],
                    [1,-1,-1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'won',
            winningPlayer: 1,
        });
        
    })

  
    test('won 3', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [0,0,-1,2],
                    [0,1,2,-1],
                    [1,2,-1,-1],
                    [-1,-1,1,-1],
                ],
            },
            players_number: 3,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'won',
            winningPlayer: 2,
        });
    })

    
    test('ongoing 1', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 3,
                    height: 2,
                },
                status:[
                    [-1,-1,0],
                    [-1,1,0]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'ongoing',
            winningPlayer: null,
        });
    })

    
    test('ongoing 2', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 3,
                    height: 3,
                },
                status:[
                    [-1,-1,0],
                    [-1,1,-1],
                    [-1,-1,-1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'ongoing',
            winningPlayer: null,
        });
    })


    test('ongoing 3', function() {
        const result = status({
            next_player: 2,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [0,0,-1,-1],
                    [-1,1,1,-1],
                    [2,-1,-1,-1],
                    [-1,-1,-1,-1]
                ],
            },
            players_number: 3,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'ongoing',
            winningPlayer: null,
        });
    })
    

    //both players have created a winning sequence, not possible : invalid
    test('invalid 4', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [0,0,0,1],
                    [-1,-1,-1,1],
                    [1,0,-1,1],
                    [-1,-1,-1,0]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })

    //maxiumum number of consecutive symbols possible for victory : won 
    test('won 4', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 5,
                    height: 4,
                },
                status:[
                    [0,0,0,0,0],
                    [-1,1,-1,-1,1],
                    [1,1,-1,1,-1],
                    [-1,-1,-1,0,-1]

                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'won',
            winningPlayer: 0,
        });
    }) 


//number of consecutive symbols exceeds the maxiumum possible, player should have won before and the game should have ended previously : invalid
    test('invalid 5', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 6,
                    height: 4,
                },
                status:[
                    [0,0,0,0,0,0],
                    [-1,1,-1,-1,1,1],
                    [1,1,-1,1,-1,-1],
                    [-1,-1,-1,0,-1,-1]

                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    }) 


    //possible configuration of victory with a double winning sequence : won
    test('won 5', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [0,0,0,1],
                    [-1,0,-1,-1],
                    [1,0,-1,1],
                    [1,-1,-1,-1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'won',
            winningPlayer: 0,
        });
    })


    //valid victory configuration with three winning sequences : won 
    test('won 6', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [0,0,1,1],
                    [0,0,0,-1],
                    [1,0,0,1],
                    [1,-1,-1,1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'won',
            winningPlayer: 0,
        });
    })


    //both players have won, impossible configuration : invalid
    test('invalid 6', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 4,
                    height: 4,
                },
                status:[
                    [0,0,1,1],
                    [0,0,0,1],
                    [1,0,0,1],
                    [1,-1,-1,1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })

    //impossible configuration of victory, player 0 should have won previously : invalid 
    test('invalid 7', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 4,
                    height: 6,
                },
                status:[
                    [0,0,1,1],
                    [-1,0,-1,-1],
                    [1,0,0,1],
                    [1,0,-1,1],
                    [-1,0,-1,-1],
                    [1,0,-1,1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })


    it('tie 4', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 1,
                    height: 1,
                },
                status:[
                    [0]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'tie',
            winningPlayer: null,
        });
    })


    //test with game board with invalid measurements : invalid
    it('invalid 8', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 0,
                    height: 0,
                },
                status:[],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })

    //impossible configuration of victory for player 0, second sequence is too long : invalid 
    test('invalid 9', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 4,
                    height: 6,
                },
                status:[
                    [0,0,0,0],
                    [-1,0,-1,-1],
                    [1,0,1,1],
                    [1,0,-1,1],
                    [-1,0,-1,-1],
                    [1,-1,-1,1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })

    //possible configuration of victory for player '0',in this case the two sequences that intersect are longer than the winning sequence: won
    test('won 7', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 4,
                    height: 6,
                },
                status:[
                    [0,0,1,-1],
                    [0,0,0,1],
                    [1,0,0,1],
                    [1,0,-1,0],
                    [-1,-1,1,-1],
                    [1,-1,1,-1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'won',
            winningPlayer: 0,
        });
    })


    //it is an invalid configuration, the only possible cell of intersection for a multiple victory is [0,2] : invalid
    test('invalid 10', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 5,
                    height: 4,
                },
                status:[
                    [0,0,0,0,0],
                    [-1,0,1,-1,1],
                    [1,0,-1,1,-1],
                    [1,-1,-1,1,-1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })


    //presence of more players in the status board that indicated in the 'players_numer' : invalid
    test('invalid 11', function() {
        const result = status({
            next_player: 1,
            board: {
                size: {
                    width: 3,
                    height: 3,
                },
                status:[
                    [0,-1,0],
                    [-1,2,-1],
                    [1,-1,-1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })

    //this configuration is invalid because the next player should be '1' : invalid
    test('invalid 12', function() {
        const result = status({
            next_player: 0,
            board: {
                size: {
                    width: 3,
                    height: 3,
                },
                status:[
                    [0,-1,0],
                    [-1,-1,1],
                    [-1,-1,-1]
                ],
            },
            players_number: 2,
            winning_sequence_length: 3,
        });
        expect(result).toEqual({
            status: 'invalid',
            winningPlayer: null,
        });
    })


})
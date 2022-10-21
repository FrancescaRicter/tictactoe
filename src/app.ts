import { Game, GameStatus } from './interfaces';
let i,j, total_moves: number;
let bool, triple_sequence : boolean;
let first_winning_positions:[number,number][] = [[-1,-1]];
let second_winning_pos:[number,number][] = [[-1,-1]];
let third_winning_pos:[number,number][] = [[-1,-1]];
let tem:[number,number][] = [[-1,-1]];
let winning_center:[number,number] = [-1,-1];
let player_moves : number[] = [0]; 

enum Direction {
    V = 'vertical',
    H = 'horizontal',
    D = 'diagonal',
    AD = 'anti_diagonal'
}

let first, second, third : Direction;

class GameParameters implements GameStatus {
    status;
    winningPlayer;

    setStatus(status:GameParameters["status"]){
        this.status=status;
    }

    setWinner(winner:GameParameters["winningPlayer"]){
        this.winningPlayer=winner;
    }

    setParameters(parameters:GameStatus){
        this.status = parameters.status;
        this.winningPlayer = parameters.winningPlayer;
    }

    getStatus(){
        return this.status;
    }

    getWinner(){
        return this.winningPlayer;
    }
}

let output : GameParameters = new GameParameters();

function reset(){
    output.setStatus(null);
    output.setWinner(null);
    total_moves=0;
    triple_sequence=false;
    first_winning_positions=null;
    first_winning_positions=[[-1,-1]];
    second_winning_pos = null;
    second_winning_pos=[[-1,-1]];
    third_winning_pos = null;
    third_winning_pos=[[-1,-1]];
    tem=null;
    tem = [[-1,-1]];
    first=null;
    second=null;
    third=null;
    winning_center=[-1,-1];
    player_moves=null;
    player_moves=[0];
    triple_sequence=false;
}

//function returns true if the winning center is compatible with the given winning sequence
function check_validity(game: Game, or : Direction, array:[number,number][],a : number, b:number) : boolean {
    var val : boolean = true;
   
    if(or==Direction.H || or==Direction.D){
        if(array[array.length-1][1]-b>=game.winning_sequence_length){
            val = false;
        }
        if(b-array[0][1]>=game.winning_sequence_length){
            val=false;
        }
    }
    if(or==Direction.V )  {
       
        if(array[array.length-1][0]-a>=game.winning_sequence_length){
            val = false;
        }
 
        if(a-array[0][0]>=game.winning_sequence_length){
            val=false;
        }
    }
    if(or==Direction.AD){
        if(array[0][0]-a>=game.winning_sequence_length){
            val = false;
        }
        if(a-array[array.length-1][0]>=game.winning_sequence_length){
            val=false;
        }
    }    

    return val;
}

//function that returns true if the second array subpart of the first array 
function sub_sequence(first_array:[number,number][],second_array:[number,number][]): boolean{ 
    var valid : boolean;
    var k,a :number;

    valid = true;
    for(k=0;k<second_array.length && valid ;k++){
        valid=false;
        for(a=0;a<first_array.length;a++){
            if(second_array[k][0]==first_array[a][0] && second_array[k][1]==first_array[a][1]){
                valid=true;
                break;
            }

        }
    }
    return valid;
}

//function that saves a given sequence of cells in the given array
function save_sequence(row:number,column:number,length:number,orientation:Direction,array:[number,number][]){
    var a,b,k:number;
    a=i;
    b=j;                 
    array[0]=[a,b];

    for(k=1;k<length;k++){
        if(orientation==Direction.H || orientation==Direction.D){
            b++;
        }
        if(orientation==Direction.V || orientation==Direction.D || orientation==Direction.AD){
            a++;
        } 
        if(orientation==Direction.AD){
            b=j-1;
        }
        array[k] =[a,b];
    }
}

//function that discovers a winning sequence in the given direction
function discover_sequence (game:Game, orientation : Direction) : void {
    var a,b,len,k : number;
    var valid,temp : boolean;

    if(output.status!='invalid'){
        for (i=0; i<game.board.size.height; i++) {
            for (j=0; j<game.board.size.width; j++) {
                len=1;
                a=i;
                b=j;
                if(orientation==Direction.H || orientation==Direction.D ){
                    b=j+1;
                }
                if(orientation==Direction.V || orientation==Direction.D || orientation==Direction.AD){
                    a=i+1;
                }
                if(orientation==Direction.AD){
                    if(b>0)
                       b--;
                }
            
                while(a<game.board.size.height && b<game.board.size.width && b>=0 &&game.board.status[i][j]==game.board.status[a][b]){
                    if(game.board.status[i][j]==game.board.status[a][b] && game.board.status[i][j]>-1){
                        len++;
                        if(orientation==Direction.H || orientation==Direction.D){
                            b++;
                        }
                        if(orientation==Direction.V || orientation==Direction.D || orientation==Direction.AD){
                            a++;
                        } 
                        if(orientation==Direction.AD){
                            b--;
                        }
                    }
                    else 
                        break; 
                }

                //winning sequence found
                if(len>=game.winning_sequence_length && len<(game.winning_sequence_length)*2){

                    //first winning sequence in the game found
                    if(output.getWinner()==null){
                        output.setWinner(game.board.status[i][j]);
                        output.setStatus('won');
                        save_sequence(i,j,len,orientation,first_winning_positions);
                        first=orientation;
                    } 

                    //second winning sequence in the game found
                    else if(output.getWinner()==game.board.status[i][j] && winning_center[0]==-1){

                        save_sequence(i,j,len,orientation,second_winning_pos);

                        //verify that the second winning sequence is not a subpart of the first sequence
                        valid = sub_sequence(first_winning_positions,second_winning_pos);
        
                        if(valid){
                            second_winning_pos=null;
                            second_winning_pos=[[-1,-1]];
                            continue;
                        }

                        //verify if the two sequnces intersect and are compatible
                        valid=false;
                        for(k=0;k<second_winning_pos.length && !valid;k++){
                            for(a=0;a<first_winning_positions.length;a++){
                                if(second_winning_pos[k][0]==first_winning_positions[a][0] && second_winning_pos[k][1]==first_winning_positions[a][1]){
                                    valid=check_validity(game,first,first_winning_positions,first_winning_positions[a][0],first_winning_positions[a][1]);
                                    if(valid){
                                        valid=check_validity(game,orientation,second_winning_pos,second_winning_pos[k][0],second_winning_pos[k][1]);
                                       }
                                    if(valid){
                                        winning_center[0]=second_winning_pos[k][0];
                                        winning_center[1]=second_winning_pos[k][1];
                                        break;
                                    }   
                                }
                            }
                        }
                    
                        //the two winning sequences are in non compatible positions
                        if(winning_center[0]==-1 || !valid){
                            output.setStatus('invalid');
                            return;
                        }
                    }
                
                    //third winning sequence found
                    else if(output.winningPlayer==game.board.status[i][j] && winning_center[0]!=-1){
                        if(triple_sequence){
                            save_sequence(i,j,len,orientation,tem);
                            if(!(sub_sequence(first_winning_positions,tem) || sub_sequence(second_winning_pos,tem) || sub_sequence(third_winning_pos,tem))){
                                output.status='invalid';
                                tem=null;
                                tem=[[-1,-1]];
                                return ;}
                        }
                        else{
                            save_sequence(i,j,len,orientation,third_winning_pos);
                            valid=sub_sequence(first_winning_positions,third_winning_pos);
                            if(!valid){
                                valid=sub_sequence(second_winning_pos,third_winning_pos);
                  
                            }

                            if(valid){
                                third_winning_pos=null;
                                third_winning_pos=[[-1,-1]];
                                continue;
                            }

                            save_sequence(i,j,len,orientation,third_winning_pos);

                            valid=false;
                            for(k=0;k<third_winning_pos.length && !valid;k++){
                                if(third_winning_pos[k][0]==winning_center[0] && third_winning_pos[k][1]==winning_center[1]){
                                    valid=true;    
                                }
                            }
               
                            if(!valid){
                                output.status='invalid';
                                return ;
                            }
                            triple_sequence=true;
                        }
                    }
                    else {
                        output.setStatus('invalid'); 
                        return;
                    }
                }

                //the winning sequence is too long the player should have won before
                else if(len>=game.winning_sequence_length*2){
                    output.setStatus('invalid'); 
                    return;
                }
                }
            }
            return ;
        }
    }

export function status (game: Game): GameStatus {
    reset();

    if(game.board.size.height<1 || game.board.size.width<1 || game.winning_sequence_length>0)
       output.setStatus('invalid');

    //array that holds the number of moves performed by each player
    for(i=0;i<game.players_number;i++){
        player_moves[i]=0;
    }

    for (i=0;i<game.board.size.height;i++ ){
        for (j=0;j<game.board.size.width;j++){
            if(game.board.status[i][j]<game.players_number && game.board.status[i][j]>-1) 
               player_moves[game.board.status[i][j]]++;
            else if (game.board.status[i][j]!=-1){
                output.setStatus('invalid'); 
                return output;   
            }
        }
    }

    if(player_moves.length>game.players_number)
        output.setStatus('invalid');

    for(i=0;i<game.players_number;i++){
        total_moves = total_moves + player_moves[i];
    }

    //check on the validity of number of moves performed by the players
    bool=true;
    for(i=0;i<game.players_number-1;i++){
        if(player_moves[i]!=player_moves[i+1]){
            bool=false;   //different number of moves between players (check if )
            break;
        }
    }

    if(bool && game.next_player!=0 )
       bool=false;
    if (!bool) {
        bool=true;
        for (i=1;i<game.next_player;i++){
            if(player_moves[i-1]!=player_moves[i]){
               bool=false;
               break;
            }
        }
        if(bool){
            if(player_moves[0]-1!=player_moves[i])
               bool=false;
            for (i=game.next_player;i<game.players_number-1;i++){
               if(player_moves[i]!=player_moves[i+1]){
                  bool=false;
                  break;
                }
            }
        }
    }

    //invalid number of moves between players
    if (!bool){
        output.setStatus('invalid'); 
        return output;   
    }

    //search for a winning sequence in horizontal 
    discover_sequence(game, Direction.H);   

    //search for a winning sequence in vertical
    discover_sequence(game, Direction.V);     

    //search for a winning sequence in diagonal
    discover_sequence(game,Direction.D);   

    //search for a winning sequence in anti-diagonal
    discover_sequence(game,Direction.AD);
   
    if(output.getStatus() == 'invalid')
        output.winningPlayer=null;
    
    if(output.getStatus()==null){
        if(total_moves==game.board.size.height*game.board.size.width)
           output.status='tie';
        else
           output.status='ongoing';   
    }
    
    return output;
}
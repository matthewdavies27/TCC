import { Champion } from '../champion/champion.model'; 
import { Team } from '../team/team.model';


export class Game {
    teamOneBans: Champion[];
    teamTwoBans: Champion[];
    teamOne: Team; 
    teamTwo: Team;
}
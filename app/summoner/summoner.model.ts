import { Champion } from '../champion/champion.model'; 

export class Summoner {
  id: number;
  champion: Champion;
  position: string;
  name: string;
  image: number; 
  summonerSpellD: number; 
  summonerSpellF: number;

  getImageLink(): string { 
     return "http://ddragon.leagueoflegends.com/cdn/6.14.1/img/profileicon/"  + this.image + ".png";
  } 
}

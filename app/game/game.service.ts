import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ChampionService } from '../champion/champion.service';
import { Summoner } from '../summoner/summoner.model';

import { Game } from './game.model';
import { Team } from '../team/team.model';
import { Champion } from '../champion/champion.model';

@Injectable()
export class GameService {

  constructor(private http: Http
              ) {}
  
  getGame(summonerId: number): Observable<Game> {
    return this.http.get("https://na.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/NA1/" + summonerId + "?api_key=ae7d33af-66df-4466-8b95-ff538f8d792a")
        .map(res => res.json())
        .map(res => { 
          let game: Game = new Game;
          game.teamOne = new Team;
          game.teamTwo = new Team;
          game.teamOne.summoners = [];
          game.teamTwo.summoners = [];
          game.teamOneBans = [];
          game.teamTwoBans = [];

          let bansJson = res['bannedChampions'];
            for (let banIndex in bansJson) {
              let banJson = bansJson[banIndex];
              if (banJson['teamId'] === 100) { 
                game.teamOneBans.push(this.decodeBan(banJson));
              }
              if (banJson['teamId'] === 200) { 
                game.teamTwoBans.push(this.decodeBan(banJson));
              }
            }

          let playersJson = res['participants'];
            for (let playerIndex in playersJson) {
              let playerJson = playersJson[playerIndex]; 
              if (playerJson['teamId'] === 100) {
                game.teamOne.summoners.push(this.decodeSummoner(playerJson));
              }
              if (playerJson['teamId'] === 200) {
                game.teamTwo.summoners.push(this.decodeSummoner(playerJson)); 
              }
            }
          return game;
        });
  }

  decodeBan(banJson: Object): Champion {
    let champion: Champion = new Champion();
    champion.id = banJson['championId'];
    return champion; 
  }  

  /* CHAMPION IN DECODES DOESN'T HAVE ALL FIELDS! */ 


  decodeSummoner(summonerJson: Object): Summoner {
    let summoner: Summoner = new Summoner();
    summoner.id = summonerJson['summonerId'];
    summoner.champion = new Champion();
    summoner.champion.id = summonerJson['championId'];
    summoner.name = summonerJson['summonerName'];
    summoner.summonerSpellD = summonerJson['spell1Id'];
    summoner.summonerSpellF = summonerJson['spell2Id'];
    summoner.image = summonerJson['profileIconId'];
    return summoner; 
  }
}



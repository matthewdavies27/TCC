import { Component, OnInit } from '@angular/core';

import { Champion } from '../champion/champion.model'; 
import { ChampionService } from '../champion/champion.service';

import { GameService } from '../game/game.service';
import { Game } from '../game/game.model'; 

import { SummonerService } from '../summoner/summoner.service';
import { Summoner } from '../summoner/summoner.model'; 


@Component({
  selector:'live-game-analysis',
  providers: [ChampionService, GameService, SummonerService],
  templateUrl: 'app/live-game-analysis/live-game-analysis.component.html',
  styleUrls: ['app/live-game-analysis/live-game-analysis.component.scss'],
})

export class LiveGameAnalysisComponent { 

  private game: Game; 
  private summonerName: string;
  
  constructor(private championService: ChampionService,
              private gameService: GameService,
              private summonerService: SummonerService
              ) {} 

  getGameWithName(summonerName: string) {
    console.log(summonerName);
    this.summonerService.getSummoner(summonerName)
        .subscribe(
            summoner => { 
              this.getGameWithId(summoner.id);
            },
            error => {
              alert("Error getting summonerID from summonerName")
            }
        );
  }

  getGameWithId(summonerId) { 
    this.gameService.getGame(summonerId)
        .subscribe(
            game => {
              this.game = game;
              this.getFullChampions();
              console.log(game);
            },
            error => {
              alert("Error getting game");
            }
        );
  }   

  getFullChampions() { 
    for (let champion of this.game.teamOneBans) {
      this.championService.getChampion(champion.id)
          .subscribe(
            fullChamp => {
              champion.image = fullChamp.image;
              champion.name = fullChamp.name;
            },
            error => {
              alert("Error filling temaOneBans");
            }
        );
    }

    for (let champion of this.game.teamTwoBans) {
      this.championService.getChampion(champion.id)
          .subscribe(
            fullChamp => {
              champion.image = fullChamp.image;
              champion.name = fullChamp.name;
            },
            error => {
              alert("Error filling temaTwoBans");
            }
        );
    }

    for (let summoner of this.game.teamOne.summoners) {
      this.championService.getChampion(summoner.champion.id)
          .subscribe(
            fullChamp => {
              summoner.champion = fullChamp; 
            },
            error => {
              alert("Error filling teamOne Champions");
            }
        );
    }

    for (let summoner of this.game.teamTwo.summoners) {
      this.championService.getChampion(summoner.champion.id)
          .subscribe(
            fullChamp => {
              summoner.champion = fullChamp; 
            },
            error => {
              alert("Error filling temaTwo Champions");
            }
        );

    }
  }

}
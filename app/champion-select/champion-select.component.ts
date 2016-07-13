import { Component, OnInit } from '@angular/core';

import { Champion } from '../champion/champion.model'; 
import { ChampionService } from '../champion/champion.service';

import { GameService } from '../game/game.service';
import { Game } from '../game/game.model'; 

import { Summoner } from '../summoner/summoner.model'; 


@Component({
  selector:'champion-select',
  providers: [ChampionService, GameService],
  templateUrl: 'app/champion-select/champion-select.component.html',
  styleUrls: ['app/champion-select/champion-select.component.scss'],
})

export class ChampionSelectComponent implements OnInit { 
  private champions: Champion[];  
  private selectedChampion: Champion;
  
  private teamOneTop: Summoner = new Summoner;
  private teamOneJungler: Summoner = new Summoner;;
  private teamOneMid: Summoner = new Summoner;
  private teamOneADC: Summoner = new Summoner;
  private teamOneSupport: Summoner = new Summoner;
  private teamOne: Summoner[] = [];

  private teamTwoTop: Summoner = new Summoner;
  private teamTwoJunlger: Summoner = new Summoner;
  private teamTwoMid: Summoner = new Summoner;
  private teamTwoADC: Summoner = new Summoner;
  private teamTwoSupport: Summoner = new Summoner;
  private teamTwo: Summoner[] = [];

  private game: Game; 
  
  constructor(private championService: ChampionService,
              private gameService: GameService
              ) {} 

  //Currently moving logic to champion.service.
  getChampions() { 
    this.championService.getChampions()
        .subscribe(
            champions => {
              this.champions = champions;
            },
            error => {
              alert("error getting champions");
            }
        );
  }

  getGame() { 
    this.gameService.getGame(35590582)
        .subscribe(
            game => {
              this.game = game;
              console.log(this.game);
            },
            error => {
              alert("error getting champions");
            }
        );
  }   
  
  ngOnInit() {
   this.getChampions();
   this.teamOneTop.name = "Summoner One";
   this.teamOneTop.position = "Top";
   this.teamOneJungler.name = "Summoner Two";
   this.teamOneJungler.position = "Jungler";
   this.teamOneMid.name = "Summoner Three";
   this.teamOneMid.position = "Mid";
   this.teamOneADC.name = "Summoner Four";
   this.teamOneADC.position = "ADC";
   this.teamOneSupport.name = "Summoner Five";
   this.teamOneSupport.position = "Support";
   this.teamOne = [this.teamOneTop, this.teamOneJungler, this.teamOneMid, this.teamOneADC, this.teamOneSupport];
   this.getGame();
  }

  onSelect(champion: Champion): void {
    this.selectedChampion = champion; 
  }
   
  onSetSummonerChampion(summoner: Summoner): void {
    if (this.selectedChampion === null) {
      return;
    }

    summoner.champion = this.selectedChampion;
  }

}
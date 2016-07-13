import { Component, OnInit } from '@angular/core';
import { ChampionSelectComponent } from './champion-select/champion-select.component';
import { LiveGameAnalysisComponent} from './live-game-analysis/live-game-analysis.component';

@Component({
  selector: 'my-app',
  template:`
  			 <live-game-analysis></live-game-analysis> 
  		`,
  directives: [ChampionSelectComponent, LiveGameAnalysisComponent],
  
})

export class AppComponent { }
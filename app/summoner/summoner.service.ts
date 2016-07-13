import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Summoner } from './summoner.model';

@Injectable()
export class SummonerService {

  constructor(private http: Http) {}
  
  getSummoner(summonerName: string): Observable<Summoner> {
    return this.http.get("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + summonerName + "?api_key=ae7d33af-66df-4466-8b95-ff538f8d792a")
        .map(res => res.json())
        .map(res => { 
          let summoner = new Summoner; 
          let summonerJson = res[summonerName.toLowerCase().replace(/ /g, '')];
          summoner.id = summonerJson['id'];
          summoner.name = summonerJson['name'];
          summoner.image = summonerJson['profileIconId'];
          console.log(summoner.image);
          return summoner;
        });
  }
}
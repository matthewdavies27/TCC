import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Champion } from './champion.model';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChampionService {

  constructor(private http: Http) {}

  getChampions(): Observable<Champion[]> {
    return this.http.get('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=image&api_key=ae7d33af-66df-4466-8b95-ff538f8d792a')
        .map(res => res.json())
        .map(res => { 
          let champions: Champion[] = []; 
          let championsJson = res['data'];
          for (let championIndex in championsJson) {
            champions.push(this.decodeChampion(championsJson[championIndex]));
          } 
          
          champions.sort( (championLeft, championRight): number => {
            if (championLeft.name < championRight.name) return -1;
            if (championLeft.name > championRight.name) return 1; 
            return 0;
            });

          return champions;

        });
  }

  getChampion(championId: number): Observable<Champion> { 
    return this.http.get("https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/" + championId + "?api_key=ae7d33af-66df-4466-8b95-ff538f8d792a")
        .map(res => res.json())
        .map(res => {
                      let champion: Champion;
                      champion = this.decodeChampion(res);
                      return champion;
                    }
            );
  }     

  decodeChampion(jsonObject: Object): Champion {
    let champion: Champion = new Champion();
    champion.id = jsonObject['id'];
    champion.name = jsonObject['name'];
    champion.image = "" + jsonObject['name'].replace(/ /g, '') + ".png";
    if (champion.image === "Kha'Zix.png") {
      champion.image = "Khazix.png";
    }
    if (champion.image === "LeBlanc.png") {
      champion.image = "Leblanc.png";
    }
    if (champion.image === "VelKoz.png") {
      champion.image = "Velkoz.png";
    }
    return champion; 
  }
}



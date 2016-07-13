export class Champion {
  id: number;
  name: string;
  image: string; 

  getImageLink(): string { 
    return "http://ddragon.leagueoflegends.com/cdn/6.13.1/img/champion/" + this.image;
  }


}


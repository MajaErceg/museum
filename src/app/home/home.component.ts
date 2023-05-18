import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' , styleUrls: ['home.component.css']} )
export class HomeComponent {
    user: User;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
    }

    
  postavke = [
    {id:"1", url: "assets/images/rediinger.jpg", desc: " Apstraktni Ekspresionizam   " , tip: "Stalno", eksponati: "slike", brEksponata:"3", cena: 200, vreme: 30, link:"/jedan" }, 
    {id:"2", url: "assets/images/madonaUzelenom.jpg", desc: " Renesansa  ", tip: "Stalno",  eksponati: "skulpture", brEksponata:"5", cena: 500, vreme: 50, link:"/dva"},
    {id:"16", url: "assets/images/gospodjaIzAvinjona.jpg", desc: " Kubizam   ", tip: "Periodicno", eksponati: "slike", brEksponata:"7", cena: 350, vreme: 40, link:"/tri"},
    {id:"3", url: "assets/images/ramulsAndRemus.jpg", desc: " Rimska umetnost  ", tip: "Stalno", eksponati: "skulpture", brEksponata:"4", cena: 450, vreme: 80, link:"/cetiri"},
    {id:"4", url: "assets/images/devojkaIspredOgledala.jpg", desc: " Nadrealizam", tip: "Periodicno",  eksponati: "ostalo", brEksponata:"6", cena: 750, vreme: 100, link:"/pet"},
    {id:"5", url: "assets/images/pogledNaDelft.jpg", desc: " Barok ", tip: "Usputno",  eksponati: "skulpture", brEksponata:"7",cena: 1000, vreme: 120, link:"/sest"}
    ];
  
}
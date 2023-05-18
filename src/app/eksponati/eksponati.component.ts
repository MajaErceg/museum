import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '@app/_models';
import { AccountService, AlertService } from '@app/_services';
import { PlanerService } from '@app/_services/planer.service';
import { element } from 'protractor';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-eksponati',
  templateUrl: './eksponati.component.html',
  styleUrls: ['./eksponati.component.css']
})
export class EksponatiComponent implements OnInit {

  eksponati = [];
  tekst: any;
  toFilter = [];
  favorites : any;
  id: string;
  izlozbaID: any;

  komentari = [];

  ocene = [];

  mojRejting: any;
  user:User;

    
  namestar1 = "star_border";
  namestar2 = "star_border";
  namestar3 = "star_border";
  namestar4 = "star_border";
  namestar5 = "star_border";

  constructor(private _snackBar: MatSnackBar,private router: Router, private route: ActivatedRoute, private planerService: PlanerService, private alertService: AlertService, private accountService: AccountService) {
    this.eksponati = this.router.getCurrentNavigation().extras.state.eks;
    this.tekst = this.router.getCurrentNavigation().extras.state.tekst;
    this.toFilter = this.router.getCurrentNavigation().extras.state.eks;
    this.id = this.router.getCurrentNavigation().extras.state.prosledjenID;

    this.izlozbaID = this.router.getCurrentNavigation().extras.state.izlozbaID;
    this.accountService.user.subscribe(x => this.user = x);

  }


  ngOnInit(): void {

    this.planerService.getKomentarByIzlozbaID(this.izlozbaID)
    .pipe(first())
    .subscribe(komentari => this.komentari.push(komentari));


    this.planerService.getOcenaByIzlozbaID(this.izlozbaID)
    .pipe(first())
    .subscribe(ocene => {
      this.ocene.push(ocene);
    
      this.ispisiRating();
    });    
  }

  searchFilter(filterValue: string){

    var value = filterValue.trim().toLowerCase();     

    this.eksponati = this.toFilter.filter(s => ((s.naziv).trim().toLowerCase()).includes(value) );  
  }


  
  ispisiRating(){

    var nova = this.ocene.find(i=> i);

    var blje = nova[nova.length-1];

    console.log(blje); /// ovde imamo objekat koji ima .stvarnaSV to je nas rejting

    var ocenica = blje.stvarnaSV;

    parseInt(ocenica);
    

    console.log(ocenica);

    if(ocenica === 1 ){

      this.namestar1 = "star";
      this.namestar2 = "star_border";
      this.namestar3 = "star_border";
      this.namestar4 = "star_border";
      this.namestar5 = "star_border";

    }else if(ocenica > 1 && ocenica < 2){

      this.namestar1 = "star";
      this.namestar2 = "star_half";
      this.namestar3 = "star_border";
      this.namestar4 = "star_border";
      this.namestar5 = "star_border";

    }else if(ocenica === 2){

      this.namestar1 = "star";
      this.namestar2 = "star";
      this.namestar3 = "star_border";
      this.namestar4 = "star_border";
      this.namestar5 = "star_border";
    
    }else if(ocenica > 2 && ocenica < 3){

      this.namestar1 = "star";
      this.namestar2 = "star";
      this.namestar3 = "star_half";
      this.namestar4 = "star_border";
      this.namestar5 = "star_border";
      
    }else if(ocenica === 3){

      this.namestar1 = "star";
      this.namestar2 = "star";
      this.namestar3 = "star";
      this.namestar4 = "star_border";
      this.namestar5 = "star_border";

      
    }else if(ocenica > 3 && ocenica < 4){

      this.namestar1 = "star";
      this.namestar2 = "star";
      this.namestar3 = "star";
      this.namestar4 = "star_half";
      this.namestar5 = "star_border";
      
    }else if(ocenica === 4){

      this.namestar1 = "star";
      this.namestar2 = "star";
      this.namestar3 = "star";
      this.namestar4 = "star";
      this.namestar5 = "star_border";
      
    }else if(ocenica > 4 && ocenica < 5){

      this.namestar1 = "star";
      this.namestar2 = "star";
      this.namestar3 = "star";
      this.namestar4 = "star";
      this.namestar5 = "star_half";
      
    }else if(ocenica === 5){

      this.namestar1 = "star";
      this.namestar2 = "star";
      this.namestar3 = "star";
      this.namestar4 = "star";
      this.namestar5 = "star";
      
    } 

  }



  addToFavorites(eksponat : any) {
     if(!this.user){
      this._snackBar.open("Morate biti ulogovani!", "",  {duration: 2500});}else{

    if(eksponat.omiljeni == "favorite"){

      this.planerService.getFavorites(this.id)
      .pipe(first())
      .subscribe(favorites => this.favorites = favorites);

      eksponat.omiljeni = "favorite_border";
      
      this.planerService.deleteFavorites(this.id, eksponat)
          .pipe(first())
          .subscribe(() => this.favorites = this.favorites.filter((x: { naziv: string; }) => x.naziv !== eksponat.naziv));

    }else{

      eksponat.omiljeni="favorite";

      this.planerService.addToFavorites(this.id, eksponat)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Added successful');
              },
              error: (error: any) => {
                  this.alertService.error(error);
              }
            });
    }
  }


  }

}
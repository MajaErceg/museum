import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetaljiObilaskaComponent } from '@app/detalji-obilaska/detalji-obilaska.component';
import { KomentarComponent } from '@app/komentar/komentar.component';
import { User } from '@app/_models';
import { first } from 'rxjs/operators';
import {  AccountService, AlertService } from '../_services';
import { PlanerService } from '../_services/planer.service';

@Component({
  selector: 'app-li',
  templateUrl: './li.component.html',
  styleUrls: ['./li.component.css']
})
export class LiComponent implements OnInit {
  user: User;

  constructor(private accountService: AccountService, private planerService: PlanerService, private route: ActivatedRoute, public dialog: MatDialog, private alertService: AlertService) { 
    this.accountService.user.subscribe(x => this.user = x);
  }

  
  id: string;
  obilasci : any;
  favorites : any;
  obilasciZavrseni : any;
  izlozbe: any;

  ukupnaCena: any;

  jednaIzlozba: any;


  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.planerService.getObilazakTekuci(this.id)
          .pipe(first())
          .subscribe(obilasci =>{ this.obilasci = obilasci,
            this.obilasci.forEach(element => {

              this.planerService.getIzlozbe(this.id, element.id )
              .pipe(first())
              .subscribe(izlozbe => {this.izlozbe = izlozbe, // izlozbe sada biti sve izlozbe iz jednog obilaska, pa sve izlozbe iz drugog itd
        
                this.jednaIzlozba = this.izlozbe.map(i=> i )
            
              this.jednaIzlozba.forEach(element => {
                this.ukupnaCena = 0;
                this.ukupnaCena += element.cena
              });
            });
            });
        
            console.log(this.ukupnaCena)
          
          
          });

    this.planerService.getObilazakZavrsen(this.id)
          .pipe(first())
          .subscribe(obilasci => this.obilasciZavrseni = obilasci);


    this.planerService.getFavorites(this.id)
          .pipe(first())
          .subscribe(favorites => this.favorites = favorites);
  }

  cena(event){
    

    this.obilasci.forEach(element => {

      this.planerService.getIzlozbe(this.id, element.id )
      .pipe(first())
      .subscribe(izlozbe => this.izlozbe = izlozbe); // izlozbe sada biti sve izlozbe iz jednog obilaska, pa sve izlozbe iz drugog itd

    
      this.izlozbe.forEach(element => {
        this.ukupnaCena = 0;
        this.ukupnaCena += element.cena
      });
    });

    console.log(this.ukupnaCena)

  }


  deleteObilazak(obilazak : any){
    this.planerService.deleteObilazak(this.id, obilazak)
        .pipe(first())
        .subscribe(() => this.obilasci = this.obilasci.filter(x => x.id !== obilazak.id));
  }

  detaljiObilaska(obilazak: any){
    let dialogRef = this.dialog.open(DetaljiObilaskaComponent, {
      data: {prosledjenObilazak : obilazak, prosledjenID: this.id }
    });
  }


  deleteFavorites(eksponat : any){
    this.planerService.deleteFavorites(this.id, eksponat)
        .pipe(first())
        .subscribe(() => this.favorites = this.favorites.filter(x => x.id !== eksponat.id));
  }


  zavrsiObilazak(obilazak : any){

    this.planerService.zavrsiObilazak(this.id, obilazak)
    .pipe(first())
    .subscribe({
        next: () => {
            this.alertService.success('Obilazak je zavrsen !');
        },
        error: error => {
            this.alertService.error(error);
        }
    });

    this.planerService.deleteObilazak(this.id, obilazak)
    .pipe(first())
    .subscribe(() => this.obilasci = this.obilasci.filter(x => x.id !== obilazak.id));

    this.planerService.getObilazakTekuci(this.id)
    .pipe(first())
    .subscribe(obilasci => this.obilasci = obilasci);

    this.planerService.getObilazakZavrsen(this.id)
          .pipe(first())
          .subscribe(obilasci => this.obilasciZavrseni = obilasci);


    //////// kad stavimo status da je gotov obilazak, otvaramo dijalog da bi mogli da napisemo komentar za svaku izlozbu koju smo posetili u obilasku ///////
    ////////  prosledjujemo obilazak koji smo zavrsili ( iz njega cemo izvuci izlozbe ), a i nas ID koji upisujemo u komentar
    let dialogRef = this.dialog.open(KomentarComponent, {
      data: {prosledjenObilazak : obilazak, prosledjenID: this.id }
    });



  }



}




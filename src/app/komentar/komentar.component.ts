import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/_models';
import { Komentar } from '@app/_models/komentar';
import { Ocena } from '@app/_models/ocena';
import { AccountService, AlertService } from '@app/_services';
import { PlanerService } from '@app/_services/planer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-komentar',
  templateUrl: './komentar.component.html',
  styleUrls: ['./komentar.component.less']
})
export class KomentarComponent implements OnInit {

  imeUseraProsledjeno: User;

  constructor( private accountService: AccountService ,private planerService: PlanerService, private route: ActivatedRoute, private alertService: AlertService,
    public dialogRef: MatDialogRef<KomentarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.accountService.user.subscribe(x => this.imeUseraProsledjeno = x);
     }

    id: string;
    obilazak: any;
    izlozbe: any;
    vrednost = true;

    // ovde izvlacim iz obilaska koji sam prosledila , izvlacim izlozbe koje su bile u njemu, pa cu svaku da ocenim ( komentarisem )
  
    ngOnInit(){

      this.id = this.data.prosledjenID;
      this.obilazak = this.data.prosledjenObilazak;

      this.planerService.getIzlozbe(this.id, this.obilazak.id )
            .pipe(first())
            .subscribe(izlozbe => this.izlozbe = izlozbe);
    }

    onCancel(): void {
      this.dialogRef.close();
    }


    napisiKomentar(izlozba : any, tekst : any){    // prosledjujem izlozbu na koju pritisnem

      let komentar = new Komentar();

      komentar.idIzlozbe = izlozba.uq;
      komentar.idUser = this.id;
      komentar.tekst = tekst;
      komentar.imeUsera = this.imeUseraProsledjeno.username;

      this.planerService.napisiKomentar(komentar)
      .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Komentar kreiran uspesno!');
              },
              error: error => {
                  this.alertService.error(error);
              }
          });

          console.log(komentar)


          let ocena = new Ocena();
          ocena.id = izlozba.uq;
    
          ocena.rating = parseInt(this.ratingMoj);
    
          this.planerService.pushOcena(ocena)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Ocenili ste uspesno!');
              },
              error: error => {
                  this.alertService.error(error);
              }
          });

    }

    ratingMoj:any;

    onItemChange(value){
      this.ratingMoj = value;
    }


    oceni(izlozba: any){

      let ocena = new Ocena();
      ocena.id = izlozba.uq;

      ocena.rating = parseInt(this.ratingMoj);

      this.planerService.pushOcena(ocena)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Ocenili ste uspesno!');
          },
          error: error => {
              this.alertService.error(error);
          }
      });
     

    }



 

}


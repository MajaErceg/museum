import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DetaljiEksComponent } from '@app/detalji-eks/detalji-eks.component';
import { PlanerService } from '@app/_services/planer.service';
import { first } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-detalji-obilaska',
  templateUrl: './detalji-obilaska.component.html',
  styleUrls: ['./detalji-obilaska.component.less']
})
export class DetaljiObilaskaComponent implements OnInit {
  vrednost = true;


  constructor( private planerService: PlanerService, public dialog: MatDialog, private route: ActivatedRoute, private router: Router,
    public dialogRef: MatDialogRef<DetaljiObilaskaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.id = this.data.prosledjenID;
      this.obilazak = this.data.prosledjenObilazak;

      this.planerService.getIzlozbe(this.id, this.obilazak.id )
            .pipe(first())
            .subscribe(izlozbe => this.izlozbe = izlozbe)
     }

    id: string;
    obilazak: any;
    izlozbe: any;

    ukupnaCena : number;
    ukupnoVreme: number;

    ngOnInit(){
      this.id = this.data.prosledjenID;
      this.obilazak = this.data.prosledjenObilazak;

      this.planerService.getIzlozbe(this.id, this.obilazak.id )
            .pipe(first())
            .subscribe(izlozbe => this.izlozbe = izlozbe);


            let daliIma  = this.obilazak.status === "Zavrsen obilazak";
            if(daliIma){ 
              this.vrednost = false;
            }else{
              this.vrednost = true;
            }
            
    }

    cena(event){
      this.izlozbe.forEach(element => {
        this.ukupnaCena = 0;
        this.ukupnaCena += element.cena
      });
    }

    vreme(event){
      this.izlozbe.forEach(element => {
        this.ukupnoVreme = 0;
        this.ukupnoVreme += element.vreme
      });
    }

    onCancel(): void {
      this.dialogRef.close();
    }

    deleteIzlozba(izlozba: any){
      
    this.planerService.deleteIzlozba(this.id, this.obilazak.id, izlozba)
    .pipe(first())
    .subscribe(() => this.izlozbe = this.izlozbe.filter(x => x.uq !== izlozba.uq));

    }

    eksponati: any;


    getEksponatiIzizlozbe(izlozbaa: any){



        if(izlozbaa.naziv === " Apstraktni Ekspresionizam   "){

          this.eksponati = [
            {url: "assets/images/broj5.jpg", naziv: "Broj 5" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border" },     
            {url: "assets/images/creoleDancer.jpg", naziv: " Creole dancer  ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true , omiljeni: "favorite_border"},       
            {url: "assets/images/plaviAkt.jpg", naziv: " Plavi akt",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border"},     
            {url: "assets/images/jesenjiRitam.jpg", naziv: " Jesenji ritam  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" , dostupno: false, omiljeni: "favorite_border"},     
            {url: "assets/images/portraitAndDream.jpg", naziv: " Portrait and Dream",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border" }, 
            {url: "assets/images/moonWoman.jpg", naziv: " Moon  Woman ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: false, omiljeni: "favorite_border"} 
          ];
        
           let dialogRef = this.dialog.open(DetaljiEksComponent, {
      data: {eksponati : this.eksponati },  height: '600px',
  width: '600px'
    });
    
        }else if (izlozbaa.naziv === " Renesansa  "){
    
          this. eksponati = [
            {url: "assets/images/tajnaVecera.jpg", naziv: "Tajna vecera" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/monaLiza.jpeg", naziv: " Mona Liza   ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/vitruvian.jpg", naziv: " Vitruvian",  cena: 50, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/pijeta.jpg", naziv: " Pijeta  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: false, omiljeni: "favorite_border" },
            {url: "assets/images/sikstinskaKapela.jpg", naziv: " Sikstinska kapela",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" , dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/stvaranjeAdamaa.jpg", naziv: " Stvaranje Adama",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: false, omiljeni: "favorite_border"}
          ];
        
           let dialogRef = this.dialog.open(DetaljiEksComponent, {
      data: {eksponati : this.eksponati },  height: '600px',
  width: '600px'
    });
    
        }else if (izlozbaa.naziv === " Kubizam   "){
    
          this.eksponati = [
            {url: "assets/images/portraitPabloP.jpg", naziv: "Portrait Pablo Pikaso" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/portretDoreMar.jpg", naziv: " Portret Dore Mar   ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/gospodjaIzAvinjona.jpg", naziv: "Gospodja Iz Avinjona",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/zaklinaSaCvecem.jpg", naziv: " Zaklina sa cvecem  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/zenaKojaPlace.jpg", naziv: " Zena koja place",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" , dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/autoPortretSedamPrstju.jpg", naziv: " Sedam prstju ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border"}
          ];
        
           let dialogRef = this.dialog.open(DetaljiEksComponent, {
      data: {eksponati : this.eksponati },  height: '600px',
  width: '600px'
    });
    
        }else if (izlozbaa.naziv === " Rimska umetnost  "){
    
          this.eksponati = [
            {url: "assets/images/derWildeAlexander.jpg", naziv: "Der wilde Alexander " , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/freskapompeja.jpg", naziv: " Freska Pompeja",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/karakala.jpg", naziv: " Karakala ",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/romaAraPacis.jpg", naziv: " Ara Pacis  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/bartolomeo.jpg", naziv: " Bartolomeo",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" ,  dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/caracallaThermae.jpg", naziv: "Baths of Caracalla  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border"}
          ];
    
    
           let dialogRef = this.dialog.open(DetaljiEksComponent, {
      data: {eksponati : this.eksponati },  height: '600px',
  width: '600px'
    });
    
        }else if (izlozbaa.naziv === " Nadrealizam"){
    
          this.eksponati = [
            {url: "assets/images/philosophersLamp.jpg", naziv: "Philosophers Lamp" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/MaeWestSofa.jpg", naziv: "Mae West Sofa  ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/gernika.jpg", naziv: " Gernika",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/LobsterTelephone.jpg", naziv: " Lobster telephone  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/zirafaUPlamenu.jpg", naziv: " Zirafa u plamenu",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" ,  dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/iskusenjaSvetogAntonija.jpg", naziv: " Iskusenja Svetog Antonija ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border"}
          ];
    
    
           let dialogRef = this.dialog.open(DetaljiEksComponent, {
      data: {eksponati : this.eksponati },  height: '600px',
  width: '600px'
    });
    
        }else if(izlozbaa.naziv === " Barok "){
    
          this.eksponati = [
            {url: "assets/images/polaganjeHristUgrob.jpg", naziv: "Polaganje Hrist u grob" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/zanosSveteTereze.jpg", naziv: " Zanos Svete Tereze  ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/povratakBludnogSina.jpg", naziv: " Povratak bludnog sina",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/otmicaProzerpine.png", naziv: " Otmica Prozerpine  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border" },
            {url: "assets/images/bolesniMladiBah.jpg", naziv: " Bolesni mladi Bah",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" ,  dostupno: true, omiljeni: "favorite_border"},
            {url: "assets/images/theLaughingCavalier.jpg", naziv: " The Laughing Cavalier ",cena: 50, vreme: 5, zemljaPorekla:"Holandija" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border"}
          ];
    
    
           let dialogRef = this.dialog.open(DetaljiEksComponent, {
      data: {eksponati : this.eksponati },  height: '600px',
  width: '600px'
    });
    
        }
       

    }

}

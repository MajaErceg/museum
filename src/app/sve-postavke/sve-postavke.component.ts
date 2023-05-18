import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BirajObilazakComponent } from '@app/biraj-obilazak/biraj-obilazak.component';
import { User } from '@app/_models';
import { Obilazak } from '@app/_models/obilazak';
import { AccountService, AlertService } from '@app/_services';
import { PlanerService } from '@app/_services/planer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sve-postavke',
  templateUrl: './sve-postavke.component.html',
  styleUrls: ['./sve-postavke.component.css']
})
export class SvePostavkeComponent implements OnInit {

  id: string | any;
  vraceniObilasci: any;
  eksponati = [];
  user: User;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private planerService: PlanerService,private _snackBar: MatSnackBar, private accountService:AccountService,
    private router: Router, private alertService: AlertService) { 
      this.accountService.user.subscribe(x => this.user = x);
    }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.planerService.getObilazak(this.id)
    .pipe(first())
    .subscribe(obilasci => this.vraceniObilasci = obilasci);
  }

  postavke = [
    { uq: "1", url: "assets/images/rediinger.jpg", naziv: " Apstraktni Ekspresionizam   ", tip: "Stalno", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/re.jpg", naziv: " Renesansa  ", tip: "Stalno", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/gospodjaIzAvinjona.jpg", naziv: " Kubizam   ", tip: "Periodicno", eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/rim.jpg", naziv: " Rimska umetnost  ", tip: "Stalno", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/na.jpg", naziv: " Nadrealizam", tip: "Periodicno", eksponati: "grafikaIcrtezi", brEksponata: "6", cena: 750, vreme: 100, link: "/pet" },
    { uq: "5", url: "assets/images/pogledNaDelft.jpg", naziv: " Barok ", tip: "Usputno", eksponati: "skulpture", brEksponata: "7", cena: 1000, vreme: 120, link: "/sest" }
  ];

  tekst: any;

  addIzlozbaToObilazak(izlozba: any) {

    if(!this.user){
      this._snackBar.open("Morate biti ulogovani!", "",  {duration: 2500});}else{


    let dialogRef = this.dialog.open(BirajObilazakComponent, {
      data: { prosledjenID: this.id }
    });

    let prosledjenoImeObilaska;

    let izabranObilazak;

    this.planerService.getObilazak(this.id)
    .pipe(first())
    .subscribe(obilasci => this.vraceniObilasci = obilasci);

    dialogRef.afterClosed().subscribe((result) => {

    prosledjenoImeObilaska = result

   
    if (this.vraceniObilasci.find(x => x.naziv === prosledjenoImeObilaska)) {

      izabranObilazak = this.vraceniObilasci.filter( x=> x.naziv === prosledjenoImeObilaska)

      izabranObilazak.id = izabranObilazak.map( x=> x.id)

      this.planerService.addToObilazak(this.id, izabranObilazak.id, izlozba)
      .pipe(first())
      .subscribe({
          next: () => {
              this.alertService.success('Izlozba je dodata!');
          },
          error: error => {
              this.alertService.error(error);
          }
      });

      this.planerService.getObilazak(this.id)
      .pipe(first())
      .subscribe(obilasci => this.vraceniObilasci = obilasci);


    } else {

       if(prosledjenoImeObilaska != undefined){

          let obilazak = new Obilazak();

          obilazak.izlozbe = [];

          obilazak.naziv = prosledjenoImeObilaska;
          obilazak.izlozbe.push(izlozba);

          // zovemo create new obilazak
          this.planerService.createNewObilazak(this.id, obilazak)
          .pipe(first())
          .subscribe({
              next: () => {
                  this.alertService.success('Obilazak je kreiran uspesno !');
              },
              error: error => {
                  this.alertService.error(error);
              }
          });
        }
      }
    });
  }
  }

  openIzlozbaPage(izlozba : any){

    if(izlozba.naziv === " Apstraktni Ekspresionizam   "){

      this.eksponati = [
        {url: "assets/images/broj5.jpg", naziv: "Broj 5" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Apstraktni Ekspresionizam" },     
        {url: "assets/images/creoleDancer.jpg", naziv: " Creole dancer  ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true , omiljeni: "favorite_border", imeIzlozbe: "Apstraktni Ekspresionizam"},       
        {url: "assets/images/plaviAkt.jpg", naziv: " Plavi akt",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Apstraktni Ekspresionizam"},     
        {url: "assets/images/jesenjiRitam.jpg", naziv: " Jesenji ritam  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" , dostupno: false, omiljeni: "favorite_border", imeIzlozbe: "Apstraktni Ekspresionizam"},     
        {url: "assets/images/portraitAndDream.jpg", naziv: " Portrait and Dream",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Apstraktni Ekspresionizam" }, 
        {url: "assets/images/moonWoman.jpg", naziv: " Moon  Woman ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: false, omiljeni: "favorite_border", imeIzlozbe: "Apstraktni Ekspresionizam"} 
      ];

      this.tekst = " Apstraktni ekspresionizam je američki umjetnički pokret nastao poslije 2. svjetskog rata. Postigao je svjetski utjecaj te postavio New York u središte zapadnog umjetničkog svijeta, preuzevši ulogu Pariza. Pojam „apstraktni ekspresionizam“ uvodi 1929. godine američki muzeolog i povjesničar umjetnosti Alfred H. Barr Jr, u vezi s djelima Wassilya Kandinskog.  Svoj procvat doživljava 1940-ih u New Yorku kada je nova generacija američkih umjetnika počela isplivavati na površinu i dominirati svjetskom pozornicom, bili su to apstraktni ekspresionisti.  Njihova su djela poznata po silovitim potezima kista, iskrivljenim oblicima i naglašeno jakim koloritom. ";

      this.router.navigate(['../eksponati'], {state : { eks : this.eksponati, tekst: this.tekst, prosledjenID: this.id, izlozbaID: izlozba.uq }});

    }else if (izlozba.naziv === " Renesansa  "){

      this. eksponati = [
        {url: "assets/images/tajnaVecera.jpg", naziv: "Tajna vecera" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Renesansa" },
        {url: "assets/images/monaLiza.jpeg", naziv: " Mona Liza   ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Renesansa" },
        {url: "assets/images/vitruvian.jpg", naziv: " Vitruvian",  cena: 50, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Renesansa"},
        {url: "assets/images/pijeta.jpg", naziv: " Pijeta  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: false, omiljeni: "favorite_border", imeIzlozbe: "Renesansa" },
        {url: "assets/images/sikstinskaKapela.jpg", naziv: " Sikstinska kapela",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" , dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Renesansa"},
        {url: "assets/images/stvaranjeAdamaa.jpg", naziv: " Stvaranje Adama",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: false, omiljeni: "favorite_border", imeIzlozbe: "Renesansa"}
      ];

      this.tekst = " Renesansa(franc. renaissance-preporod) je kulturno-istorijski pojam koji je najpre označavao doba od 14. do 16. veka kao period u kome je došlo do ponovnog interesovanja za klasičnu antiku i procvata umetnosti, da bi se zatim ovim pojmom označavalo kulturno stanje prelaznog doba od srednjeg veka do novog doba, naročito u Italiji. Pojam renesansa je u uzajamnom odnosu sa pojmom humanizam. Humanizam se odnosio na naučno-duhovni sadržaj ovog razdoblja, a renesansa na celokupnu kulturu tog vremena.Pored toga, ovaj pojam se primenjuje i da označi srednjovekovne preteče renesanse - karolinška renesansa.Od 19. veka se u istoriografiji koristi da označi epohu."

      this.router.navigate(['../eksponati'], {state : { eks : this.eksponati, tekst: this.tekst, prosledjenID: this.id, izlozbaID: izlozba.uq  }});

    }else if (izlozba.naziv === " Kubizam   "){

      this.eksponati = [
        {url: "assets/images/portraitPabloP.jpg", naziv: "Portrait Pablo Pikaso" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Kubizam"},
        {url: "assets/images/portretDoreMar.jpg", naziv: " Portret Dore Mar   ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Kubizam"},
        {url: "assets/images/gospodjaIzAvinjona.jpg", naziv: "Gospodja Iz Avinjona",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Kubizam"},
        {url: "assets/images/zaklinaSaCvecem.jpg", naziv: " Zaklina sa cvecem  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Kubizam"},
        {url: "assets/images/zenaKojaPlace.jpg", naziv: " Zena koja place",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" , dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Kubizam"},
        {url: "assets/images/autoPortretSedamPrstju.jpg", naziv: " Sedam prstju ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan", dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Kubizam"}
      ];

      this.tekst = "Kubizam je inovativan pokret moderne umetnosti koji je postao dominantan oblik avangardnog slikarstva i vajarstva u Parizu pre Prvog svetskog rata. Pored presudnog uticaja na likovne umetnosti, snažno je uticao na razvoj dizajna i, u određenoj meri, na arhitekturu. Kubizam je bio složen fenomen i uključivao je ne samo novi stil, već kako je izrazio jedan od njegovih vodećih predstavnika Huan Gris, „kubizam je novi način predstavljanja sveta”.Napuštajući perspektivu i ideju posmatranja predmeta iz jednog fiksnog ugla i, u manjoj meri, jednog momenta u vremenu,što je još do renesanse bila dominanta evropskog slikarstva, kubisti su obrnuli metod akademskog iluzionizma „uvođenjem višestrukih tački pogleda na predmet, distorzijom forme i dvosmislenim prostornim odnosima u svojim slikama, potpuno zbunjujući očekivanja posmatrača.";

      this.router.navigate(['../eksponati'], {state : { eks : this.eksponati, tekst: this.tekst, prosledjenID: this.id, izlozbaID: izlozba.uq  }});

    }else if (izlozba.naziv === " Rimska umetnost  "){

      this.eksponati = [
        {url: "assets/images/derWildeAlexander.jpg", naziv: "Der wilde Alexander " , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Rimska umetnost" },
        {url: "assets/images/freskapompeja.jpg", naziv: " Freska Pompeja",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Rimska umetnost" },
        {url: "assets/images/karakala.jpg", naziv: " Karakala ",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Rimska umetnost"},
        {url: "assets/images/romaAraPacis.jpg", naziv: " Ara Pacis  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Rimska umetnost" },
        {url: "assets/images/bartolomeo.jpg", naziv: " Bartolomeo",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" ,  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Rimska umetnost"},
        {url: "assets/images/caracallaThermae.jpg", naziv: "Baths of Caracalla  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Rimska umetnost"}
      ];

      this.tekst = "Rimska umetnost imala je najveći domet u periodu od 200. p. n. e. do 500. godine i dala je mnoštvo umetničkih dela, ali nije dala nekih naročitih novina. Razvijala se od apeninskog poluostrva a zatim se sa rimskim osvajanjima proširila na ceo Mediteran i ceo “poznati svet”. Ova umetnost koja je prešla na Apeninsko poluostrvo dobila je određene karakteristike i osobenosti i nije imala onaj oblik koji je bio u samom Rimu. Iako se računa da su Rim osnovali Romul i Rem 773. p. n. e. - prava rimska umetnost se razvijala i seže od 2. - 1. p. n. e. Rimljani su se oslobodili, postignuta su prava Rimljana a sa druge strane pojavili su se i zanati i zanatlije, kao robovi dolazeći iz različitih strana, donosili su sobom i određene tradicije. U Rimu je došlo do razvoja umetnosti koja je koristila umetnost ranijih epoha prevashodno umetnost stare Grčke.";

      this.router.navigate(['../eksponati'], {state : { eks : this.eksponati, tekst: this.tekst, prosledjenID: this.id, izlozbaID: izlozba.uq  }});

    }else if (izlozba.naziv === " Nadrealizam"){

      this.eksponati = [
        {url: "assets/images/philosophersLamp.jpg", naziv: "Philosophers Lamp" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Nadrealizam" },
        {url: "assets/images/MaeWestSofa.jpg", naziv: "Mae West Sofa  ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Nadrealizam" },
        {url: "assets/images/gernika.jpg", naziv: " Gernika",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Nadrealizam"},
        {url: "assets/images/LobsterTelephone.jpg", naziv: " Lobster telephone  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Nadrealizam" },
        {url: "assets/images/zirafaUPlamenu.jpg", naziv: " Zirafa u plamenu",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" ,  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Nadrealizam"},
        {url: "assets/images/iskusenjaSvetogAntonija.jpg", naziv: " Iskusenja Svetog Antonija ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Nadrealizam"}
      ];

      this.tekst = "Nadrealizam (franc. surréalisme) je književni i umetnički pokret koji se pojavljuje u Francuskoj posle Prvog svetskog rata. Nastavlja dadaizam i njegov buntovnički duh, pobunu protiv tradicije i ustaljenih navika i običaja, prezir prema društvenim normama, ali, za razliku od isključivo negatorskog duha dadaizma, ističe i svoju pozitivnu i konstruktivnu stranu i ima određeni program. Nadrealisti veruju u svemoć sna, nezainteresovane igre misli” (Breton, Manifest nadrealizma). Mnogi dadaisti se priključuju nadrealizmu, posebno iz razloga što je za razliku od dadaizma, razradio jedan sveopšti sistem<br>koji je bio u stanju da reaguje na društvene, umetničke i intelektualne prilike svoga vremena. ";

      this.router.navigate(['../eksponati'], {state : { eks : this.eksponati, tekst: this.tekst, prosledjenID: this.id, izlozbaID: izlozba.uq  }});

    }else if(izlozba.naziv === " Barok "){

      this.eksponati = [
        {url: "assets/images/polaganjeHristUgrob.jpg", naziv: "Polaganje Hrist u grob" , cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Barok" },
        {url: "assets/images/zanosSveteTereze.jpg", naziv: " Zanos Svete Tereze  ",  cena: 50, vreme: 5, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Barok" },
        {url: "assets/images/povratakBludnogSina.jpg", naziv: " Povratak bludnog sina",  cena: 350, vreme: 50, zemljaPorekla:"Francuska" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Barok"},
        {url: "assets/images/otmicaProzerpine.png", naziv: " Otmica Prozerpine  ",cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Barok" },
        {url: "assets/images/bolesniMladiBah.jpg", naziv: " Bolesni mladi Bah",  cena: 50, vreme: 5, zemljaPorekla:"Amerika" ,link:"/jedan" ,  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Barok"},
        {url: "assets/images/theLaughingCavalier.jpg", naziv: " The Laughing Cavalier ",cena: 50, vreme: 5, zemljaPorekla:"Holandija" ,link:"/jedan",  dostupno: true, omiljeni: "favorite_border", imeIzlozbe: "Barok"}
      ];

      this.tekst = " Barok ili baroko (naravno iz port. pérola barroca - perla nepravilnog oblika) je umetničko-kulturni period, koji je vladao u Evropi između godina 1600. i 1750. Nastao je u Italiji i proširio se po celoj Evropi injenim kolonijama. Od početka sedamnaestog veka u Evropi se afirmišu velike nacionalne monarhije. Začetnice modernih država sposobne da osvoje svet, Italija je bila rascepkana i politički slaba, ali je Rim i dalje bio centar umetnosti. Crkva je prisiljena da se suprotstavi udarima reformatora, bila je prinuđena da se menja, a promene u umetnosti dovele su do rađanja novog stila baroka, termin sa značenjem: bizaran, čudan. ";

      this.router.navigate(['../eksponati'], {state : { eks : this.eksponati, tekst: this.tekst, prosledjenID: this.id, izlozbaID: izlozba.uq  }});

    }

  }

  sortiraj(nesto: any) {

    if(nesto === "vreme"){

      console.log( "Vreme radi ")
      this.postavke = this.postavke.sort((a, b) => (a.vreme < b.vreme) ? -1 : 1);
      return this.postavke;

    }else if(nesto === "cena"){

      console.log( "cena radi")
      this.postavke = this.postavke.sort((a, b) => (a.cena < b.cena) ? -1 : 1);
      return this.postavke;

    }
}



      /* Vrsta postavke filter*/
  doFilter(typecc: String) {
    console.log(typecc);
    var tofilter = [
    { uq: "1", url: "assets/images/rediinger.jpg", naziv: " Apstraktni Ekspresionizam ", tip: "Stalno", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/madonaUzelenom.jpg", naziv: " Renesansa ", tip: "Stalno", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/gospodjaIzAvinjona.jpg", naziv: " Kubizam ", tip: "Periodicno", eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/ramulsAndRemus.jpg", naziv: " Rimska umetnost ", tip: "Stalno", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/devojkaIspredOgledala.jpg", naziv: " Nadrealizam", tip: "Periodicno", eksponati: "grafikaIcrtezi", brEksponata: "6", cena: 750, vreme: 100, link: "/pet" },
    { uq: "5", url: "assets/images/pogledNaDelft.jpg", naziv: " Barok ", tip: "Usputno", eksponati: "skulpture", brEksponata: "7", cena: 1000, vreme: 120, link: "/sest" }];
    
    
    
    this.postavke = tofilter.filter(s => s.tip == typecc);
    console.log(this.postavke);
    
    
    
  }

 /* Vrste eksponata filter*/
  doFilter1(typecc: String) {
  console.log(typecc);
  var tofilter1 = [
  { uq: "1", url: "assets/images/rediinger.jpg", naziv: " Apstraktni Ekspresionizam ", tip: "Stalno", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
  { uq: "2", url: "assets/images/madonaUzelenom.jpg", naziv: " Renesansa ", tip: "Stalno", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
  { uq: "16", url: "assets/images/gospodjaIzAvinjona.jpg", naziv: " Kubizam ", tip: "Periodicno", eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
  { uq: "3", url: "assets/images/ramulsAndRemus.jpg", naziv: " Rimska umetnost ", tip: "Stalno", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
  { uq: "4", url: "assets/images/devojkaIspredOgledala.jpg", naziv: " Nadrealizam", tip: "Periodicno", eksponati: "grafikaIcrtezi", brEksponata: "6", cena: 750, vreme: 100, link: "/pet" },
  { uq: "5", url: "assets/images/pogledNaDelft.jpg", naziv: " Barok ", tip: "Usputno", eksponati: "skulpture", brEksponata: "7", cena: 1000, vreme: 120, link: "/sest" }];
  
  
  
  this.postavke = tofilter1.filter(m => m.eksponati == typecc);
  console.log(this.postavke);
  
  
  
  }


  /* Broj eksponata filter */



  doFilter3(typecc: String) {

  console.log(typecc);
  var tofilter1 = [
  { uq: "1", url: "assets/images/rediinger.jpg", naziv: " Apstraktni Ekspresionizam ", tip: "Stalno", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
  { uq: "2", url: "assets/images/madonaUzelenom.jpg", naziv: " Renesansa ", tip: "Stalno", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
  { uq: "16", url: "assets/images/gospodjaIzAvinjona.jpg", naziv: " Kubizam ", tip: "Periodicno", eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
  { uq: "3", url: "assets/images/ramulsAndRemus.jpg", naziv: " Rimska umetnost ", tip: "Stalno", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
  { uq: "4", url: "assets/images/devojkaIspredOgledala.jpg", naziv: " Nadrealizam", tip: "Periodicno", eksponati: "grafikaIcrtezi", brEksponata: "6", cena: 750, vreme: 100, link: "/pet" },
  { uq: "5", url: "assets/images/pogledNaDelft.jpg", naziv: " Barok ", tip: "Usputno", eksponati: "skulpture", brEksponata: "7", cena: 1000, vreme: 120, link: "/sest" }];
  
  if (typecc == '3') {
  this.postavke = tofilter1.filter(d => d.brEksponata == '3');
  } else if (typecc == '3-5') {
  this.postavke = tofilter1.filter(d => d.brEksponata == '4'|| d.brEksponata == '5');
  } else {
  this.postavke = tofilter1.filter(d => d.brEksponata == '6' || d.brEksponata == '7');
  }
  
  
  
  console.log(this.postavke);
  
  
  
  }



  restartFilters() {
    this.postavke = [{ uq: "1", url: "assets/images/rediinger.jpg", naziv: " Apstraktni Ekspresionizam   ", tip: "Stalno", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/madonaUzelenom.jpg", naziv: " Renesansa  ", tip: "Stalno", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/gospodjaIzAvinjona.jpg", naziv: " Kubizam   ", tip: "Periodicno", eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/ramulsAndRemus.jpg", naziv: " Rimska umetnost  ", tip: "Stalno", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/devojkaIspredOgledala.jpg", naziv: " Nadrealizam", tip: "Periodicno", eksponati: "grafikaIcrtezi", brEksponata: "6", cena: 750, vreme: 100, link: "/pet" },
    { uq: "5", url: "assets/images/pogledNaDelft.jpg", naziv: " Barok ", tip: "Usputno", eksponati: "skulpture", brEksponata: "7", cena: 1000, vreme: 120, link: "/sest" }];


  }



  /* Search filter */

  searchFilter(vrednostIzInputa: string) {

    var tofilter = [{ 
    uq: "1", url: "assets/images/rediinger.jpg", naziv: " Apstraktni Ekspresionizam   ", tip: "Stalno", eksponati: "slike", brEksponata: "3", cena: 200, vreme: 30, link: "/jedan" },
    { uq: "2", url: "assets/images/madonaUzelenom.jpg", naziv: " Renesansa  ", tip: "Stalno", eksponati: "skulpture", brEksponata: "5", cena: 500, vreme: 50, link: "/dva" },
    { uq: "16", url: "assets/images/gospodjaIzAvinjona.jpg", naziv: " Kubizam   ", tip: "Periodicno", eksponati: "slike", brEksponata: "7", cena: 350, vreme: 40, link: "/tri" },
    { uq: "3", url: "assets/images/ramulsAndRemus.jpg", naziv: " Rimska umetnost  ", tip: "Stalno", eksponati: "skulpture", brEksponata: "4", cena: 450, vreme: 80, link: "/cetiri" },
    { uq: "4", url: "assets/images/devojkaIspredOgledala.jpg", naziv: " Nadrealizam", tip: "Periodicno", eksponati: "grafikaIcrtezi", brEksponata: "6", cena: 750, vreme: 100, link: "/pet" },
    { uq: "5", url: "assets/images/pogledNaDelft.jpg", naziv: " Barok ", tip: "Usputno", eksponati: "skulpture", brEksponata: "7", cena: 1000, vreme: 120, link: "/sest" }];

    var vvalue = vrednostIzInputa.trim().toLowerCase();
    this.postavke = tofilter.filter(s => ((s.naziv).trim().toLowerCase()).includes(vvalue)); 
    console.log(this.postavke);



  }




}

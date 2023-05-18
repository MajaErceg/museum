import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PlanerService } from '@app/_services/planer.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-biraj-obilazak',
  templateUrl: './biraj-obilazak.component.html',
  styleUrls: ['./biraj-obilazak.component.less']
})
export class BirajObilazakComponent implements OnInit {

  constructor( private planerService: PlanerService, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<BirajObilazakComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    nazivObilaska: any;
    id: string;
    obilasci : any;
    izabranObilazak: any;
    vrednost = true;
  
    ngOnInit(){
      this.id = this.data.prosledjenID;
      this.planerService.getObilazakTekuci(this.id)
            .pipe(first())
            .subscribe(obilasci => this.obilasci = obilasci);
    }

    onCancel(): void {
      this.dialogRef.close();
    }

    promeniVrednost(){
      this.vrednost = false;
    }

}

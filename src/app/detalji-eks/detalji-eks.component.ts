import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services';
import { PlanerService } from '@app/_services/planer.service';

@Component({
  selector: 'app-detalji-eks',
  templateUrl: './detalji-eks.component.html',
  styleUrls: ['./detalji-eks.component.less']
})
export class DetaljiEksComponent implements OnInit {

  id: any;
  eksponati = [];
  izlozbaID: any;

  constructor(private router: Router, private route: ActivatedRoute, private planerService: PlanerService, private alertService: AlertService,
    public dialogRef: MatDialogRef<DetaljiEksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.eksponati = this.data.eksponati;

    }

  ngOnInit(): void {

    this.eksponati = this.data.eksponati;

  }

}

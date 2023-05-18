import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsRoutingModule } from './us-routing.module';
import { LayoutComponent } from './layout.component';
import { LiComponent } from './li.component';
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UsRoutingModule,
        MatTabsModule
    ],
    declarations: [
        LayoutComponent,
        LiComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsModule { }
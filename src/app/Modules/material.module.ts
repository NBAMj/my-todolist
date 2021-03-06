import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({

    imports: [
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule,
        MatSidenavModule,
        MatMenuModule,
        MatDialogModule,
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule,
        MatSidenavModule,
        MatMenuModule,
        MatDialogModule,

    ]

})

export class MaterialModule { }
import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from "@angular/material/card";
import {WorkspaceModule} from "../Workspace/workspace.module";
import {ExportComponent} from "../Workspace/export/export.component";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatListModule,
        MatButtonModule,
        MatSliderModule,
        MatCardModule,
        WorkspaceModule,
    ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class ComponentsModule {

}

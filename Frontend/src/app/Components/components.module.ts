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
import {nodeModule} from "../Node/node.module";
import {MatMenuModule} from "@angular/material/menu";
import { NavbarDialogsComponent} from "./navbar-dialogs/navbar-dialogs.component";
import { SettingsPageDialogComponent } from './settings-page-dialog/settings-page-dialog.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";

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
    nodeModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatDialogModule
  ],
    declarations: [
        NavbarComponent,
        ExportComponent,
        NavbarDialogsComponent,
        SettingsPageDialogComponent,
    ],
  exports: [
    NavbarComponent,
    NavbarDialogsComponent,
  ]
})
export class ComponentsModule {

}

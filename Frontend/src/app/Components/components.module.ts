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
import {MatMenuModule} from "@angular/material/menu";
import { NavbarDialogsComponent} from "./navbar-dialogs/navbar-dialogs.component";
import { SettingsPageDialogComponent } from './settings-page-dialog/settings-page-dialog.component';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef} from "@angular/material/snack-bar";
import {ProjectDetailsUpdatedSnackbarComponent} from "./project-details-updated-snackbar/project-details-updated-snackbar.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import { RunningDialogComponent } from './running-dialog/running-dialog/running-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import {importPageModule} from "../ImportPage/importPage.module";

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
        MatMenuModule,
        FormsModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatTabsModule,
        importPageModule
    ],
    declarations: [
        NavbarComponent,
        ExportComponent,
        NavbarDialogsComponent,
        SettingsPageDialogComponent,
        ProjectDetailsUpdatedSnackbarComponent,
        RunningDialogComponent,
    ],
  exports: [
    NavbarComponent,
    ExportComponent,
    NavbarDialogsComponent,
    SettingsPageDialogComponent,
    ProjectDetailsUpdatedSnackbarComponent,
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_SNACK_BAR_DATA, useValue: {}},
    {provide: MatSnackBarRef, useValue: {}}
  ],
})
export class ComponentsModule {

}

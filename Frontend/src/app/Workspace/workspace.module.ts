import { NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {WorkspaceBoundaryComponent } from './workspace-boundary/workspace-boundary.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {DiagramModule} from "@syncfusion/ej2-angular-diagrams";
import {nodeModule} from "../Node/node.module";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {NgxsModule} from "@ngxs/store";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import { NodeElementDeleteNodeDialogComponent } from './node-element-delete-node-dialog/node-element-delete-node-dialog.component';
import {NodeElementComponent} from "./node-element/node-element.component";
//import { ImportComponent } from './import/import.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    DiagramModule,
    MatIconModule,
    nodeModule,
    MatDialogModule
  ],
    declarations: [
        WorkspaceBoundaryComponent,
        NodeElementComponent,
        NodeElementDeleteNodeDialogComponent
    ],
    exports: [
        WorkspaceBoundaryComponent,
        NodeElementComponent,
        NodeElementDeleteNodeDialogComponent
    ],
    providers: [
      {provide: MAT_DIALOG_DATA, useValue: {}},
      {provide: MatDialogRef, useValue: {}},
    ],
})
export class WorkspaceModule {

}

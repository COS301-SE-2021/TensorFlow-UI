import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
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
import {WorkspaceBoundaryComponent } from './workspace-boundary/workspace-boundary.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {CreateNodeSectionComponent } from './create-node-section/create-node-section.component';
import {MatInputModule} from "@angular/material/input";
import {FormBuilder} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {NodeElementComponent } from './node-element/node-element.component';
import { LineConnectorComponent } from './line-connector/line-connector.component';
import {DiagramModule} from "@syncfusion/ej2-angular-diagrams";
import { EditNodeComponent } from './edit-node/edit-node.component';
import {MatTableModule} from "@angular/material/table";

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
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule
  ],
  declarations: [
    WorkspaceBoundaryComponent,
    CreateNodeSectionComponent,
    NodeElementComponent,
    LineConnectorComponent,
    EditNodeComponent,
  ],
  exports: [
    WorkspaceBoundaryComponent,
    CreateNodeSectionComponent
  ]
})
export class WorkspaceModule {
    workModeName: string;
}

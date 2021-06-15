import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceComponent } from './workspace/workspace.component';
import { CreateNodeComponent } from './createNodeDiv/createNode.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {DragDropModule} from "@angular/cdk/drag-drop";

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
    MatCardModule,
    DragDropModule,
  ],
  declarations: [
    WorkspaceComponent,
    CreateNodeComponent
  ],
  exports: [
    WorkspaceComponent,
    CreateNodeComponent
  ],
  entryComponents: [CreateNodeComponent]
})
export class WorkspaceParentModule {
  constructor() {
  }
}

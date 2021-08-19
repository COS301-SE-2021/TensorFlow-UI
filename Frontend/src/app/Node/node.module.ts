import {NgModule} from "@angular/core";
import {Node} from "./node.component";
import {TensorComponent} from "./tensor/tensor.component";
import {InputComponent} from "./tensor/input/input.component";
import {DialogComponent} from "./tensor/input/dialog/dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import { OperatorComponent } from './operator/operator.component';
import {MatSelectModule} from "@angular/material/select";
import { RootnodeComponent } from './rootnode/rootnode.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
	declarations: [
		TensorComponent,
		InputComponent,
		DialogComponent,
		Node,
		OperatorComponent,
  		RootnodeComponent
	],
	imports: [
		FormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatButtonModule,
		CommonModule,
		MatListModule,
		MatInputModule,
		MatCardModule,
		MatTableModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatIconModule,
	],
	exports: [
		TensorComponent,
		InputComponent,
		DialogComponent,
		Node,
		OperatorComponent,
		RootnodeComponent
	],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
  ]
})

export class nodeModule {

}

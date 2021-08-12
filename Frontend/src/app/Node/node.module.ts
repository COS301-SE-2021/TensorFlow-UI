import {NgModule} from "@angular/core";
import {Node} from "./node.component";
import {TensorComponent} from "./tensor/tensor.component";
import {InputComponent} from "./tensor/input/input.component";
import {DialogComponent} from "./tensor/input/dialog/dialog.component";
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";


@NgModule({
	declarations: [
		TensorComponent,
		InputComponent,
		DialogComponent,
		Node
	],
	imports: [
		FormsModule,
		MatDialogModule,
		MatFormFieldModule,
		MatButtonModule,
		CommonModule,
		MatListModule
	],
	exports: [
		TensorComponent,
		InputComponent,
		DialogComponent,
		Node
	]
})

export class nodeModule {

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ImportComponent} from "./Workspace/import/import.component";

const routes: Routes = [
  {path: 'Import', component: ImportComponent}
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

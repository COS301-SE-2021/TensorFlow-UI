import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {WorkspaceModule} from "./Workspace/workspace.module";
import {MatCardModule} from '@angular/material/card';

//ngxs storage
import {NgxsModule} from '@ngxs/store';
import {WorkspaceState} from "../Storage/workspace";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {ComponentsModule} from "./Components/components.module";
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { ImportPageComponent } from './ImportPage/importPageRoute/importPage.component';
import {importPageModule} from "./ImportPage/importPage.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const modules = [
	BrowserModule, BrowserAnimationsModule, DragDropModule,
	 WorkspaceModule, MatCardModule, MatDialogModule
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    modules,
    NgxsStoragePluginModule.forRoot(),
    NgxsModule.forRoot([
      WorkspaceState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ComponentsModule,
    AppRoutingModule,
    importPageModule,
    NgbModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    {provide: MAT_SNACK_BAR_DATA, useValue: {}},
    {provide: MatSnackBarRef, useValue: {}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}

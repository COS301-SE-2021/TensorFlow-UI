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
import { TutorialModalComponent } from './Tutorial/tutorial-modal/tutorial-modal.component';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { ImportPageComponent } from './ImportPage/importPage.component';
import { TutorialModalMaterialComponent } from './Tutorial/tutorial-modal-material/tutorial-modal-material/tutorial-modal-material.component';
import { JsonUploadBoxComponent } from './json-upload/json-upload-box/json-upload-box.component';

const modules = [
	BrowserModule, BrowserAnimationsModule, DragDropModule,
	 WorkspaceModule, MatCardModule, MatDialogModule
]

@NgModule({
  declarations: [
    AppComponent,
    TutorialModalComponent,
    ImportPageComponent,
    TutorialModalMaterialComponent,
    JsonUploadBoxComponent
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
    // AppRoutingModule
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

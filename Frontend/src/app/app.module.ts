import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppComponent } from './app.component';
import {ServiceWorkerModule } from '@angular/service-worker';
import {environment } from '../environments/environment';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ComponentsModule} from "./components/components.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {WorkspaceModule} from "./Workspace/workspace.module";
import {MatCardModule} from '@angular/material/card';
import { Node } from './Node/node.component';

//ngxs storage
import { NgxsModule } from '@ngxs/store';
import {WorkspaceState, WorkspaceStateModel} from "../Storage/workspace/workspace.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import {NgSelectOption} from "@angular/forms";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";

const modules = [
  BrowserModule, BrowserAnimationsModule, ComponentsModule, DragDropModule, ComponentsModule, ComponentsModule,
  ComponentsModule, WorkspaceModule, MatCardModule,
]

@NgModule({
  declarations: [
    AppComponent,
    Node
  ],
  imports: [
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    modules,
    NgxsModule.forRoot([
      WorkspaceState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsStoragePluginModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}

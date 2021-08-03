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
import {createCustomElement} from "@angular/elements";
import {NodeElementComponent} from "./Workspace/node-element/node-element.component";


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
    modules
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    NodeElementComponent
  ],
  entryComponents: [NodeElementComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const appNodeElement = createCustomElement(NodeElementComponent, {injector});
    customElements.define('app-node-element', appNodeElement);
  }
  ngDoBootstrap() {}
    gun(){

    }
}

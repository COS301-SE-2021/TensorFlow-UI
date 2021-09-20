import {NgModule} from "@angular/core";
import {ImportPageComponent} from "./importPageRoute/importPage.component";
import {ImportPageContentComponent} from "./importPageContent/import-page-content.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {ProjectListComponent} from "./project-list/project-list.component";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        ImportPageComponent,
        ImportPageContentComponent,
        ProjectListComponent
    ],
    imports: [
        MatTabsModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        CommonModule
    ],
    exports: [
        ImportPageComponent,
        ImportPageContentComponent
    ]
})

export class importPageModule{

}

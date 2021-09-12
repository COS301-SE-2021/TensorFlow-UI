import {NgModule} from "@angular/core";
import {ImportPageComponent} from "./importPageRoute/importPage.component";
import {ImportPageContentComponent} from "./importPageContent/import-page-content.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        ImportPageComponent,
        ImportPageContentComponent
    ],
    imports: [
        MatTabsModule,
        MatCardModule,
        MatListModule,
        MatButtonModule
    ],
    exports: [
        ImportPageComponent,
        ImportPageContentComponent
    ]
})

export class importPageModule{

}
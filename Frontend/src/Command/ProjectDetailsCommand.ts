import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {SettingsPageDialogComponent} from "../app/Components/settings-page-dialog/settings-page-dialog.component";
import {AddProjectDescription, AddProjectName} from "../Storage/workspace";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {ProjectDetailsUpdatedSnackbarComponent} from "../app/Components/project-details-updated-snackbar/project-details-updated-snackbar.component";

export class ProjectDetailsCommand extends Command{
  nav: NavbarComponent;

  constructor(store: Store, navbar: NavbarComponent) {
    super(store);
    this.nav = navbar;
  }

  execute(){
    const projectDetailsDialog = this.nav.dialog.open(SettingsPageDialogComponent,
      {
        disableClose: true,
        data: {projectName: this.nav.projectName, projectDetails: this.nav.projectDetails}
      }
    );

    projectDetailsDialog.afterClosed().subscribe(result => {
      const detailsAdded = projectDetailsDialog.disableClose;

      if (detailsAdded) {
        //Add to details to ngxs storage and display snackbar
        const dialogData = projectDetailsDialog.componentInstance;
        let dataOK: boolean = false;
        if ((dialogData.projectName != undefined && dialogData.projectName!="" && dialogData.projectName.match(/^ *$/) == null) && dialogData.projectDescription != undefined) {
          dataOK = true;
          this.store.dispatch(new AddProjectName(dialogData.projectName));
          this.store.dispatch(new AddProjectDescription(dialogData.projectDescription));
        }
        console.log("|"+dialogData.projectName+"|");
        console.log(dialogData.projectDescription);
        this.projectDetailsUpdatedSnackbar(dataOK);
      }
    })
  }

  projectDetailsUpdatedSnackbar(dataOk: boolean) {
    let snackBarRef = this.nav.snackBar.openFromComponent(ProjectDetailsUpdatedSnackbarComponent,
      {
        duration: 2000,
        data: dataOk
      })
  }

  undo() {
  }
}

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
  }

  undo() {
  }
}

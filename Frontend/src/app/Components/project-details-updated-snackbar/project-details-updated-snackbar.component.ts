import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";

@Component({
  selector: 'app-project-details-updated-snackbar',
  templateUrl: './project-details-updated-snackbar.component.html',
  styleUrls: ['./project-details-updated-snackbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectDetailsUpdatedSnackbarComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: boolean) {

  }

}

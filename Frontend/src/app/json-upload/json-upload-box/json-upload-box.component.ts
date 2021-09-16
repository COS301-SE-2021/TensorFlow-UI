import {Component, OnInit, ViewChild} from '@angular/core';
import {JsonDataImporterService} from "../../json-data-importer.service";

@Component({
  selector: 'app-json-upload-box',
  templateUrl: './json-upload-box.component.html',
  styleUrls: ['./json-upload-box.component.css']
})
export class JsonUploadBoxComponent implements OnInit {
  private jsonService : JsonDataImporterService;
  private uploaded : boolean;
  @ViewChild("jsonUpload") input;

  constructor() {
    this.uploaded = false;
  }

  ngOnInit(): void {
  }

  upload() {
    this.input.onchange = () => {
      const selected = this.input.files[0];
      this.jsonService = new JsonDataImporterService();
      this.jsonService.setJSON(selected.toString());
      this.uploaded = true;
    }
  }

  getLabels() {
    if (this.uploaded) {
      return this.jsonService.getLabels();
    }
  }

  getFeatures() {
    if (this.uploaded) {
      return this.jsonService.getFeatures();
    }
  }
}

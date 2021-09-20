import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonDataImporterService {

  features;
  labels;
  json : string;

  constructor() {
  }

  setJSON(json : string) {
    this.json = json;
  }

  parse(json) {
    const jsonData = JSON.parse(json);
    this.features = jsonData.features;
    this.labels = jsonData.labels;
  }

  getFeatures() {
    return this.features;
  }

  getLabels() {
    return this.labels;
  }
}

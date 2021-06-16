import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private createNodeSource = new BehaviorSubject(false); //default = false
  currentBoolean = this.createNodeSource.asObservable();

  constructor() { }

  changeCreateNodeBoolean(createNodeSection: boolean) {
    this.createNodeSource.next(createNodeSection)
  }
}

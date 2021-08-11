import { Component, OnInit } from '@angular/core';
import {GetList} from '../../GITApi.js'

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showhide(){
    var el = document.getElementById('hidden1');
    if (el != null){
      if ( el.style.display == 'none'){
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }

  }

  ImportFromPC(){

  }

  ImportFromLib(){

  }
}

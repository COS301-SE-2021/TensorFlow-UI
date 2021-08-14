import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GetData, GetList} from '../../GITApi.js'

let tensorList: string[] = [""];
export default tensorList;


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  public tensorL: string[] = [""];

  constructor() { }

  ngOnInit(): void {
  }

  showhide(){
    this.libSelection.nativeElement.value = "";
    GetList();
    this.tensorL = tensorList;
    var el = document.getElementById('hidden1');
    if (el != null){
      if ( el.style.display == 'none'){
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }
  }

  ImportFromPC() {
    var x = document.getElementById("myfile") as HTMLInputElement;
    var txt = "";
    if (x != null){
      if ('files' in x) {
        // @ts-ignore
        if (x.files.length == 0) {
          txt = "Select one or more files.";
        } else {

          txt += "<br><strong>" + (1) + ". file</strong><br>";
          // @ts-ignore
          var file = x.files[0];
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            txt += "size: " + file.size + " bytes <br> <br>";
          }

          var fr = new FileReader();
          fr.onload = function () {
            console.log(fr.result);
          }
          // @ts-ignore
          fr.readAsText(x.files[0]);
        }
      }
      console.log(txt);
    }
  }

  @ViewChild('libSelection') libSelection: ElementRef;

  ImportFromLib() {
    if (this.libSelection.nativeElement.value == ""){
      alert("Please select a project to import and try again.");
    } else{
      GetData(this.libSelection.nativeElement.value);
      this.libSelection.nativeElement.value = "";
    }
  }
}

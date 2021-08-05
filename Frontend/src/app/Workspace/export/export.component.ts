import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

  export(){
    var data = {
      name: "cliff",
      age: "34",
      name1: "ted",
      age1: "42",
      name2: "bob",
      age2: "12"
    }
    var jsonData = JSON.stringify(data);

    this.download(jsonData, 'json.json', 'text/plain');
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

}

import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrls: ['./csv-import.component.css']
})
export class CsvImportComponent implements OnInit {
  csvRecords: any[] = [];
  header = false;


  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  ngOnInit(): void {
  }

  saveCSV(): void {
    // Select the files from the event
    const files = document.getElementById("csv-file")

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], {header: this.header, delimiter: ','})
      .pipe().subscribe((result: Array<any>) => {

      console.log('Result', result);
      this.csvRecords = result;
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });
  }

  readCSV(files) : 
}

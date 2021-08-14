import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class CsvImportComponent {
  csvRecords: Array<any> | NgxCSVParserError= [];
  header = false;

  constructor(private ngxCsvParser: NgxCsvParser) {
  }

  @ViewChild('fileImportInput', { static: false }) fileImportInput: any;

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result) => {

      console.log('Result', result);
      this.csvRecords = result;
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }

  importcsv(files: any): void {

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result) => {

      console.log('Result', result);
      this.csvRecords = result;
      return result;
    }, (error: NgxCSVParserError) => {
      console.log('Error', error);
    });

  }
}

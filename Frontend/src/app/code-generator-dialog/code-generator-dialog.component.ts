import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-code-generator-dialog',
  templateUrl: './code-generator-dialog.component.html',
  styleUrls: ['./code-generator-dialog.component.css']
})
export class CodeGeneratorDialogComponent implements OnInit {

  public codeLines:string[] =[];
  public downloadCode:boolean=false;
  constructor(public dialogRef: MatDialogRef<CodeGeneratorDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: {code: string}) { }

  ngOnInit(): void {
    console.log(this.data.code);

  }

  downloadCodeFunc(){
    this.downloadCode = true;
    this.dialogRef.close(this.downloadCode);
  }

  cancelDownloadFunc(){
    this.downloadCode = false;
    this.dialogRef.close(this.downloadCode);
  }

}

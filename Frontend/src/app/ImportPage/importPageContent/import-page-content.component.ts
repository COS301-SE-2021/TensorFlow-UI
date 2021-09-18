import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngxs/store";
import {GitAPI} from "../../git-api";

let projectList: string[] = [];
export default projectList;

@Component({
  selector: 'app-import-page-content',
  templateUrl: './import-page-content.component.html',
  styleUrls: ['./import-page-content.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ImportPageContentComponent implements OnInit {
    @Input() navbar;
    public projectL: string[] = [""];
  public gitAPI: GitAPI;
  public screenWidth = screen.width;
  public screenHeight = screen.height;
  constructor(private store: Store) { }

  ngOnInit(): void {
      let that = this;
      document.addEventListener("populateList", function(){that.projectL = projectList;});
    this.gitAPI = new GitAPI(this.store);
    this.gitAPI.GetList();
  }


    ImportFromPC() {
        let previewTabs = document.getElementById("previewTab") as HTMLElement;
        if(previewTabs){
            previewTabs.click();
        }
        var x = document.getElementById("myfile") as HTMLInputElement;
        var txt = "";
        if (x != null){
            if ('files' in x) {
                // @ts-ignore
                if (x.files.length == 0) {
                    alert("Select one or more files.");
                } else {
                    // @ts-ignore
                    var file = x.files[0];
                    if (file.type !="application/json"){
                        alert("Please upload a file of type application/json");
                    } else {
                        if ('name' in file) {
                            txt += "name: " + file.name + "\n";
                        }
                        if ('size' in file) {
                            txt += "size: " + file.size + " bytes";
                        }
                        var fr = new FileReader();
                        let that = this;
                        fr.onload = function () {
                            let response = fr.result;
                            //that.API.dataToStore(response);
                            //do a command for this .... same for project list items
                        }
                        //clear file select input
                        // @ts-ignore
                        //x.files[0] = "";
                        fr.readAsText(file);
                    }
                }
            }
        }
    }

    filter() {
        let el = document.getElementById("search") as HTMLInputElement;
        if (el){
            let val = el.value;
            let cards = document.getElementsByClassName("projectsListCard1");
            if (cards){
                for (let i = 0; i < cards.length; i++) {
                    let cardEl = cards.item(i) as HTMLElement;
                    if (cardEl){
                        if(cardEl.id.toLowerCase().includes(val.toLowerCase())){
                            cardEl.style.display = "block";
                        } else {
                            cardEl.style.display = "none";
                        }
                    }
                }
            }
        }
    }

    clearSearch() {
        let el = document.getElementById("search") as HTMLInputElement;
        if (el){
            el.value="";
            let cards = document.getElementsByClassName("projectsListCard1");
            if (cards){
                for (let i = 0; i < cards.length; i++) {
                    let cardEl = cards.item(i) as HTMLElement;
                    if (cardEl){
                        cardEl.style.display = "block";
                    }
                }
            }
        }
    }
}

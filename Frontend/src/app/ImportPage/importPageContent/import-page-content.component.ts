import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
    public projectL: string[] = [""];
  public gitAPI: GitAPI;
  public screenWidth = screen.width;
  public screenHeight = screen.height;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.gitAPI = new GitAPI(this.store);


    this.gitAPI.GetList();
    this.projectL = projectList;
    console.log(this.gitAPI);
    console.log(projectList);
  }


    ImportFromPC() {

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

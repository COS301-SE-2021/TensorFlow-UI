import { Component, OnInit } from '@angular/core';
import projectList from "../../ImportPage/importPageContent/import-page-content.component";
import {WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import {GitAPI} from "../../git-api";
import {getAuth, GithubAuthProvider, signInWithPopup,signInWithRedirect,getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import firebase from "firebase/compat";
import { initializeApp } from 'firebase/app';


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  constructor(public store: Store) { }
  public API: GitAPI= GitAPI.getInstance(this.store);

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyBF2lt6sONKGJc8_85zsFblj8ai-sFJzlo",
      authDomain: "tensorflow-ui.firebaseapp.com",
      projectId: "tensorflow-ui",
      storageBucket: "tensorflow-ui.appspot.com",
      messagingSenderId: "833213574395",
      appId: "1:833213574395:web:c6f3f13d52ba7a04f5d45e",
      measurementId: "G-3BB86VS71H"
    };
    const app = initializeApp(firebaseConfig);
  }

  showhide(){
    this.API.GetList();
  }

  exportToPc(): boolean{
    var exportAs = this.store.selectSnapshot(WorkspaceState).projectName;
    if (exportAs == null || exportAs == ""){
      alert("Please name your Project and try again.\n Name project by clicking on the gear shaped button.");
      return false;
    } else {
      //const procDescription = this.store.selectSnapshot(WorkspaceState).projectDescription;
      var description = this.store.selectSnapshot(WorkspaceState).projectDescription;
      var file = this.createDoc(description, exportAs);
      this.download(file, exportAs+'.json');
    }
    return true;
  }

  download(file, fileName){

    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();

  }

  gitLogin(){
    const provider = new GithubAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GithubAuthProvider.credentialFromResult(result);
        if (credential!=null){
          const token = credential.accessToken;
          const user = result.user;
          this.exportToLib(user, token);
        }
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.warn(error);
    });
  }

  exportToLib(user, token): boolean {
    this.API.GetList();
    var exportAs = this.store.selectSnapshot(WorkspaceState).projectName;
    if (exportAs == null || exportAs == ""){
      alert("Please name your Project and try again.\n Name project by clicking on the gear shaped button.");
      return false;
    } else {
      var exists = false;
      var keep = exportAs + ".json";
      for (let i = 0; i < projectList.length; i++) {
        if (keep == projectList[i]){
          exists = true;
        }
      }
      if (exists){
        alert('Export failed:\nA file with the same name already exists in the library.');
        return false;
      } else {
        var description = this.store.selectSnapshot(WorkspaceState).projectDescription;
        var file = this.createDoc(description, exportAs);
        var reader = new FileReader();
        var base64dta;
        reader.readAsDataURL(file);
        let that = this;
        reader.onloadend = function (){
          base64dta = reader.result;
          base64dta = base64dta.substr(29);
          that.API.commit(user, token, exportAs, base64dta, description);
        }
      }
    }
    return true;
  }

  createDoc(description, projectName){
    //Export Functionality: Export retrieves data from storage here.
    const storageNodes = this.store.selectSnapshot(WorkspaceState).TFNode;
    const storageLinks = this.store.selectSnapshot(WorkspaceState).links;
    let doc = {};
    doc['title'] = projectName;
    doc['description'] = description;
    doc['TFNode'] = storageNodes;
    doc['links'] = storageLinks;
    let jsonDta = JSON.stringify(doc);
    var file = new Blob([jsonDta], {type: 'application/json'});
    return file;
  }
}

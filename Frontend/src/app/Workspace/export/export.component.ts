import { Component, OnInit } from '@angular/core';
import projectList from "../import/import.component";
import {WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import {GitAPI} from "../../git-api";
import {getAuth, GithubAuthProvider, signInWithPopup,signInWithRedirect,getRedirectResult, GoogleAuthProvider} from "firebase/auth";
import firebase from "firebase/compat";
import { initializeApp } from 'firebase/app';
import {userGithubData} from "../../userGithubData";


@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  constructor(public store: Store) { }
  public API: GitAPI= new GitAPI(this.store);

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
      var file = this.createDoc(description);
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

  async exportToLib(): Promise<boolean> {

    const loginResult = await this.loginWithGitHub();

    return false;
  }

  async loginWithGitHub(): Promise<boolean>{
    const provider = new GithubAuthProvider();
    const auth = getAuth();

    console.log(userGithubData.userLoggedIn);
    if(!userGithubData.userLoggedIn){
      signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            console.log(result);
            // const credential = GithubAuthProvider.credentialFromResult(result);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (credential!=null){
              const token = credential.accessToken;
              //console.log(token);
            }
            // The signed-in user info.
            const user = result.user;
            userGithubData.UserId = user.providerData[0].uid;
            if(user.photoURL)
              userGithubData.GithubImage = user.photoURL;
            if(user.email)
              userGithubData.EmailAddress = user.email;
            if(user.displayName)
              userGithubData.UserName = user.displayName;

            userGithubData.userLoggedIn = true;

            console.log(user);

            this.commitProjectToGithub();

            return true;
          }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
        return false;
      });
    }
    else{
      console.log("No need to login");
      this.commitProjectToGithub();
      return true;
    }
    return false;
  }

  commitProjectToGithub(){
    const storageProject = this.store.selectSnapshot(WorkspaceState).project;
    this.API.GetList();

    console.log("TIME TO STORE PROJECT");

    var exportProjectAs = this.store.selectSnapshot(WorkspaceState).projectName;
    if (exportProjectAs == null || exportProjectAs == ""){
      //TODO - Throw Error
      alert("Please name your Project and try again.\n Name project by clicking on the gear shaped icon next to the logo.");

    } else {

      let fileName = exportProjectAs+"_"+userGithubData.UserId;

      var fileExistsInLibrary = false;

      var projectCommunityLibraryName = fileName + ".json";

      //returns undefined if no such file exists
      let index = projectList.find(element => element == projectCommunityLibraryName)
      if(index!==undefined){
        fileExistsInLibrary = true;
        //TODO - Throw error
        alert('Export failed:\nA file with the same name already exists in the library.');
        // return false;
      }
      else{

        let description = this.store.selectSnapshot(WorkspaceState).projectDescription;
        if(description==""||null){
          description = "No Project Description";
        }
        var file = this.createDoc(description);
        var reader = new FileReader();
        var base64dta ;
        reader.readAsDataURL(file);
        let that = this;
        // reader.onloadend = function (){
        //     base64dta = reader.result;
        //     base64dta = base64dta.substr(29);
        //     that.API.commit(fileName, base64dta, description);
        //   }
      }
    }
  }

  getUserGithubUserName(userId: string){

  }

  createDoc(description){
    //Export Functionality: Export retrieves data from storage here.
    const storageNodes = this.store.selectSnapshot(WorkspaceState).TFNode;
    const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
    let doc = {};
    doc['description'] = description;
    doc['TFNode'] = storageNodes;
    doc['lines'] = storageLines;
    let jsonDta = JSON.stringify(doc);
    var file = new Blob([jsonDta], {type: 'application/json'});
    return file;
  }
}

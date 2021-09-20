import {Inject, Injectable} from '@angular/core';
import {TFModel} from "../tf/model/creation/model";
import {TFTensor} from "../tf/tensor/tensor";
import {TFNode} from "../tf";
import {TFKerasLayerDense} from "../tf/layer/layer_dense";
import {AddNodeCommand} from "../../Command/AddNodeCommand";
import {Store} from "@ngxs/store";
import {TFDense} from "../tf/layers/basic/dense";
import {CodeGeneratorService} from "../code-generator.service";
import {lineConnectors} from "../node-data";
import {TutorialModalMaterialComponent} from "./tutorial-modal-material/tutorial-modal-material/tutorial-modal-material.component";
import {MatDialog, MatDialogRef, MatDialogModule, MatDialogConfig} from "@angular/material/dialog";
import {NavbarComponent} from "../Components/navbar/navbar.component";
import {ReloadFromStoreCommand} from "../../Command/ReloadFromStoreCommand";
import {TFSequential} from "../tf/model/creation";

@Injectable({
  providedIn: 'root'
})

export class TutorialServiceService {
  private tutorialDialogMat: TutorialModalMaterialComponent;
  currentStep : number;
  head : TFNode;
  lines : lineConnectors[];
  nodes : TFNode[];
  store : Store;
  url : string;
  addCommand : AddNodeCommand;
  restoreCommand : ReloadFromStoreCommand;
  navbar : NavbarComponent;
  features;
  labels;

  constructor(
    navbar : NavbarComponent,
    store : Store,
    private dialog: MatDialog) {
    this.store = store;
    this.addCommand = new AddNodeCommand(this.store, navbar);
    this.restoreCommand = new ReloadFromStoreCommand(this.store, navbar);
    this.navbar = navbar;
  }


  openDialog(text : string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = text;
    const dialogRef = this.dialog.open(TutorialModalMaterialComponent, dialogConfig);
      let div = document.getElementsByClassName("mat-dialog-container").item(0) as HTMLElement;
      if(div != null) {
          div.style.position = "absolute";
          div.style.bottom = "5px";
          div.style.left = "75px";
          div.style.width = "auto";
          div.style.height = "auto";
      }
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentStep = this.currentStep + 1;
      if(dialogRef.disableClose) this.nextStep();
    });
  }

  nextStep() {
    console.log("Current tutorial step: " + this.currentStep)
    switch (this.currentStep) {
      case 1:
        this.step1()
        break;
      case 2:
        this.step2()
        break;
      case 3:
        this.step3()
        break;
      case 4:
        this.step4()
        break;
      case 5:
        this.step5()
        break;
      case 6:
        this.step6();
        break;
      case 7:
        this.step7()
        break;
      default:
        break;
    }
  }

  step1() {
    this.openDialog(
      "Welcome to TensorFlow UI! We hope you enjoy using our program.\n\n" +
      "This tutorial is designed to walk you through the creation and training of a basic prediction model, predicting" +
      " the effect different marketing budgets will spend on the number of subscribers gained."
    );
  }

  step2() {
    this.openDialog(
      "First, we have to create our data points! " +
      "In this case, we'll have an array of numbers representing subscribers gained, and a second array indicating the" +
      " marketing budget which created the corresponding gain."
    );

  }

  step3() {
    this.openDialog(
      "We will specifically need to create a training and a testing set - the two will exist as" +
      " two separate arrays."
    );
      // arrays made for temporary use and reference:
      var featuresTrain : number[] = new Array();
      var labelsTrain : number[] = new Array();
      var featuresTest : number[] = new Array();
      var labelsTest : number[] = new Array();

      featuresTrain.push(60,100,50,90);
      labelsTrain.push(160, 240, 140, 220);
      featuresTest.push(80,30,20,10);
      labelsTest.push(200, 100, 80, 60);

      this.features = featuresTrain;
      this.labels = labelsTrain;

      let el: HTMLElement;
      setTimeout(function(){
          el = document.getElementById("createNode") as HTMLElement;
          if(el != null){
              el.click();
          }
      },1000)

      setTimeout(function(){
          el = document.getElementById("tensorNodes") as HTMLElement;
          if(el != null){
              el.click();
          }
      },2500)

      setTimeout(function(){
          el = document.getElementById("creation") as HTMLElement;
          if(el != null){
              el.click();
          }
      },4000)

      let that = this;
      setTimeout(function(){
          el = document.getElementById("TensorOneD") as HTMLElement;
          let color = el.style.backgroundColor;
          el.style.backgroundColor = "#666666"
          setTimeout(function(){el.style.backgroundColor = color},10000)


          that.addCommand.setComponent("Constant");
          that.addCommand.execute();
          let tensorFTrain = that.addCommand.getNode();
          tensorFTrain.data = featuresTrain;
          tensorFTrain.type = "int32";
          tensorFTrain.position = [600, 200];
          tensorFTrain.pushToArray(tensorFTrain.widgets, {type: "dtype?", value: "int32"});
          tensorFTrain.pushToArray(tensorFTrain.widgets, {type: "name", value: "feature-training"});
          tensorFTrain.pushToArray(tensorFTrain.widgets, {type: "value", value: featuresTrain.toString() });
          let c = that.navbar.graph.getNodeById(tensorFTrain.id);
          if (c != undefined) tensorFTrain.UIStructure(c, that.navbar);
          console.log("1. Tensor created: " + tensorFTrain.data);


          that.addCommand.setComponent("Constant");
          that.addCommand.execute();
          let tensorFTest = that.addCommand.getNode();
          tensorFTest.data = featuresTest;
          tensorFTest.type = "int32";
          tensorFTest.position = [600, 400];
          tensorFTest.pushToArray(tensorFTest.widgets, {type: "dtype?", value: "int32"});
          tensorFTest.pushToArray(tensorFTest.widgets, {type: "name", value: "feature-testing"});
          tensorFTest.pushToArray(tensorFTest.widgets, {type: "value", value: featuresTest.toString() });
          let d = that.navbar.graph.getNodeById(tensorFTest.id);
          if (d != undefined) tensorFTest.UIStructure(d, that.navbar);
          console.log("2. Tensor created: " + tensorFTest.data);

          that.addCommand.getLiteGraphNode().connect(1, that.navbar.LGroot, 1);

          that.addCommand.setComponent("Constant");
          that.addCommand.execute();
          let tensorLTrain = that.addCommand.getNode();
          tensorLTrain.data = labelsTrain;
          tensorLTrain.type = "int32";
          tensorLTrain.position = [800, 200];
          tensorLTrain.pushToArray(tensorLTrain.widgets, {type: "dtype?", value: "int32"});
          tensorLTrain.pushToArray(tensorLTrain.widgets, {type: "position", value: "[800, 200]"});
          tensorLTrain.pushToArray(tensorLTrain.widgets, {type: "name", value: "label-training"});
          tensorLTrain.pushToArray(tensorLTrain.widgets, {type: "value", value: labelsTrain.toString() });
          let e = that.navbar.graph.getNodeById(tensorLTrain.id);
          if (e != undefined) tensorLTrain.UIStructure(e, that.navbar);
          console.log("3. Tensor created: " + tensorLTrain.data);

          that.addCommand.setComponent("Constant");
          that.addCommand.execute();
          let tensorLTest = that.addCommand.getNode();
          tensorLTest.data = labelsTest;
          tensorLTest.type = "int32";
          tensorLTest.position = [800, 400]
          tensorLTest.pushToArray(tensorLTest.widgets, {type: "dtype?", value: "int32"});
          tensorLTest.pushToArray(tensorLTest.widgets, {type: "name", value: "label-testing"});
          tensorLTest.pushToArray(tensorLTest.widgets, {type: "value", value: labelsTest.toString() });
          let f = that.navbar.graph.getNodeById(tensorLTest.id);
          if (f != undefined) tensorLTest.UIStructure(f, that.navbar);
          console.log("4. Tensor created: " + tensorLTest.data);

      },5000)

  }

  step4() {
    this.openDialog(
      "Now for the real machine learning work!\n" +
      "We're going to use the simplest model we can, for our simple use-case: " +
      "a Dense network, with only one layer and only one neuron. More complex problems will require more layers and neurons."
    );

    //var kerasLayer = new TFDense(1, "");

      let el: HTMLElement;
      setTimeout(function(){
          el = document.getElementById("createNode") as HTMLElement;
          if(el != null){
              el.click();
          }
      },1000)


      setTimeout(function(){
          el = document.getElementById("layerNodes") as HTMLElement;
          if(el != null){
              el.click();
          }
      },2500)

      setTimeout(function(){
          el = document.getElementById("basic") as HTMLElement;
          if(el != null){
              el.click();
          }
      },4000)

      let that = this;
      let kerasLayer;
      let denseLayer;
      setTimeout(function(){
          el = document.getElementById("dense") as HTMLElement;
          let color = el.style.backgroundColor;
          el.style.backgroundColor = "#666666"
          setTimeout(function(){el.style.backgroundColor = color},10000)

          kerasLayer = new TFDense(1, "");

          that.addCommand.setComponent("dense");
          that.addCommand.execute();
          denseLayer = that.addCommand.getNode();
          denseLayer.position = [600, 550];


      },5000)

      setTimeout(function(){
          el = document.getElementById("createNode") as HTMLElement;
          if(el != null){
              el.click();
              el.click();
          }
      },7000)

      setTimeout(function(){
          el = document.getElementById("modelNodes") as HTMLElement;
          if(el != null){
              el.click();
          }
      },8000)

      setTimeout(function(){
          el = document.getElementById("creationModel") as HTMLElement;
          if(el != null){
              el.click();
          }
      },9500)

      setTimeout(function(){
          el = document.getElementById("dense") as HTMLElement;
          let color = el.style.backgroundColor;
          el.style.backgroundColor = "#666666"
          setTimeout(function(){el.style.backgroundColor = color},10000)

          that.addCommand.setComponent("Model");
          that.addCommand.execute();
          let model = that.addCommand.getNode();
          model.position = [50, 500];
      },11000)

    var tfModel : TFModel= new TFSequential("basicModel", denseLayer);

    this.addCommand.setComponent("Sequential");
    this.addCommand.execute();
    let model = <TFSequential>this.addCommand.getNode();
    model.setLayer(denseLayer);
    model.setDataset(this.features, this.labels);
    model.position = [50, 500];
  }

  step5() {
    this.openDialog(
      "We now have to compile the model, with loss (i.e. accuracy) and optimizer" +
      " (i.e. improvement) functions." +
      "These can be set in the node itself."
    );
  }

  step6() {
    this.openDialog("Model training is done automatically when you run the code.");
  }

  step7() {
    this.openDialog("And now for some predictions - the useful part of the model we've built.");
    const codegen : CodeGeneratorService = new CodeGeneratorService(this.store);
    codegen.generateFile(this.head, this.nodes, this.lines);
    codegen.runFile(this.head, this.nodes, this.lines, this.url);
  }

  runTutorial(store : Store, head : TFNode, nodes : TFNode[], lines : lineConnectors[], url : string) {
    this.head = head;
    this.nodes = nodes;
    this.lines = lines;
    this.store = store;
    this.url = url;
    this.currentStep = 1;
    this.nextStep();
  }
}

import {Inject, Injectable} from '@angular/core';
import {TFModel} from "../tf/model/creation/model";
import {TFTensor} from "../tf/tensor/tensor";
import {TFNode, TFTensorOneD} from "../tf";
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
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentStep = this.currentStep + 1;
      this.nextStep();
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
    // arrays made for temporary use and reference:
    var featuresTrain : number[] = new Array();
    var labelsTrain : number[] = new Array();
    var featuresTest : number[] = new Array();
    var labelsTest : number[] = new Array();

    featuresTrain.push(60,100,50,90);
    labelsTrain.push(160, 240, 140, 220);
    featuresTest.push(80,30,20,10);
    labelsTest.push(200, 100, 80, 60);

    this.addCommand.setComponent("TensorOneD");
    this.addCommand.execute();
    let tensorFTrain = this.addCommand.getNode();
    tensorFTrain.data = featuresTrain;
    tensorFTrain.type = "int32";
    tensorFTrain.position = [200, 200];
    tensorFTrain.changeWidgetValue(featuresTrain.toString(), "int32", this.navbar, this.addCommand.getLiteGraphNode());
    console.log("1. Tensor created: " + tensorFTrain.data);

    this.addCommand.setComponent("TensorOneD");
    this.addCommand.execute();
    let tensorFTest = this.addCommand.getNode();
    tensorFTest.data = featuresTest;
    tensorFTrain.type = "int32";
    tensorFTest.position = [200, 400];
    console.log("2. Tensor created: " + tensorFTest.data);

    this.addCommand.setComponent("TensorOneD");
    this.addCommand.execute();
    let tensorLTrain = this.addCommand.getNode();
    tensorLTrain.data = labelsTrain;
    tensorFTrain.type = "int32";
    tensorLTrain.position = [400, 200];
    console.log("3. Tensor created: " + tensorLTrain.data);

    this.addCommand.setComponent("TensorOneD");
    this.addCommand.execute();
    let tensorLTest = this.addCommand.getNode();
    tensorLTest.data = labelsTest;
    tensorFTrain.type = "int32";
    tensorLTrain.position = [400, 400]
    console.log("4. Tensor created: " + tensorLTest.data);
  }

  step3() {
    this.openDialog(
      "We'll specifically need to create a training and a testing set - the two will exist as" +
      " two separate arrays."
    );
  }

  step4() {
    this.openDialog(
      "Now for the real machine learning work!\n" +
      "We're going to use the simplest model we can, for our simple use-case: " +
      "a Dense network, with only one layer and only one neuron. More complex problems will require more layers and neurons."
    );
    //TODO: create layer node using command
    var kerasLayer = new TFDense(1, "");

    this.addCommand.setComponent("dense");
    this.addCommand.execute();
    let denseLayer = this.addCommand.getNode();
    denseLayer.position = [600, 550];

    // TODO: create model node using command
    var tfModel : TFModel= new TFModel("basicModel", kerasLayer);

    this.addCommand.setComponent("Model");
    this.addCommand.execute();
    let model = this.addCommand.getNode();
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
